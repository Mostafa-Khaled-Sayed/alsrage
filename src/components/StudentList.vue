<template>
    <v-container>
        <v-text-field
            v-model="searchQuery"
            @input="searchStudent"
            label="ادخل اسم الطالب"
        ></v-text-field>

        <v-row>
            <svg
                style="
                    position: fixed;
                    top: 60%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 245px;
                "
                v-if="loading1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200"
            >
                <radialGradient
                    id="a12"
                    cx=".66"
                    fx=".66"
                    cy=".3125"
                    fy=".3125"
                    gradientTransform="scale(1.5)"
                >
                    <stop offset="0" stop-color="#336699"></stop>
                    <stop
                        offset=".3"
                        stop-color="#336699"
                        stop-opacity=".9"
                    ></stop>
                    <stop
                        offset=".6"
                        stop-color="#336699"
                        stop-opacity=".6"
                    ></stop>
                    <stop
                        offset=".8"
                        stop-color="#336699"
                        stop-opacity=".3"
                    ></stop>
                    <stop
                        offset="1"
                        stop-color="#336699"
                        stop-opacity="0"
                    ></stop>
                </radialGradient>
                <circle
                    transform-origin="center"
                    fill="none"
                    stroke="url(#a12)"
                    stroke-width="15"
                    stroke-linecap="round"
                    stroke-dasharray="200 1000"
                    stroke-dashoffset="0"
                    cx="100"
                    cy="100"
                    r="70"
                >
                    <animateTransform
                        type="rotate"
                        attributeName="transform"
                        calcMode="spline"
                        dur="2"
                        values="360;0"
                        keyTimes="0;1"
                        keySplines="0 0 1 1"
                        repeatCount="indefinite"
                    ></animateTransform>
                </circle>
                <circle
                    transform-origin="center"
                    fill="none"
                    opacity=".2"
                    stroke="#336699"
                    stroke-width="15"
                    stroke-linecap="round"
                    cx="100"
                    cy="100"
                    r="70"
                ></circle>
            </svg>
            <v-container v-if="!loading1 && students.length === 0">
                <Empty_error text="لا يوجد طلاب مسجلين." />
            </v-container>
            <v-col cols="12" v-else>
                <v-list>
                    <v-list-item
                        v-for="(student, index) in sortedStudents"
                        :key="student.id"
                    >
                        <v-list-item-content class="student-item">
                            <v-row>
                                <v-col>
                                    <div
                                        style="
                                            padding: 10px;
                                            display: flex;
                                            justify-content: space-between;
                                            align-items: center;
                                        "
                                    >
                                        <h2>
                                            <v-avatar
                                                color="info"
                                                style="margin-left: 20px"
                                            >
                                                {{ index + 1 }}
                                            </v-avatar>
                                            {{ student.student_name }}
                                        </h2>
                                        <div
                                            class="d-flex align-center justify-center"
                                        >
                                            <!-- 000000000000000000000000000 -->
                                            <v-avatar color="info">
                                                <v-icon
                                                    @click.stop="
                                                        confirmDeleteStudent(
                                                            student.id
                                                        )
                                                    "
                                                    icon="mdi-delete"
                                                ></v-icon>
                                            </v-avatar>

                                            <v-avatar
                                                class="mr-2"
                                                :style="{
                                                    color: student.state
                                                        ? '#ccc'
                                                        : '#2196f3',
                                                }"
                                            >
                                                <v-icon
                                                    size="36px"
                                                    @click="toggleIcon(student)"
                                                    class="custom-icon animated-icon"
                                                >
                                                    {{ icon(student) }}
                                                </v-icon>
                                            </v-avatar>
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row style="margin-right: 70px; margin-top: 0px">
                                <v-col cols="12">
                                    <div
                                        style="
                                            display: flex;
                                            justify-content: space-between;
                                            align-items: center;
                                        "
                                    >
                                        <h3 style="color: #2196f3">
                                            فصل
                                            {{ student.class }}
                                        </h3>
                                        <h3 style="color: #2196f3">
                                            قسم
                                            {{ student.section }}
                                        </h3>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row style="gap: 0px">
                                <v-col cols="2">
                                    <v-card
                                        style="
                                            display: flex;
                                            justify-content: center;
                                            flex-direction: column;
                                            align-items: center;
                                            padding: 10px;
                                            background: rgb(33, 150, 243);
                                            color: #fff;
                                        "
                                    >
                                        <h3>
                                            {{
                                                parseFloat(
                                                    percentageTotalDegrees(
                                                        student
                                                    ).toFixed(1)
                                                )
                                            }}%
                                        </h3>
                                        <p>شهر أكتوبر</p>
                                    </v-card> </v-col
                                ><v-col cols="2">
                                    <v-card
                                        style="
                                            display: flex;
                                            justify-content: center;
                                            flex-direction: column;
                                            align-items: center;
                                            padding: 10px;
                                            background: rgb(33, 150, 243);
                                            color: #fff;
                                        "
                                    >
                                        <h3>
                                            {{
                                                parseFloat(
                                                    percentageTotalDegrees2(
                                                        student
                                                    ).toFixed(1)
                                                )
                                            }}%
                                        </h3>
                                        <p>شهر نوفمبر</p>
                                    </v-card> </v-col
                                ><v-col cols="2">
                                    <v-card
                                        style="
                                            display: flex;
                                            justify-content: center;
                                            flex-direction: column;
                                            align-items: center;
                                            padding: 10px;
                                            background: rgb(33, 150, 243);
                                            color: #fff;
                                        "
                                    >
                                        <h3>
                                            {{
                                                parseFloat(
                                                    percentageTotalDegrees3(
                                                        student
                                                    ).toFixed(1)
                                                )
                                            }}%
                                        </h3>
                                        <p>امتحان الترم الاول</p>
                                    </v-card> </v-col
                                ><v-col cols="2">
                                    <v-card
                                        style="
                                            display: flex;
                                            justify-content: center;
                                            flex-direction: column;
                                            align-items: center;
                                            padding: 10px;
                                            background: rgb(33, 150, 243);
                                            color: #fff;
                                        "
                                    >
                                        <h3>
                                            {{
                                                parseFloat(
                                                    percentageTotalDegrees4(
                                                        student
                                                    ).toFixed(1)
                                                )
                                            }}%
                                        </h3>
                                        <p>شهر فبراير</p>
                                    </v-card> </v-col
                                ><v-col cols="2">
                                    <v-card
                                        style="
                                            display: flex;
                                            justify-content: center;
                                            flex-direction: column;
                                            align-items: center;
                                            padding: 10px;
                                            background: rgb(33, 150, 243);
                                            color: #fff;
                                        "
                                    >
                                        <h3>
                                            {{
                                                parseFloat(
                                                    percentageTotalDegrees5(
                                                        student
                                                    ).toFixed(1)
                                                )
                                            }}%
                                        </h3>
                                        <p>شهر مارس</p>
                                    </v-card>
                                </v-col>
                                <v-col cols="2">
                                    <v-card
                                        style="
                                            display: flex;
                                            justify-content: center;
                                            flex-direction: column;
                                            align-items: center;
                                            padding: 10px;
                                            background: rgb(33, 150, 243);
                                            color: #fff;
                                        "
                                    >
                                        <h3>
                                            {{
                                                parseFloat(
                                                    percentageTotalDegrees6(
                                                        student
                                                    ).toFixed(1)
                                                )
                                            }}%
                                        </h3>
                                        <p>امتحان الترم الثاني</p>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <v-row
                                style="
                                    margin-right: 70px;
                                    margin-top: 20px;
                                    margin-bottom: 20px;
                                "
                            >
                                <v-col>
                                    <div
                                        style="
                                            display: flex;
                                            justify-content: space-between;
                                            align-items: center;
                                        "
                                    >
                                        <h3
                                            style="
                                                color: #2196f3;
                                                margin-bottom: 20px;
                                            "
                                        >
                                            المصروفات
                                        </h3>
                                        <h3
                                            style="
                                                color: #2196f3;
                                                margin-bottom: 20px;
                                            "
                                        >
                                            {{ student.payments.Expenses }} /
                                            {{ student.payments.paid_Up }}
                                        </h3>
                                    </div>
                                    <div>
                                        <div class="progress-container">
                                            <progress
                                                :value="
                                                    calculatePaymentProgress(
                                                        student.payments
                                                            .paid_Up,
                                                        student.payments
                                                            .Expenses
                                                    )
                                                "
                                                max="100"
                                                class="progress-bar"
                                            ></progress>
                                            <div
                                                class="progress-label2"
                                                :style="{
                                                    right: calculateLabelPosition(
                                                        student.payments
                                                            .paid_Up,
                                                        student.payments
                                                            .Expenses
                                                    ),
                                                }"
                                            >
                                                <div class="label-box">
                                                    {{
                                                        Math.ceil(
                                                            calculatePaymentProgress(
                                                                student.payments
                                                                    .paid_Up,
                                                                student.payments
                                                                    .Expenses
                                                            )
                                                        )
                                                    }}%
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            style="
                                                display: flex;
                                                justify-content: space-between;
                                                margin-top: 10px;
                                            "
                                        >
                                            <span>بداية الدراسة</span>
                                            <span>شهر 11</span>
                                            <span>شهر 12</span>
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-card
                                        @click.stop="
                                            openStudentDetails(student)
                                        "
                                        style="
                                            padding: 10px;
                                            display: flex;
                                            justify-content: center;
                                            align-items: center;
                                            background: #e3f1fd;
                                        "
                                    >
                                        <v-icon
                                            style="margin-left: 6px"
                                            icon="mdi-information-outline"
                                        ></v-icon
                                        >التفاصيل</v-card
                                    >
                                </v-col>
                            </v-row>
                        </v-list-item-content>
                        <v-dialog v-model="dialogStudentDetails">
                            <v-stepper
                                v-model="e1"
                                alt-labels
                                editable
                                style="padding: 5px"
                            >
                                <v-stepper-header class="stepper_head">
                                    <template
                                        v-for="(step, index) in steps"
                                        :key="`${index}-step`"
                                    >
                                        <v-stepper-item
                                            class="stepper-width"
                                            style="
                                                font-size: 13px;
                                                font-weight: bold;
                                            "
                                            :complete="e1 > index + 1"
                                            :step="`Step ${index + 1}`"
                                            :value="index + 1"
                                            ref="stepperItems"
                                        >
                                            {{ step }}
                                        </v-stepper-item>
                                    </template>
                                </v-stepper-header>

                                <v-stepper-window class="m-3">
                                    <form @submit.prevent="submit">
                                        <div v-if="e1 === 1" ref="slide1">
                                            <div style="padding: 20px">
                                                <div
                                                    style="
                                                        display: flex;
                                                        justify-content: space-between;
                                                    "
                                                >
                                                    <div
                                                        style="
                                                            display: flex;
                                                            margin-bottom: 20px;
                                                            align-items: center;
                                                        "
                                                    >
                                                        <v-avatar
                                                            color="info"
                                                            style="
                                                                margin-left: 20px;
                                                            "
                                                        >
                                                            {{ index + 1 }}
                                                        </v-avatar>
                                                        <h2
                                                            style="
                                                                color: #2196f3;
                                                            "
                                                        >
                                                            معلومات الطالب
                                                        </h2>
                                                    </div>
                                                    <v-btn
                                                        color="primary"
                                                        :disabled="!changesMade"
                                                        @click="saveChanges"
                                                        :class="{
                                                            'grey--text':
                                                                !changesMade,
                                                        }"
                                                    >
                                                        حفظ التغييرات
                                                    </v-btn>
                                                </div>

                                                <div
                                                    style="
                                                        width: 100%;
                                                        display: flex;
                                                        gap: 20px;
                                                    "
                                                >
                                                    <v-text-field
                                                        v-model="
                                                            selectedStudent.student_name
                                                        "
                                                        style="width: 50%"
                                                        :error-messages="
                                                            errors.student_name
                                                        "
                                                        required
                                                        label="اسم الطالب"
                                                        @input="markChanges"
                                                    ></v-text-field>
                                                    <v-select
                                                        :items="[
                                                            '1/1',
                                                            '1/2',
                                                            '1/3',
                                                            '1/4',
                                                            '1/5',
                                                            '1/6',
                                                            '2/1',
                                                            '2/2',
                                                            '2/3',
                                                            '2/4',
                                                            '2/5',
                                                            '2/6',
                                                            '3/1',
                                                            '3/2',
                                                            '3/3',
                                                            '3/4',
                                                            '3/5',
                                                            '3/6',
                                                        ]"
                                                        variant="outlined"
                                                        style="width: 50%"
                                                        v-model="
                                                            selectedStudent.class
                                                        "
                                                        :error-messages="
                                                            errors.class
                                                        "
                                                        label="الفصل"
                                                        required
                                                        @blur="markChanges"
                                                    ></v-select>
                                                </div>
                                                <div
                                                    style="
                                                        width: 100%;
                                                        display: flex;
                                                        gap: 20px;
                                                    "
                                                >
                                                    <v-select
                                                        v-model="
                                                            selectedStudent.gender
                                                        "
                                                        style="width: 100%"
                                                        :error-messages="
                                                            errors.gender
                                                        "
                                                        label="الجنس"
                                                        required
                                                        :items="['انثي', 'ذكر']"
                                                        variant="outlined"
                                                        @blur="markChanges"
                                                    ></v-select>
                                                </div>
                                                <v-select
                                                    v-model="
                                                        selectedStudent.section
                                                    "
                                                    :error-messages="
                                                        errors.section
                                                    "
                                                    label="القسم"
                                                    required
                                                    :items="['عربي', 'لغات']"
                                                    variant="outlined"
                                                    @blur="markChanges"
                                                ></v-select>
                                                <v-menu
                                                    ref="menu"
                                                    v-model="menu"
                                                    :close-on-content-click="
                                                        false
                                                    "
                                                    transition="scale-transition"
                                                    offset-y
                                                    min-width="290px"
                                                    @open="initializeTempDate"
                                                >
                                                    <template
                                                        v-slot:activator="{
                                                            on,
                                                            attrs,
                                                        }"
                                                    >
                                                        <v-text-field
                                                            v-model="
                                                                selectedStudent.birthday
                                                            "
                                                            label="تاريخ الميلاد"
                                                            append-icon="mdi-calendar"
                                                            readonly
                                                            @click="menu = true"
                                                            :error-messages="
                                                                errors.birthday
                                                            "
                                                            required
                                                            v-bind="attrs"
                                                            v-on="on"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-card>
                                                        <v-date-picker
                                                            v-model="tempDate"
                                                            locale="ar"
                                                            scrollable
                                                            :first-day-of-week="
                                                                1
                                                            "
                                                        ></v-date-picker>
                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn
                                                                text
                                                                @click="
                                                                    menu = false
                                                                "
                                                                >إلغاء</v-btn
                                                            >
                                                            <v-btn
                                                                text
                                                                @click="
                                                                    confirmDate
                                                                "
                                                                >تأكيد</v-btn
                                                            >
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-menu>
                                            </div>
                                        </div>
                                        <!-- 22222222222222222222222222222222222222222222222222222222222 -->
                                        <div v-if="e1 === 2" ref="slide2">
                                            <div style="padding: 20px">
                                                <div
                                                    style="
                                                        display: flex;
                                                        margin-bottom: 20px;
                                                        align-items: center;
                                                    "
                                                >
                                                    <v-avatar
                                                        color="info"
                                                        style="
                                                            margin-left: 20px;
                                                        "
                                                        >{{
                                                            index + 2
                                                        }}</v-avatar
                                                    >
                                                    <h2
                                                        style="
                                                            color: #2196f3;
                                                            font-weight: bold;
                                                        "
                                                    >
                                                        ولي الامر
                                                    </h2>
                                                </div>

                                                <!-- حقل اسم الأب -->
                                                <v-text-field
                                                    v-model="
                                                        selectedParent.name
                                                    "
                                                    label="اسم الأب"
                                                    disabled
                                                    required
                                                    style="margin-bottom: 20px"
                                                    outlined
                                                    color="primary"
                                                ></v-text-field>

                                                <!-- عرض عدد الأبناء -->
                                                <h4
                                                    style="
                                                        margin-bottom: 20px;
                                                        margin-right: 10px;
                                                        color: #2196f3;
                                                        font-size: 18px;
                                                    "
                                                >
                                                    عدد الأبناء :
                                                    <strong class="mr-2">{{
                                                        selectedParent.Child
                                                            .length
                                                    }}</strong>
                                                </h4>

                                                <!-- عرض أسماء الأبناء والمرحلة الدراسية -->
                                                <v-list>
                                                    <v-list-item-group
                                                        v-for="(
                                                            child, index
                                                        ) in selectedParent.Child"
                                                        :key="index"
                                                    >
                                                        <v-list-item
                                                            style="
                                                                background-color: #f1f1f1;
                                                                margin-bottom: 10px;
                                                                border-radius: 8px;
                                                            "
                                                        >
                                                            <v-list-item-content>
                                                                <v-list-item-title
                                                                    style="
                                                                        font-size: 18px;
                                                                        font-weight: bold;
                                                                    "
                                                                >
                                                                    {{
                                                                        child.student_name
                                                                    }}
                                                                </v-list-item-title>
                                                                <v-list-item-subtitle
                                                                    style="
                                                                        font-size: 14px;
                                                                        color: #757575;
                                                                    "
                                                                >
                                                                    المرحلة
                                                                    الدراسية:
                                                                    {{
                                                                        child.educational_level
                                                                    }}
                                                                </v-list-item-subtitle>
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                    </v-list-item-group>
                                                </v-list>
                                            </div>
                                        </div>

                                        <div v-if="e1 === 3" ref="slide3">
                                            <div style="padding: 20px">
                                                <div
                                                    style="
                                                        display: flex;
                                                        justify-content: space-between;
                                                        align-items: center;
                                                        margin-bottom: 20px;
                                                    "
                                                >
                                                    <div
                                                        style="
                                                            display: flex;

                                                            align-items: center;
                                                        "
                                                    >
                                                        <v-avatar
                                                            color="info"
                                                            style="
                                                                margin-left: 20px;
                                                            "
                                                        >
                                                            {{ index + 3 }}
                                                        </v-avatar>
                                                        <h2
                                                            style="
                                                                color: #2196f3;
                                                            "
                                                        >
                                                            النتائج الاسبوعيه
                                                        </h2>
                                                    </div>
                                                    <v-btn
                                                        color="blue"
                                                        @click="
                                                            dialogAddSubject = true
                                                        "
                                                        >إضافة مادة جديدة</v-btn
                                                    >
                                                </div>

                                                <v-row>
                                                    <v-col
                                                        v-if="
                                                            selectedStudent
                                                                .Results[0]
                                                                .weekly
                                                                .length === 0
                                                        "
                                                    >
                                                        <Empty_error
                                                            text="لا يوجد نتائج اسبوعيه."
                                                        />
                                                    </v-col>
                                                    <v-col
                                                        v-else
                                                        cols="4"
                                                        v-for="(
                                                            week, index
                                                        ) in selectedStudent
                                                            .Results[0].weekly"
                                                        :key="index"
                                                    >
                                                        <v-card
                                                            style="
                                                                padding: 17px;
                                                            "
                                                        >
                                                            <div
                                                                style="
                                                                    display: flex;
                                                                    justify-content: space-between;
                                                                    align-items: center;
                                                                    margin-bottom: 20px;
                                                                "
                                                            >
                                                                <div
                                                                    style="
                                                                        display: flex;
                                                                        align-items: center;
                                                                    "
                                                                >
                                                                    <v-avatar
                                                                        color="info"
                                                                        style="
                                                                            margin-left: 20px;
                                                                        "
                                                                    >
                                                                        {{
                                                                            index +
                                                                            1
                                                                        }}
                                                                    </v-avatar>
                                                                    <h2>
                                                                        {{
                                                                            week.Subject_Name
                                                                        }}
                                                                    </h2>
                                                                </div>
                                                                <div>
                                                                    <v-icon
                                                                        color="primary"
                                                                        @click="
                                                                            editSubject(
                                                                                selectedStudent.id,
                                                                                index
                                                                            )
                                                                        "
                                                                    >
                                                                        mdi-pencil
                                                                    </v-icon>
                                                                    <v-icon
                                                                        color="red"
                                                                        @click="
                                                                            deleteSubject(
                                                                                selectedStudent.id,
                                                                                index
                                                                            )
                                                                        "
                                                                    >
                                                                        mdi-delete
                                                                    </v-icon>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <table
                                                                    class="styled-table"
                                                                >
                                                                    <tr>
                                                                        <td>
                                                                            درجة
                                                                            الطالب
                                                                        </td>
                                                                        <td>
                                                                            {{
                                                                                week.Student_degree
                                                                            }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            الدرجة
                                                                            الكلية
                                                                        </td>
                                                                        <td>
                                                                            {{
                                                                                week.Major_degree
                                                                            }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            تاريخ
                                                                            الامتحان
                                                                        </td>
                                                                        <td>
                                                                            {{
                                                                                week.Date
                                                                            }}
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </div>
                                                        </v-card>
                                                    </v-col>
                                                </v-row>
                                                <!-- Add Subject Dialog -->
                                                <v-dialog
                                                    v-model="dialogAddSubject"
                                                    max-width="500px"
                                                >
                                                    <v-card>
                                                        <v-card-title>
                                                            <span
                                                                class="headline"
                                                                >إضافة مادة
                                                                جديدة</span
                                                            >
                                                        </v-card-title>
                                                        <v-card-text>
                                                            <v-form
                                                                ref="addForm"
                                                            >
                                                                <v-text-field
                                                                    v-model="
                                                                        newSubject.Subject_Name
                                                                    "
                                                                    label="اسم المادة"
                                                                    required
                                                                ></v-text-field>
                                                                <v-text-field
                                                                    v-model="
                                                                        newSubject.Major_degree
                                                                    "
                                                                    label="الدرجة الكلية"
                                                                    type="number"
                                                                    required
                                                                ></v-text-field>
                                                                <v-text-field
                                                                    v-model="
                                                                        newSubject.Student_degree
                                                                    "
                                                                    label="درجة الطالب"
                                                                    type="number"
                                                                    required
                                                                ></v-text-field>
                                                                <v-menu
                                                                    ref="menuz"
                                                                    v-model="
                                                                        menuz
                                                                    "
                                                                    :close-on-content-click="
                                                                        false
                                                                    "
                                                                    transition="scale-transition"
                                                                    offset-y
                                                                    min-width="290px"
                                                                    @open="
                                                                        initializeTempDatez
                                                                    "
                                                                >
                                                                    <template
                                                                        v-slot:activator="{
                                                                            on,
                                                                            attrs,
                                                                        }"
                                                                    >
                                                                        <v-text-field
                                                                            v-model="
                                                                                newSubject.Date
                                                                            "
                                                                            label="تاريخ الامتحان"
                                                                            prepend-icon="mdi-calendar"
                                                                            readonly
                                                                            required
                                                                            @click="
                                                                                menuz = true
                                                                            "
                                                                            v-bind="
                                                                                attrs
                                                                            "
                                                                            v-on="
                                                                                on
                                                                            "
                                                                        ></v-text-field>
                                                                    </template>
                                                                    <v-card>
                                                                        <v-date-picker
                                                                            v-model="
                                                                                tempDatez
                                                                            "
                                                                            locale="ar"
                                                                            scrollable
                                                                            :first-day-of-week="
                                                                                1
                                                                            "
                                                                        ></v-date-picker>
                                                                        <v-card-actions>
                                                                            <v-spacer></v-spacer>
                                                                            <v-btn
                                                                                text
                                                                                @click="
                                                                                    menuz = false
                                                                                "
                                                                                >إلغاء</v-btn
                                                                            >
                                                                            <v-btn
                                                                                text
                                                                                @click="
                                                                                    confirmDatez
                                                                                "
                                                                                >تأكيد</v-btn
                                                                            >
                                                                        </v-card-actions>
                                                                    </v-card>
                                                                </v-menu>
                                                            </v-form>
                                                        </v-card-text>
                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn
                                                                color="blue darken-1"
                                                                text
                                                                @click="
                                                                    dialogAddSubject = false
                                                                "
                                                                >إلغاء</v-btn
                                                            >
                                                            <v-btn
                                                                color="blue darken-1"
                                                                text
                                                                @click="
                                                                    addSubject(
                                                                        selectedStudent.id
                                                                    )
                                                                "
                                                                >حفظ</v-btn
                                                            >
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>

                                                <!-- Edit Subject Dialog -->
                                                <v-dialog
                                                    v-model="editDialog"
                                                    max-width="500px"
                                                >
                                                    <v-card>
                                                        <v-card-title>
                                                            <span
                                                                class="headline"
                                                                >تعديل
                                                                المادة</span
                                                            >
                                                        </v-card-title>
                                                        <v-card-text>
                                                            <v-form
                                                                ref="editForm"
                                                            >
                                                                <v-text-field
                                                                    v-model="
                                                                        editedSubject.Subject_Name
                                                                    "
                                                                    label="اسم المادة"
                                                                    required
                                                                ></v-text-field>
                                                                <v-text-field
                                                                    v-model="
                                                                        editedSubject.Major_degree
                                                                    "
                                                                    label="الدرجة الكلية"
                                                                    type="number"
                                                                    required
                                                                ></v-text-field>
                                                                <v-text-field
                                                                    v-model="
                                                                        editedSubject.Student_degree
                                                                    "
                                                                    label="درجة الطالب"
                                                                    type="number"
                                                                    required
                                                                ></v-text-field>
                                                                <v-menu
                                                                    ref="menu"
                                                                    v-model="
                                                                        menuz
                                                                    "
                                                                    :close-on-content-click="
                                                                        false
                                                                    "
                                                                    transition="scale-transition"
                                                                    offset-y
                                                                    min-width="290px"
                                                                    @open="
                                                                        initializeTempDatez
                                                                    "
                                                                >
                                                                    <template
                                                                        v-slot:activator="{
                                                                            on,
                                                                            attrs,
                                                                        }"
                                                                    >
                                                                        <v-text-field
                                                                            v-model="
                                                                                editedSubject.Date
                                                                            "
                                                                            label="تاريخ الامتحان"
                                                                            prepend-icon="mdi-calendar"
                                                                            readonly
                                                                            required
                                                                            @click="
                                                                                menuz = true
                                                                            "
                                                                            v-bind="
                                                                                attrs
                                                                            "
                                                                            v-on="
                                                                                on
                                                                            "
                                                                        ></v-text-field>
                                                                    </template>
                                                                    <v-card>
                                                                        <v-date-picker
                                                                            v-model="
                                                                                tempDatez
                                                                            "
                                                                            locale="ar"
                                                                            scrollable
                                                                            :first-day-of-week="
                                                                                1
                                                                            "
                                                                        ></v-date-picker>
                                                                        <v-card-actions>
                                                                            <v-spacer></v-spacer>
                                                                            <v-btn
                                                                                text
                                                                                @click="
                                                                                    menu = false
                                                                                "
                                                                                >إلغاء</v-btn
                                                                            >
                                                                            <v-btn
                                                                                text
                                                                                @click="
                                                                                    confirmDatez
                                                                                "
                                                                                >تأكيد</v-btn
                                                                            >
                                                                        </v-card-actions>
                                                                    </v-card>
                                                                </v-menu>
                                                            </v-form>
                                                        </v-card-text>
                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn
                                                                color="blue darken-1"
                                                                text
                                                                @click="
                                                                    closeDialog
                                                                "
                                                                >إلغاء</v-btn
                                                            >
                                                            <v-btn
                                                                color="blue darken-1"
                                                                text
                                                                @click="
                                                                    saveEdit
                                                                "
                                                                >حفظ</v-btn
                                                            >
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                            </div>
                                        </div>
                                        <div v-if="e1 === 4" ref="slide4">
                                            <div style="padding: 20px">
                                                <div
                                                    style="
                                                        display: flex;
                                                        justify-content: space-between;
                                                        align-items: center;
                                                    "
                                                >
                                                    <div
                                                        style="
                                                            display: flex;
                                                            margin-bottom: 20px;
                                                            align-items: center;
                                                        "
                                                    >
                                                        <v-avatar
                                                            color="info"
                                                            style="
                                                                margin-left: 20px;
                                                            "
                                                            >{{
                                                                index + 4
                                                            }}</v-avatar
                                                        >
                                                        <h2
                                                            style="
                                                                color: #2196f3;
                                                            "
                                                        >
                                                            النتائج الشهرية
                                                        </h2>
                                                    </div>
                                                    <v-btn
                                                        rounded="xs"
                                                        size="large"
                                                        :disabled="
                                                            !changesMade2
                                                        "
                                                        @click="saveChanges2"
                                                        color="primary"
                                                        :class="{
                                                            'grey--text':
                                                                !changesMade2,
                                                        }"
                                                        >حفظ التغييرات</v-btn
                                                    >
                                                </div>
                                                <!-- Select month buttons -->
                                                <v-card flat>
                                                    <v-row>
                                                        <v-col
                                                            cols="12"
                                                            class="d-flex justify-center ma-3"
                                                        >
                                                            <v-btn
                                                                rounded="xs"
                                                                size="large"
                                                                @click="
                                                                    selectMonth(
                                                                        'شهر أكتوبر'
                                                                    )
                                                                "
                                                                >شهر
                                                                أكتوبر</v-btn
                                                            >
                                                            <v-btn
                                                                rounded="xs"
                                                                size="large"
                                                                @click="
                                                                    selectMonth(
                                                                        'شهر نوفمبر'
                                                                    )
                                                                "
                                                                >شهر
                                                                نوفمبر</v-btn
                                                            >
                                                            <v-btn
                                                                rounded="xs"
                                                                size="large"
                                                                @click="
                                                                    selectMonth(
                                                                        'الترم الأول'
                                                                    )
                                                                "
                                                                >الترم
                                                                الأول</v-btn
                                                            >
                                                            <v-btn
                                                                rounded="xs"
                                                                size="large"
                                                                @click="
                                                                    selectMonth(
                                                                        'شهر فبراير'
                                                                    )
                                                                "
                                                                >شهر
                                                                فبراير</v-btn
                                                            >
                                                            <v-btn
                                                                rounded="xs"
                                                                size="large"
                                                                @click="
                                                                    selectMonth(
                                                                        'شهر مارس'
                                                                    )
                                                                "
                                                                >شهر مارس</v-btn
                                                            >
                                                            <v-btn
                                                                rounded="xs"
                                                                size="large"
                                                                @click="
                                                                    selectMonth(
                                                                        'الترم الثاني'
                                                                    )
                                                                "
                                                            >
                                                                الترم
                                                                الثاني</v-btn
                                                            >
                                                        </v-col>
                                                    </v-row>

                                                    <!-- Student information -->
                                                    <v-row
                                                        class="d-flex flex-row align-center justify-space-between ma-5"
                                                    >
                                                        <v-col>
                                                            <v-col>
                                                                <v-text-title
                                                                    >الاسم:</v-text-title
                                                                >
                                                                <v-text-title>{{
                                                                    selectedStudent.student_name
                                                                }}</v-text-title>
                                                            </v-col>
                                                            <v-col>
                                                                <v-text-title
                                                                    >المرحلة
                                                                    الدراسية:</v-text-title
                                                                >
                                                                <v-text-title>{{
                                                                    year
                                                                }}</v-text-title>
                                                            </v-col>
                                                            <v-col>
                                                                <v-text-title
                                                                    >امتحان:</v-text-title
                                                                >
                                                                <v-text-title>{{
                                                                    selectedMonth
                                                                }}</v-text-title>
                                                            </v-col>
                                                        </v-col>
                                                        <v-col
                                                            class="d-flex flex-column align-end"
                                                        >
                                                            <div
                                                                class="par d-flex flex-column justify-center"
                                                                style="
                                                                    width: 200px;
                                                                    height: 200px;
                                                                "
                                                            >
                                                                <img
                                                                    src="../assets/images.jpeg"
                                                                    alt="School Logo"
                                                                />
                                                                <p class="ma-2">
                                                                    معهد السراج
                                                                    المنير
                                                                    الأزهري
                                                                </p>
                                                            </div>
                                                        </v-col>
                                                    </v-row>

                                                    <!-- Results table -->
                                                    <div class="table">
                                                        <v-table>
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        اسم
                                                                        المادة
                                                                    </th>
                                                                    <th>
                                                                        اسم
                                                                        المعلم
                                                                    </th>
                                                                    <th>
                                                                        تقييم
                                                                        السلوك
                                                                    </th>
                                                                    <th>
                                                                        الدرجة
                                                                        الصغرى
                                                                    </th>
                                                                    <th>
                                                                        الدرجة
                                                                        الكبرى
                                                                    </th>
                                                                    <th>
                                                                        الدرجة
                                                                        النهائية
                                                                        للطالب
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr
                                                                    v-for="(
                                                                        degree,
                                                                        index
                                                                    ) in selectedMonthlyDegrees"
                                                                    :key="index"
                                                                >
                                                                    <td>
                                                                        {{
                                                                            degree.Subject_Name
                                                                        }}
                                                                    </td>
                                                                    <td>
                                                                        <v-text-field
                                                                            v-model="
                                                                                degree.Teacher_Name
                                                                            "
                                                                            style="
                                                                                text-align: center;
                                                                            "
                                                                            required
                                                                            @input="
                                                                                changesMade2 = true
                                                                            "
                                                                        ></v-text-field>
                                                                    </td>
                                                                    <td>
                                                                        <v-text-field
                                                                            v-model="
                                                                                degree.Behavior_assessment
                                                                            "
                                                                            @input="
                                                                                changesMade2 = true
                                                                            "
                                                                            style="
                                                                                text-align: center;
                                                                            "
                                                                            required
                                                                        ></v-text-field>
                                                                    </td>
                                                                    <td>
                                                                        {{
                                                                            degree.Minor_degree
                                                                        }}
                                                                    </td>
                                                                    <td>
                                                                        {{
                                                                            degree.Major_degree
                                                                        }}
                                                                    </td>
                                                                    <td>
                                                                        <v-text-field
                                                                            v-model="
                                                                                degree.Student_degree
                                                                            "
                                                                            style="
                                                                                text-align: center;
                                                                            "
                                                                            @input="
                                                                                changesMade2 = true
                                                                            "
                                                                            required
                                                                        ></v-text-field>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </v-table>
                                                    </div>
                                                </v-card>
                                            </div>
                                        </div>
                                        <div v-if="e1 === 5" ref="slide5">
                                            <div
                                                v-if="
                                                    user.roles.includes(
                                                        'الاطلاع على الحسابات'
                                                    ) ||
                                                    user.roles.includes('الكل')
                                                "
                                                style="
                                                    display: flex;
                                                    justify-content: space-between;
                                                    align-items: center;
                                                "
                                            >
                                                <div
                                                    style="
                                                        display: flex;
                                                        align-items: center;
                                                    "
                                                >
                                                    <v-avatar
                                                        color="info"
                                                        style="
                                                            margin-left: 20px;
                                                        "
                                                        >{{
                                                            index + 5
                                                        }}</v-avatar
                                                    >
                                                    <h2 style="color: #2196f3">
                                                        المدفوعات
                                                    </h2>
                                                </div>
                                                <v-btn
                                                    rounded="xs"
                                                    size="large"
                                                    :disabled="!changesMade3"
                                                    @click="saveChanges3"
                                                    color="primary"
                                                    :class="{
                                                        'grey--text':
                                                            !changesMade,
                                                    }"
                                                    >حفظ التعديلات</v-btn
                                                >
                                            </div>
                                            <v-card
                                                flat
                                                class="mx-auto my-4"
                                                max-width="90%"
                                            >
                                                <v-container fluid>
                                                    <div class="title">
                                                        المصروفات
                                                    </div>
                                                    <div class="table">
                                                        <div
                                                            class="invoice Title"
                                                        >
                                                            <font-awesome-icon
                                                                :icon="[
                                                                    'fas',
                                                                    'file-invoice-dollar',
                                                                ]"
                                                            />
                                                            <div>فاتورة</div>
                                                        </div>
                                                        <div class="Row">
                                                            <div>المصروفات</div>
                                                            <div>
                                                                {{
                                                                    selectedStudent
                                                                        .payments
                                                                        .Expenses ||
                                                                    0
                                                                }}
                                                            </div>
                                                        </div>
                                                        <div class="Row">
                                                            <div>
                                                                نظام الدفع
                                                            </div>
                                                            <div>
                                                                {{
                                                                    selectedStudent
                                                                        .payments
                                                                        .payment_System ||
                                                                    "الدفع المباشر"
                                                                }}
                                                            </div>
                                                        </div>
                                                        <div class="Row">
                                                            <div>
                                                                نظام التقسيط
                                                            </div>
                                                            <div>
                                                                {{
                                                                    selectedStudent
                                                                        .payments
                                                                        .Installment_System ||
                                                                    "لا يوجد"
                                                                }}
                                                            </div>
                                                        </div>
                                                        <div class="Row">
                                                            <div>المدفوع</div>
                                                            <div>
                                                                {{
                                                                    selectedStudent
                                                                        .payments
                                                                        .paid_Up ||
                                                                    0
                                                                }}
                                                            </div>
                                                        </div>
                                                        <div class="Row">
                                                            <div>المتبقي</div>
                                                            <div>
                                                                {{
                                                                    selectedStudent
                                                                        .payments
                                                                        .Expenses -
                                                                        selectedStudent
                                                                            .payments
                                                                            .paid_Up ||
                                                                    0
                                                                }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="deidline">
                                                        <div class="Title">
                                                            <font-awesome-icon
                                                                :icon="[
                                                                    'fas',
                                                                    'circle-info',
                                                                ]"
                                                            />
                                                            <div>
                                                                تفاصيل المدفوعات
                                                                والأقساط
                                                                المستحقة
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <v-row class="details_row">
                                                        <v-text-field
                                                            v-model="
                                                                selectedStudent
                                                                    .payments
                                                                    .Expenses
                                                            "
                                                            label="ادخل المبلغ"
                                                            outlined
                                                            dense
                                                            required
                                                            @input="
                                                                setChangesMade(
                                                                    true
                                                                )
                                                            "
                                                        ></v-text-field>

                                                        <v-select
                                                            v-model="
                                                                selectedStudent
                                                                    .payments
                                                                    .payment_System
                                                            "
                                                            :items="
                                                                paymentMethods
                                                            "
                                                            label="اختر نظام الدفع"
                                                            @blur="
                                                                setChangesMade(
                                                                    true
                                                                )
                                                            "
                                                            outlined
                                                            dense
                                                        ></v-select>
                                                    </v-row>
                                                    <v-row
                                                        v-if="
                                                            selectedStudent
                                                                .payments
                                                                .payment_System ===
                                                            'نظام التقسيط'
                                                        "
                                                        class="details_row"
                                                    >
                                                        <v-select
                                                            v-model="
                                                                selectedStudent
                                                                    .payments
                                                                    .Installment_System
                                                            "
                                                            :items="selectPaid"
                                                            label="اختر نظام التقسيط"
                                                            @blur="
                                                                setChangesMade(
                                                                    true
                                                                )
                                                            "
                                                            outlined
                                                            dense
                                                        ></v-select>

                                                        <v-text-field
                                                            v-model="
                                                                selectedStudent
                                                                    .payments
                                                                    .paid_Up
                                                            "
                                                            label="ادخل المبلغ للدفع"
                                                            outlined
                                                            dense
                                                            @input="
                                                                setChangesMade(
                                                                    true
                                                                )
                                                            "
                                                        ></v-text-field>
                                                    </v-row>

                                                    <div
                                                        v-if="
                                                            selectedStudent
                                                                .payments
                                                                .payment_System ===
                                                                'نظام التقسيط' &&
                                                            selectedStudent
                                                                .payments
                                                                .Installment_System
                                                        "
                                                        class="payment-section"
                                                    >
                                                        <v-row
                                                            style="
                                                                margin: 10px
                                                                    15px 10px
                                                                    15px;
                                                                overflow: hidden;
                                                            "
                                                        >
                                                            <div
                                                                class="timeline-container"
                                                            >
                                                                <div
                                                                    class="timeline"
                                                                >
                                                                    <div
                                                                        class="timeline-line"
                                                                    ></div>
                                                                    <div
                                                                        class="progress_container"
                                                                    >
                                                                        <div
                                                                            class="progress"
                                                                            :style="{
                                                                                height:
                                                                                    (selectedStudent
                                                                                        .payments
                                                                                        .paid_Up /
                                                                                        selectedStudent
                                                                                            .payments
                                                                                            .Expenses) *
                                                                                        100 +
                                                                                    '%',
                                                                                backgroundColor:
                                                                                    'var(--main-color)',
                                                                            }"
                                                                        ></div>
                                                                        <span
                                                                            class="progress-label mb-3"
                                                                        >
                                                                            {{
                                                                                selectedStudent
                                                                                    .payments
                                                                                    .paid_Up
                                                                            }}
                                                                            مدفوعاتك
                                                                        </span>
                                                                    </div>
                                                                    <div
                                                                        v-for="month in numberOfMonths(
                                                                            selectedStudent
                                                                                .payments
                                                                                .Installment_System
                                                                        )"
                                                                        :key="
                                                                            month
                                                                        "
                                                                        class="timeline-item"
                                                                    >
                                                                        <div
                                                                            class="timeline-item-content"
                                                                            :style="{
                                                                                backgroundColor:
                                                                                    selectedStudent
                                                                                        .payments
                                                                                        .paid_Up >=
                                                                                    installmentAmount(
                                                                                        selectedStudent
                                                                                            .payments
                                                                                            .Expenses,
                                                                                        selectedStudent
                                                                                            .payments
                                                                                            .Installment_System
                                                                                    ) *
                                                                                        month
                                                                                        ? '#d8588c'
                                                                                        : '#fff',
                                                                                color:
                                                                                    selectedStudent
                                                                                        .payments
                                                                                        .paid_Up >=
                                                                                    installmentAmount(
                                                                                        selectedStudent
                                                                                            .payments
                                                                                            .Expenses,
                                                                                        selectedStudent
                                                                                            .payments
                                                                                            .Installment_System
                                                                                    ) *
                                                                                        month
                                                                                        ? '#fff'
                                                                                        : '#333',
                                                                            }"
                                                                        >
                                                                            <div
                                                                                class="timeline-item-header"
                                                                            >
                                                                                <span
                                                                                    class="month-name"
                                                                                    :style="{
                                                                                        color:
                                                                                            selectedStudent
                                                                                                .payments
                                                                                                .paid_Up >=
                                                                                            installmentAmount(
                                                                                                selectedStudent
                                                                                                    .payments
                                                                                                    .Expenses,
                                                                                                selectedStudent
                                                                                                    .payments
                                                                                                    .Installment_System
                                                                                            ) *
                                                                                                month
                                                                                                ? '#fff'
                                                                                                : '#333',
                                                                                    }"
                                                                                >
                                                                                    {{
                                                                                        getMonthName(
                                                                                            month
                                                                                        )
                                                                                    }}
                                                                                </span>
                                                                            </div>
                                                                            <div
                                                                                class="timeline-item-body"
                                                                            >
                                                                                <p>
                                                                                    القسط
                                                                                    الشهري
                                                                                    :
                                                                                    {{
                                                                                        Math.floor(
                                                                                            installmentAmount(
                                                                                                selectedStudent
                                                                                                    .payments
                                                                                                    .Expenses,
                                                                                                selectedStudent
                                                                                                    .payments
                                                                                                    .Installment_System
                                                                                            )
                                                                                        )
                                                                                    }}
                                                                                    جنيه
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </v-row>
                                                        <div
                                                            class="Title"
                                                            v-if="CreateChart"
                                                            style="
                                                                margin-top: 55px;
                                                            "
                                                        >
                                                            <font-awesome-icon
                                                                :icon="[
                                                                    'fas',
                                                                    'chart-pie',
                                                                ]"
                                                            />
                                                            <div>إحصائيات</div>
                                                        </div>
                                                        <div
                                                            class="details"
                                                            v-if="CreateChart"
                                                        >
                                                            <div
                                                                class="myChart"
                                                            >
                                                                <canvas
                                                                    id="myChart"
                                                                ></canvas>
                                                            </div>
                                                            <ul>
                                                                <li class="li">
                                                                    <font-awesome-icon
                                                                        :icon="[
                                                                            'fas',
                                                                            'money-bills',
                                                                        ]"
                                                                    />
                                                                    <div>
                                                                        المصروفات
                                                                        المستحقة
                                                                    </div>
                                                                    <div>
                                                                        <span>{{
                                                                            selectedStudent
                                                                                .payments
                                                                                .Expenses
                                                                        }}</span>
                                                                        جنية
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div>
                                                                        المصروفات
                                                                        المدفوعة
                                                                    </div>
                                                                    <div>
                                                                        <span>{{
                                                                            selectedStudent
                                                                                .payments
                                                                                .paid_Up
                                                                        }}</span>
                                                                        جنية
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div>
                                                                        المصروفات
                                                                        المتبقية
                                                                    </div>
                                                                    <div>
                                                                        <span>{{
                                                                            selectedStudent
                                                                                .payments
                                                                                .Residual
                                                                        }}</span>
                                                                        جنية
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </v-container>
                                            </v-card>
                                        </div>
                                        <div v-if="e1 === 6" ref="slide6">
                                            <div
                                                style="
                                                    display: flex;
                                                    justify-content: space-between;
                                                    align-items: center;
                                                    margin-bottom: 20px;
                                                "
                                            >
                                                <div
                                                    style="
                                                        display: flex;
                                                        align-items: center;
                                                    "
                                                >
                                                    <v-avatar
                                                        color="info"
                                                        style="
                                                            margin-left: 20px;
                                                        "
                                                        >{{
                                                            index + 6
                                                        }}</v-avatar
                                                    >
                                                    <h2 style="color: #2196f3">
                                                        الاشعارات
                                                    </h2>
                                                </div>
                                                <v-btn
                                                    color="blue"
                                                    @click="
                                                        dialogAddNotice = true
                                                    "
                                                    >إضافةاشعار</v-btn
                                                >
                                            </div>

                                            <v-row>
                                                <v-col
                                                    v-if="
                                                        selectedStudent
                                                            .Notifications
                                                            .length === 0
                                                    "
                                                >
                                                    <Empty_error
                                                        text="لا يوجد اشعارات"
                                                    />
                                                </v-col>
                                                <v-col
                                                    v-for="(
                                                        note, index
                                                    ) in selectedStudent.Notifications"
                                                    :key="index"
                                                    cols="12"
                                                    md="4"
                                                    v-else
                                                >
                                                    <v-alert
                                                        :type="
                                                            note.NotificationType ===
                                                            'سئ'
                                                                ? 'error'
                                                                : note.NotificationType ===
                                                                  'جيد'
                                                                ? 'success'
                                                                : 'info'
                                                        "
                                                        class="pa-3 mb-3 notification-card"
                                                        border="left"
                                                        colored-border
                                                    >
                                                        <div
                                                            class="d-flex justify-space-between align-center"
                                                        >
                                                            <span>{{
                                                                note.NoticeTitle
                                                            }}</span>
                                                            <div>
                                                                <v-icon
                                                                    small
                                                                    color="white"
                                                                    class="mr-2"
                                                                    @click="
                                                                        editNotifications(
                                                                            selectedStudent.id,
                                                                            index
                                                                        )
                                                                    "
                                                                >
                                                                    mdi-pencil
                                                                </v-icon>
                                                                <v-icon
                                                                    small
                                                                    class="mr-2"
                                                                    color="white"
                                                                    @click="
                                                                        deleteNotification(
                                                                            selectedStudent.id,
                                                                            index
                                                                        )
                                                                    "
                                                                >
                                                                    mdi-delete
                                                                </v-icon>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            {{
                                                                note.theDescription
                                                            }}
                                                        </div>
                                                    </v-alert>
                                                </v-col>
                                            </v-row>

                                            <v-dialog
                                                v-model="dialogAddNotice"
                                                max-width="500px"
                                            >
                                                <v-card>
                                                    <v-card-title>
                                                        <span class="headline"
                                                            >إضافة اشعار
                                                            جديدة</span
                                                        >
                                                    </v-card-title>
                                                    <v-card-text>
                                                        <v-form ref="addForm">
                                                            <v-text-field
                                                                v-model="
                                                                    AddNotice.NoticeTitle
                                                                "
                                                                label="عنوان الاشعار"
                                                                required
                                                            ></v-text-field>
                                                            <v-textarea
                                                                v-model="
                                                                    AddNotice.theDescription
                                                                "
                                                                label="الوصف"
                                                                required
                                                            ></v-textarea>
                                                            <v-select
                                                                v-model="
                                                                    AddNotice.NotificationType
                                                                "
                                                                label="نوع الاشعار"
                                                                required
                                                                :items="[
                                                                    'سئ',
                                                                    'جيد',
                                                                    'معلومات',
                                                                ]"
                                                            ></v-select>
                                                        </v-form>
                                                    </v-card-text>
                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn
                                                            color="blue darken-1"
                                                            text
                                                            @click="
                                                                dialogAddNotice = false
                                                            "
                                                            >إلغاء</v-btn
                                                        >
                                                        <v-btn
                                                            color="blue darken-1"
                                                            text
                                                            @click="
                                                                addNotifications(
                                                                    selectedStudent.id
                                                                )
                                                            "
                                                            >حفظ</v-btn
                                                        >
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>

                                            <v-dialog
                                                v-model="
                                                    editNotificationsDialog
                                                "
                                                max-width="500px"
                                            >
                                                <v-card>
                                                    <v-card-title>
                                                        <span class="headline"
                                                            >تعديل الاشعار</span
                                                        >
                                                    </v-card-title>
                                                    <v-card-text>
                                                        <v-form ref="editForm">
                                                            <v-text-field
                                                                v-model="
                                                                    editedNotifications.NoticeTitle
                                                                "
                                                                label="عنوان الاشعار"
                                                                required
                                                            ></v-text-field>
                                                            <v-textarea
                                                                v-model="
                                                                    editedNotifications.theDescription
                                                                "
                                                                label="الوصف"
                                                                required
                                                            ></v-textarea>
                                                            <v-select
                                                                v-model="
                                                                    editedNotifications.NotificationType
                                                                "
                                                                label="نوع الاشعار"
                                                                required
                                                                :items="[
                                                                    'سئ',
                                                                    'جيد',
                                                                    'معلومات',
                                                                ]"
                                                            ></v-select>
                                                        </v-form>
                                                    </v-card-text>
                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn
                                                            color="blue darken-1"
                                                            text
                                                            @click="
                                                                closeNotificationsDialogs
                                                            "
                                                            >إلغاء</v-btn
                                                        >
                                                        <v-btn
                                                            color="blue darken-1"
                                                            text
                                                            @click="
                                                                saveNotificationsEdit
                                                            "
                                                            >حفظ</v-btn
                                                        >
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </div>
                                        <div v-if="e1 === 7" ref="slide7">
                                            <div
                                                style="
                                                    display: flex;
                                                    justify-content: space-between;
                                                    align-items: center;
                                                    margin-bottom: 20px;
                                                "
                                            >
                                                <div
                                                    style="
                                                        display: flex;
                                                        align-items: center;
                                                    "
                                                >
                                                    <v-avatar
                                                        color="info"
                                                        style="
                                                            margin-left: 20px;
                                                        "
                                                    >
                                                        {{ index + 7 }}
                                                    </v-avatar>
                                                    <h2 style="color: #2196f3">
                                                        الصور
                                                    </h2>
                                                </div>
                                                <v-btn
                                                    color="blue"
                                                    @click="
                                                        dialogAddPhoto = true
                                                    "
                                                    >اضافه صوره</v-btn
                                                >
                                            </div>
                                            <v-row style="gap: 0px">
                                                <v-col
                                                    v-if="
                                                        selectedStudent.photos
                                                            .length === 0
                                                    "
                                                >
                                                    <Empty_error
                                                        text="لا يوجد صور"
                                                    />
                                                </v-col>
                                                <v-col
                                                    v-for="(
                                                        photo, index
                                                    ) in selectedStudent.photos"
                                                    :key="index"
                                                    cols="12"
                                                    md="4"
                                                >
                                                    <v-card
                                                        class="pa-3 mb-3 notification-card"
                                                        outlined
                                                    >
                                                        <v-card-title
                                                            class="d-flex align-left"
                                                            style="
                                                                justify-content: end;
                                                            "
                                                        >
                                                            <div>
                                                                <v-icon
                                                                    small
                                                                    class="mr-2"
                                                                    @click="
                                                                        deletePhotos(
                                                                            selectedStudent.id,
                                                                            index
                                                                        )
                                                                    "
                                                                    >mdi-delete</v-icon
                                                                >
                                                            </div>
                                                        </v-card-title>
                                                        <v-card-text>
                                                            <v-img
                                                                :src="
                                                                    photo.linkphoto
                                                                "
                                                                aspect-ratio="1"
                                                                class="mb-2"
                                                            ></v-img>
                                                            <p
                                                                style="
                                                                    color: grey;
                                                                    font-size: 0.9em;
                                                                "
                                                            >
                                                                {{
                                                                    photo.DatePhoto
                                                                }}
                                                            </p>
                                                            <!-- عرض وقت الصورة -->
                                                        </v-card-text>
                                                    </v-card>
                                                </v-col>
                                            </v-row>

                                            <v-dialog
                                                v-model="dialogAddPhoto"
                                                max-width="500px"
                                            >
                                                <v-card>
                                                    <v-card-title>
                                                        <span class="headline"
                                                            >إضافة صوره
                                                            جديدة</span
                                                        >
                                                    </v-card-title>
                                                    <v-card-text>
                                                        <v-form ref="addForm">
                                                            <v-file-input
                                                                style="
                                                                    width: 100%;
                                                                "
                                                                v-model="
                                                                    AddPhoto.file
                                                                "
                                                                label="صورة"
                                                                accept="image/*"
                                                                variant="outlined"
                                                                prepend-icon=""
                                                                width="100%"
                                                                prepend-inner-icon="mdi-paperclip"
                                                                required
                                                            ></v-file-input>
                                                            <v-textarea
                                                                v-model="
                                                                    AddPhoto.grade
                                                                "
                                                                label="وصف الصوره"
                                                                required
                                                            ></v-textarea>
                                                        </v-form>
                                                    </v-card-text>
                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn
                                                            color="blue darken-1"
                                                            text
                                                            @click="
                                                                dialogAddPhoto = false
                                                            "
                                                            >إلغاء</v-btn
                                                        >
                                                        <v-btn
                                                            color="blue darken-1"
                                                            text
                                                            @click="
                                                                addPhoto(
                                                                    selectedStudent.id
                                                                )
                                                            "
                                                            >حفظ</v-btn
                                                        >
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </div>
                                    </form>
                                </v-stepper-window>
                            </v-stepper>
                        </v-dialog>
                    </v-list-item>
                </v-list>
            </v-col>
            <v-col cols="2">
                <v-dialog
                    transition="dialog-top-transition"
                    width="90%"
                    v-model="dialogStore.dialog_addstudent"
                >
                    <template v-slot:default>
                        <v-card
                            class="mx-auto text-white"
                            style="
                                background: #3875a5 !important;
                                color: white !important;
                                width: 100% !important;
                            "
                        >
                            <v-toolbar title=" معلومات الطالب وولى امره">
                                <v-btn
                                    icon
                                    @click="
                                        dialogStore.dialog_addstudent = false
                                    "
                                >
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </v-toolbar>

                            <v-tabs v-model="tab" bg-color="primary">
                                <v-tab value="student">بيانات الطالب</v-tab>
                                <v-tab value="parent">ولي الأمر</v-tab>
                            </v-tabs>
                            <!-- 111111111111111111111111111111111111111111111111111111111111111111111111111111 -->
                            <v-card-text>
                                <v-tabs-window v-model="tab">
                                    <v-tabs-window-item value="student">
                                        <form @submit.prevent="submit">
                                            <div style="padding: 20px">
                                                <!-- حقل معرف الطالب -->
                                                <v-text-field
                                                    v-model="form.student_id"
                                                    style="width: 100%"
                                                    :error-messages="
                                                        errors.student_id
                                                    "
                                                    required
                                                    label="الرقم القومى"
                                                ></v-text-field>

                                                <div
                                                    style="
                                                        width: 100%;
                                                        display: flex;
                                                        gap: 20px;
                                                    "
                                                >
                                                    <v-text-field
                                                        v-model="
                                                            form.student_name
                                                        "
                                                        style="width: 50%"
                                                        :error-messages="
                                                            errors.student_name
                                                        "
                                                        required
                                                        label="اسم الطالب"
                                                    ></v-text-field>

                                                    <v-select
                                                        :items="[
                                                            '1/1',
                                                            '1/2',
                                                            '1/3',
                                                            '1/4',
                                                            '1/5',
                                                            '1/6',
                                                            '2/1',
                                                            '2/2',
                                                            '2/3',
                                                            '2/4',
                                                            '2/5',
                                                            '2/6',
                                                            '3/1',
                                                            '3/2',
                                                            '3/3',
                                                            '3/4',
                                                            '3/5',
                                                            '3/6',
                                                        ]"
                                                        variant="outlined"
                                                        style="width: 50%"
                                                        v-model="form.class"
                                                        :error-messages="
                                                            errors.class
                                                        "
                                                        label="الفصل"
                                                        required
                                                    ></v-select>
                                                </div>

                                                <div
                                                    style="
                                                        width: 100%;
                                                        display: flex;
                                                        gap: 20px;
                                                    "
                                                >
                                                    <v-select
                                                        v-model="form.gender"
                                                        style="width: 100%"
                                                        :error-messages="
                                                            errors.gender
                                                        "
                                                        label="الجنس"
                                                        required
                                                        :items="['أنثى', 'ذكر']"
                                                        variant="outlined"
                                                    ></v-select>
                                                </div>

                                                <v-select
                                                    v-model="form.section"
                                                    :error-messages="
                                                        errors.section
                                                    "
                                                    label="القسم"
                                                    required
                                                    :items="['عربي', 'لغات']"
                                                    variant="outlined"
                                                ></v-select>

                                                <v-menu
                                                    ref="menu"
                                                    v-model="menu"
                                                    :close-on-content-click="
                                                        false
                                                    "
                                                    transition="scale-transition"
                                                    offset-y
                                                    min-width="290px"
                                                    @open="initializeTempDate"
                                                >
                                                    <template
                                                        v-slot:activator="{
                                                            on,
                                                            attrs,
                                                        }"
                                                    >
                                                        <v-text-field
                                                            v-model="
                                                                formattedDate
                                                            "
                                                            label="تاريخ الميلاد"
                                                            prepend-icon="mdi-calendar"
                                                            readonly
                                                            @click="menu = true"
                                                            :error-messages="
                                                                errors.birthday
                                                            "
                                                            required
                                                            v-bind="attrs"
                                                            v-on="on"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-card>
                                                        <v-date-picker
                                                            v-model="tempDate"
                                                            locale="ar"
                                                            scrollable
                                                            :first-day-of-week="
                                                                1
                                                            "
                                                        ></v-date-picker>
                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn
                                                                text
                                                                @click="
                                                                    menu = false
                                                                "
                                                                >إلغاء</v-btn
                                                            >
                                                            <v-btn
                                                                text
                                                                @click="
                                                                    confirmDate
                                                                "
                                                                >تأكيد</v-btn
                                                            >
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-menu>

                                                <div class="text-center">
                                                    <v-btn
                                                        append-icon="mdi-account-circle"
                                                        type="submit"
                                                        style="
                                                            background: rgb(
                                                                70,
                                                                122,
                                                                164
                                                            );
                                                            color: white;
                                                            font-size: 24px;
                                                            padding: 3px;
                                                            width: 42%;
                                                        "
                                                        >إضافة طالب</v-btn
                                                    >
                                                </div>
                                            </div>
                                        </form>
                                    </v-tabs-window-item>

                                    <v-tabs-window-item value="parent">
                                        <form @submit.prevent="submitParent">
                                            <div style="padding: 20px">
                                                <v-text-field
                                                    v-model="form.parent_name"
                                                    style="width: 100%"
                                                    :error-messages="
                                                        errors.parent_name
                                                    "
                                                    required
                                                    label="اسم ولي الأمر"
                                                ></v-text-field>

                                                <v-text-field
                                                    v-model="
                                                        form.parent_national_id
                                                    "
                                                    style="width: 100%"
                                                    :error-messages="
                                                        errors.parent_national_id
                                                    "
                                                    required
                                                    label="الرقم القومي"
                                                ></v-text-field>
                                            </div>
                                        </form>
                                    </v-tabs-window-item>
                                </v-tabs-window>
                            </v-card-text>
                        </v-card>
                    </template>
                </v-dialog>
            </v-col>
        </v-row>
        <confirm_message2
            v-model="showSnackbar"
            :text="confirmationText"
            :snackbar="showSnackbar"
            @close-snackbar="showSnackbar = false"
        />
    </v-container>
</template>

<script>
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Empty_error from "@/components/Empty_error.vue";
import {
    collection,
    // addDoc,
    deleteDoc,
    getDocs,
    doc,
    getFirestore,
    getDoc,
    updateDoc,
    setDoc,
    query,
    where,
    arrayUnion,
} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBdk3sqIHjXvB2C-O-lvkRgMFpg8pemkno",
    authDomain: "alseraj--almoner.firebaseapp.com",
    projectId: "alseraj--almoner",
    storageBucket: "alseraj--almoner.appspot.com",
    messagingSenderId: "462211256149",
    appId: "1:462211256149:web:a03ace3c70b306620169dc",
};
import { getStorage } from "firebase/storage";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css"; // Import the CSS file
import { initializeApp } from "@firebase/app";

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
import confirm_message2 from "@/components/confirm_message2.vue";

export { db, storage };
import "jspdf-autotable";
// import Amiri_Regular from "@/assets/fonts/Amiri-Regular.js";
import Chart from "chart.js/auto";
import { mapActions } from "pinia";
import { usenotification } from "../store/notification.js";
import { useDialogStore } from "@/store/useDialogStore";
import { mapState } from "pinia";
import { useAuthStore } from "../store/userStore";
export default {
    name: "StudentList",
    components: {
        confirm_message2,
        Empty_error,
    },
    props: {
        year: {
            type: Number,
            required: true,
        },
        sortStudents: Function,
        selectedSection: {
            type: String,
            default: "الكل",
        },
        dialog: {
            type: Boolean,
            required: true,
        },
        isSortedAscending: Boolean,
        paymentSortActive: Boolean,
        gradeSortActive: String,
        gradeOptions: Array,
    },
    setup() {
        const toast = useToast();

        // Example usage of toast
        // toast.success("This is a success message!");

        const dialogStore = useDialogStore();
        return { dialogStore, toast };
    },
    data() {
        return {
            state: true,
            dialog_stu: false,
            CreateChart: false,
            myChart: null,
            searchId: "", // متغير لتخزين معرف الطالب الذي تريد البحث عنه
            menuz: false,
            steps: [
                "معلومات الطالب",
                "ولي الامر",
                "النتائج الاسبوعيه",
                "النتائج الشهريه",
                "المدفوعات",
                "الاشعارات",
                "الصور",
            ],
            selectedParent: {
                National_id: "",
                name: "",
                Child: [], // مصفوفة تحتوي على أسماء الأبناء
            },
            tempDatez: null,
            editNotificationsDialog: false,
            editPhotosDialog: false,
            dialogAddNotice: false,
            dialogAddPhoto: false,
            dialogs: false,
            editedField: "",
            editedValue: "",
            randomPassword: "",
            selectedMonth: "شهر أكتوبر",
            dialogAddSubject: false,
            newSubject: {
                Subject_Name: "",
                Major_degree: null,
                Student_degree: null,
                Date: null,
            },
            maxExpenses: 0,
            years: "",
            AddNotice: {
                NoticeTitle: "",
                theDescription: "",
                NotificationType: "",
            },
            AddPhoto: {
                Date: "",
                link: "",
            },
            visible: false,
            menu: false,
            e1: 1,
            students_class: [],
            dialog_addstudent: false,
            searchQuery: "",
            students: [],
            form: {
                educational_level: this.year,
                student_name: "",
                class: "",
                gender: "",
                section: "",
                birthday: null,
                parent_name: "",
                national_id: "",

                Guardian: [
                    { Guardian_name: "" },
                    { Guardian_phone: "" },
                    { Guardian_email: "" },
                    { Guardian_password: "" },
                    { Brothers_in_school: "" },
                    { brother: [""] },
                ],
                errors: {},
                Results: [
                    {
                        weekly: [
                            {
                                Subject_Name: "دين",
                                Major_degree: 100,
                                Student_degree: 96,
                                Date_Test: "15/5",
                            },
                            {
                                Subject_Name: "دراسات",
                                Major_degree: 50,
                                Student_degree: 42,
                                Date_Test: "11/5",
                            },
                        ],
                    },
                    {
                        Monthly: [
                            {
                                Certificate_title: "شهر أكتوبر",
                                Degrees: [
                                    {
                                        Subject_Name: "عربي",
                                        Teacher_Name: "عماد عمر",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 99,
                                    },
                                    {
                                        Subject_Name: "قرآن كريم",
                                        Teacher_Name: "نور محمود",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 95,
                                    },
                                    {
                                        Subject_Name: " جغرافيا",
                                        Teacher_Name: "علاء محمود",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 80,
                                    },
                                    {
                                        Subject_Name: " تاريخ",
                                        Teacher_Name: "خالد محمد",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 77,
                                    },
                                ],
                            },
                            {
                                Certificate_title: "شهر نوفمبر",
                                Degrees: [
                                    {
                                        Subject_Name: "انجليزى",
                                        Teacher_Name: "كريم عمر",
                                        Behavior_assessment: "جيد",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 98,
                                    },
                                    {
                                        Subject_Name: " جغرافيا",
                                        Teacher_Name: "كمال محمود",
                                        Behavior_assessment: "جيد جدا",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 94,
                                    },
                                    {
                                        Subject_Name: " جغرافيا",
                                        Teacher_Name: "علاء محمود",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 82,
                                    },
                                    {
                                        Subject_Name: " تاريخ",
                                        Teacher_Name: "خالد محمد",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 79,
                                    },
                                ],
                            },
                            {
                                Certificate_title: "الترم الأول",
                                Degrees: [
                                    {
                                        Subject_Name: "انجليزى",
                                        Teacher_Name: "كريم عمر",
                                        Behavior_assessment: "جيد",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 98,
                                    },
                                    {
                                        Subject_Name: " جغرافيا",
                                        Teacher_Name: "كمال محمود",
                                        Behavior_assessment: "جيد جدا",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 94,
                                    },
                                    {
                                        Subject_Name: " جغرافيا",
                                        Teacher_Name: "علاء محمود",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 82,
                                    },
                                    {
                                        Subject_Name: " تاريخ",
                                        Teacher_Name: "خالد محمد",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 79,
                                    },
                                ],
                            },
                            {
                                Certificate_title: "شهر فبراير",
                                Degrees: [
                                    {
                                        Subject_Name: "انجليزى",
                                        Teacher_Name: "كريم عمر",
                                        Behavior_assessment: "جيد",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 98,
                                    },
                                    {
                                        Subject_Name: " جغرافيا",
                                        Teacher_Name: "كمال محمود",
                                        Behavior_assessment: "جيد جدا",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 94,
                                    },
                                    {
                                        Subject_Name: " جغرافيا",
                                        Teacher_Name: "علاء محمود",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 82,
                                    },
                                    {
                                        Subject_Name: " تاريخ",
                                        Teacher_Name: "خالد محمد",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 79,
                                    },
                                ],
                            },
                            {
                                Certificate_title: "شهر مارس",
                                Degrees: [
                                    {
                                        Subject_Name: "انجليزى",
                                        Teacher_Name: "كريم عمر",
                                        Behavior_assessment: "جيد",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 98,
                                    },
                                    {
                                        Subject_Name: " جغرافيا",
                                        Teacher_Name: "كمال محمود",
                                        Behavior_assessment: "جيد جدا",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 94,
                                    },
                                    {
                                        Subject_Name: " جغرافيا",
                                        Teacher_Name: "علاء محمود",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 82,
                                    },
                                    {
                                        Subject_Name: " تاريخ",
                                        Teacher_Name: "خالد محمد",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 79,
                                    },
                                ],
                            },
                            {
                                Certificate_title: "الترم الثاني",
                                Degrees: [
                                    {
                                        Subject_Name: "انجليزى",
                                        Teacher_Name: "كريم عمر",
                                        Behavior_assessment: "جيد",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 98,
                                    },
                                    {
                                        Subject_Name: " جغرافيا",
                                        Teacher_Name: "كمال محمود",
                                        Behavior_assessment: "جيد جدا",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 94,
                                    },
                                    {
                                        Subject_Name: " جغرافيا",
                                        Teacher_Name: "علاء محمود",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 82,
                                    },
                                    {
                                        Subject_Name: " تاريخ",
                                        Teacher_Name: "خالد محمد",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 79,
                                    },
                                ],
                            },
                        ],
                    },
                ],
                payments: {
                    Expenses: 1000,
                    payment_System: "",
                    Installment_System: "",
                    paid_Up: 100,
                    Residual: 0,
                },
                Notifications: [],

                photos: [],
            },
            loading1: true, // خاصية لتحميل البيانات
            errors: {
                parent_name: [],
                parent_national_id: [],
                student_name: [],
                class: [],
                educational_level: [],
                gender: [],
                section: [],
                birthday: [],
                Guardian_name: [],
                Guardian_phone: [],
                Guardian_email: [],
                Guardian_password: [],
                Brothers_in_school: [],
                brother: [],
                weekly_Subject_Name: [],
                weekly_Degree: [],
                weekly_Data: [],
                monthly_Certifications_title: [],
                monthly_Subject_Name: [],
                monthly_Teacher_Name: [],
                monthly_Behavior_assessment: [],
                monthly_Minor_degree: [],
                monthly_Major_degree: [],
                monthly_Student_degree: [],
                payments_Required: [],
                payments_paid_up: [],
                payments_installment_system: [],
                Notifications_Title: [],
                Notifications_Details: [],
            },
            selectedClassId: "",
            currentStep: "Step 1",
            progress: 75,
            classes: [
                "الصف الثالث الثانوي",
                "الصف الثاني الثانوي",
                " الصف أولى ثانوي",
                "الصف الثالث الاعدادي",
                "الصف الثاني الاعدادي",
                "الصف الاول الاعدادي",
                "الصف السادس الابتدائي",
                "الصف الخامس الابتدائي",
                "الصف الرابع الابتدائي",
                "الصف الثالث الابتدائي",
                "الصف الثاني الابتدائي",
                "الصف الاول الابتدائي",
                "ثانيه روضه",
                " اولي روضه",
            ],
            tempDate: null,
            formattedDate: "",
            editDialog: false,
            editedIndex: -1,
            editedSubject: {
                Subject_Name: "",
                Major_degree: 0,
                Student_degree: 0,
                Date: null,
            },
            editedNotifications: {
                NoticeTitle: "",
                theDescription: "",
                NotificationType: "",
            },
            editedPhotos: {
                Date: "",
                link: "",
            },
            loading: false,
            currentStudentId: null,
            valid: false,
            editedmony: {
                Requird: 0,
                paid_up: 0,
                installment_system: "",
            },
            hhhh: false,
            editednas: {
                Requird: 100,
                paid_up: 120,
                installment_system: "شهريا",
            },
            selectedStudent: "",
            dialogStudentDetails: false,
            changesMade: false,
            changesMade2: false,
            changesMade3: false,
            interval: null,
            value: 0,
            tab_1: 0,
            paymentMethod: null,
            paymentMethods: ["الدفع المباشر", "نظام التقسيط"],
            dialogSuccess: false,
            transitionTimeline: false, // متغير للتحكم في الانتقال للـ timeline-item-content
            transitionProgress: false, // متغير للتحكم في الانتقال للبروجريس بار
            alertMessage: false,
            reachedProgress: false,
            currentActive: 0,
            // circles: [],
            totalAmount: null,
            paidAmount: 0,
            tab_5: null,
            tab_4: null,
            tab_2: null,
            tab: "option-1", // تحديد التاب الافتراضي
            selectedGrade: null,
            gradeLevels: ["الصف الأول", "الصف الثاني", "الصف الثالث"],
            selectedPlan: null,
            selectPaid: ["شهر", "شهرين", "3 شهور", "4 شهور", "5 شهور"],
            amount: 0,
            selectedPaymentPlan: null,
            paymentPlans: ["شهر", "شهرين", "3 شهور", "4 شهور", "5 شهور"],
            showSnackbar: false,
            confirmationText: "",
        };
    },
    async created() {
        await this.fetchStudents();
        this.years = new Date().getFullYear();
    },
    methods: {
        async loadStudents() {
            try {
                const studentsSnapshot = await getDocs(
                    collection(db, "students")
                );
                this.students = studentsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    state: doc.data().state || false, // استخدم حالة 'state' الحالية إذا كانت موجودة
                }));
            } catch (error) {
                console.error("Error loading students:", error);
            }
        },
        async toggleIcon(student) {
            const studentRef = doc(db, "students", student.id);
            const newState = !student.state;
            try {
                await updateDoc(studentRef, { state: newState });
                // تحديث الحالة المحلية للطالب
                this.students = this.students.map((s) =>
                    s.id === student.id ? { ...s, state: newState } : s
                );
            } catch (error) {
                console.error("Error updating document:", error);
            }
        },
        icon(student) {
            return student.state ? "mdi-eye-off" : "mdi-eye";
        },
        ...mapActions(usenotification, ["send_Notification"]),
        getMonthlyDegrees(student, month) {
            const monthIndex = this.gradeOptions.indexOf(month);
            if (monthIndex === -1) return 0;
            const degrees =
                student.Results[1].Monthly[monthIndex]?.Degrees || [];
            let total = 0;
            degrees.forEach((degree) => {
                total += Number(degree.Student_degree);
            });
            const maxDegrees = degrees.length * 100;
            return (total / maxDegrees) * 100;
        },
        totalDegrees(student) {
            const degrees = student.Results[1].Monthly[0].Degrees; // Assuming the first month is the desired one
            let total = 0;
            degrees.forEach((degree) => {
                total += Number(degree.Student_degree); // Ensuring the degree is a number
            });
            return total;
        },
        percentageTotalDegrees(student) {
            const totalDegrees = this.totalDegrees(student);
            const maxDegrees =
                student.Results[1].Monthly[0].Degrees.length * 100; // Assuming each subject has a max of 100
            return (totalDegrees / maxDegrees) * 100;
        },
        totalDegrees2(student) {
            const degrees = student.Results[1].Monthly[1].Degrees; // Assuming the first month is the desired one
            let total = 0;
            degrees.forEach((degree) => {
                total += Number(degree.Student_degree); // Ensuring the degree is a number
            });
            return total;
        },
        percentageTotalDegrees2(student) {
            const totalDegrees = this.totalDegrees2(student);
            const maxDegrees =
                student.Results[1].Monthly[1].Degrees.length * 100; // Assuming each subject has a max of 100
            return (totalDegrees / maxDegrees) * 100;
        },
        totalDegrees3(student) {
            const degrees = student.Results[1].Monthly[2].Degrees; // Assuming the first month is the desired one
            let total = 0;
            degrees.forEach((degree) => {
                total += Number(degree.Student_degree); // Ensuring the degree is a number
            });
            return total;
        },
        percentageTotalDegrees3(student) {
            const totalDegrees = this.totalDegrees3(student);
            const maxDegrees =
                student.Results[1].Monthly[2].Degrees.length * 100; // Assuming each subject has a max of 100
            return (totalDegrees / maxDegrees) * 100;
        },
        totalDegrees4(student) {
            const degrees = student.Results[1].Monthly[3].Degrees; // Assuming the first month is the desired one
            let total = 0;
            degrees.forEach((degree) => {
                total += Number(degree.Student_degree); // Ensuring the degree is a number
            });
            return total;
        },
        percentageTotalDegrees4(student) {
            const totalDegrees = this.totalDegrees4(student);
            const maxDegrees =
                student.Results[1].Monthly[3].Degrees.length * 100; // Assuming each subject has a max of 100
            return (totalDegrees / maxDegrees) * 100;
        },
        totalDegrees5(student) {
            const degrees = student.Results[1].Monthly[4].Degrees; // Assuming the first month is the desired one
            let total = 0;
            degrees.forEach((degree) => {
                total += Number(degree.Student_degree); // Ensuring the degree is a number
            });
            return total;
        },
        percentageTotalDegrees5(student) {
            const totalDegrees = this.totalDegrees5(student);
            const maxDegrees =
                student.Results[1].Monthly[4].Degrees.length * 100; // Assuming each subject has a max of 100
            return (totalDegrees / maxDegrees) * 100;
        },
        totalDegrees6(student) {
            const degrees = student.Results[1].Monthly[5].Degrees; // Assuming the first month is the desired one
            let total = 0;
            degrees.forEach((degree) => {
                total += Number(degree.Student_degree); // Ensuring the degree is a number
            });
            return total;
        },
        percentageTotalDegrees6(student) {
            const totalDegrees = this.totalDegrees6(student);
            const maxDegrees =
                student.Results[1].Monthly[5].Degrees.length * 100; // Assuming each subject has a max of 100
            return (totalDegrees / maxDegrees) * 100;
        },
        async updateField(section, index, field, value) {
            if (!this.selectedStudent) {
                console.error("Error: selectedStudent is null");
                return;
            }

            // Update the selected student data
            this.selectedStudent[section][index][field] = value;
            this.changesMade = true;
            // Call updateFirebaseField to update Firestore
            await this.updateFirebaseField();
        },

        async updateFirebaseField() {
            try {
                const studentDoc = doc(db, "students", this.selectedStudent.id);

                // Update only the necessary fields in Firestore
                await updateDoc(studentDoc, {
                    student_name: this.selectedStudent.student_name,
                    class: this.selectedStudent.class,
                    gender: this.selectedStudent.gender,
                    section: this.selectedStudent.section,
                    birthday: this.selectedStudent.birthday,
                });

                console.log("Document updated successfully");
            } catch (error) {
                console.error("Error updating document:", error);
            }
        },
        markChanges() {
            // Mark changes only, without updating Firebase
            if (!this.changesMade) {
                this.changesMade = true;
                // Optionally, you can also store the original data for comparison
                this.originalStudentData = JSON.parse(
                    JSON.stringify(this.selectedStudent)
                );
            }
        },
        handleCloseSnackbar() {
            this.showSnackbar = false; // تحديث حالة الرسالة في المكون الأم
        },
        async saveChanges() {
            try {
                const studentDoc = doc(db, "students", this.selectedStudent.id);
                // Update only if changes were marked

                if (this.changesMade) {
                    await updateDoc(studentDoc, {
                        student_name: this.selectedStudent.student_name,
                        class: this.selectedStudent.class,
                        gender: this.selectedStudent.gender,
                        section: this.selectedStudent.section,
                        birthday: this.selectedStudent.birthday,
                    });
                    console.log("Document updated successfully");
                }
                // Reset changesMade and original data
                this.changesMade = false;
                this.originalStudentData = {};
            } catch (error) {
                console.error("Error updating document:", error);
            }
        },
        selectMonth(month) {
            this.selectedMonth = month;
            // Fetch the data for the selected month
        },
        saveChanges2() {
            this.updateMonthlyDegrees(this.selectedMonthlyDegrees); // Example to update Firebase
            this.changesMade2 = false;
        },
        calculatePaymentProgress(paid_Up, Expenses) {
            if (Expenses === 0) {
                return 0; // لتجنب القسمة على الصفر
            }
            return (paid_Up / Expenses) * 100;
        },
        calculateLabelPosition(paid_Up, Expenses) {
            const progress = this.calculatePaymentProgress(paid_Up, Expenses);
            return `calc(${progress}% - 50px)`; // تعديلات صغيرة على القيمة لضبط الموقع
        },
        // getMonthlyDegrees(student, month) {
        //     const monthIndex = this.gradeOptions.indexOf(month);
        //     if (monthIndex === -1) return 0;
        //     const degrees =
        //         student.Results[1].Monthly[monthIndex]?.Degrees || [];
        //     let total = 0;
        //     degrees.forEach((degree) => {
        //         total += Number(degree.Student_degree);
        //     });
        //     const maxDegrees = degrees.length * 100;
        //     return (total / maxDegrees) * 100;
        // },
        async fetchStudents() {
            try {
                const q = query(
                    collection(db, "students"),
                    where("educational_level", "==", this.year)
                );
                this.loading1 = true; // بدء تحميل البيانات
                const querySnapshot = await getDocs(q);
                this.students = querySnapshot.docs.map((doc) => {
                    const studentData = doc.data();
                    const student = {
                        id: doc.id,
                        ...studentData,
                        birthday: this.formatDate(
                            new Date(studentData.birthday * 1000)
                        ), // Convert birthday to string if it's a Timestamp
                    };
                    // تحديث Residual بناءً على البيانات الجديدة
                    return student;
                });
                this.loading1 = false; // بدء تحميل البيانات
                console.log("Fetched students:", this.students);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        },
        // 3333333333333333333333333333333333333333333333333333333333333
        async submit() {
            if (this.validateForm()) {
                try {
                    // التأكد من أن تاريخ الميلاد يتم تخزينه كسلسلة منسقة
                    const formattedBirthday = this.formatDate(
                        new Date(this.form.birthday)
                    );

                    // إضافة الطالب إلى مجموعة "students" باستخدام `student_id` المخصص
                    await setDoc(doc(db, "students", this.form.student_id), {
                        student_name: this.form.student_name,
                        class: this.form.class,
                        gender: this.form.gender,
                        section: this.form.section,
                        birthday: formattedBirthday,
                        Results: this.form.Results,
                        payments: this.form.payments,
                        Notifications: this.form.Notifications,
                        photos: this.form.photos,
                        educational_level: this.year,
                        year: new Date().getFullYear(),
                        National_id: this.form.parent_national_id, // إضافة National_id هنا
                        state: true,
                    });

                    const newStudent = {
                        id: this.form.student_id,
                        student_name: this.form.student_name,
                        class: this.form.class,
                        gender: this.form.gender,
                        section: this.form.section,
                        birthday: formattedBirthday,
                        Results: this.form.Results,
                        payments: this.form.payments,
                        Notifications: this.form.Notifications,
                        photos: this.form.photos,
                        year: new Date().getFullYear(),
                        National_id: this.form.parent_national_id, // إضافة National_id هنا
                        state: true,
                    };

                    this.students.push(newStudent);

                    // تحقق من وجود مستند "Parents" بالرقم القومي
                    const parentDocRef = doc(
                        db,
                        "parents",
                        this.form.parent_national_id
                    );
                    const parentDoc = await getDoc(parentDocRef);

                    if (parentDoc.exists()) {
                        // إذا كان المستند موجوداً، فقط قم بإضافة اسم الطالب إلى قائمة Child
                        await setDoc(
                            parentDocRef,
                            {
                                Child: arrayUnion({
                                    student_name: this.form.student_name,
                                    educational_level: this.year,
                                    class: this.form.class,
                                }),
                            },
                            { merge: true }
                        );

                        console.log(
                            "Updated existing parent document successfully"
                        );
                    } else {
                        // إذا لم يكن المستند موجوداً، قم بإنشاء مستند جديد
                        await setDoc(parentDocRef, {
                            name: this.form.parent_name,
                            National_id: this.form.parent_national_id,
                            Child: [
                                {
                                    student_name: this.form.student_name,
                                    educational_level: this.year,
                                    class: this.form.class,
                                },
                            ],
                        });

                        console.log("Created new parent document successfully");
                    }

                    this.dialog_addstudent = false;
                    this.formattedDate = "";
                    this.handleReset();
                    this.dialogStore.hideAddStudentDialog();
                    this.$emit("close-dialog");
                    console.log("Added new student:", newStudent);
                    // إعداد نص الرسالة وتفعيل Snackbar
                    this.confirmationText = "تم إضافة الطالب بنجاح";
                    this.showSnackbar = true;
                    await this.fetchStudents();
                } catch (error) {
                    console.error("Error adding document:", error);
                }
            }
        },
        formatDate(date) {
            const d = new Date(date);
            let month = "" + (d.getMonth() + 1); // استخدام let بدلاً من const
            let day = "" + d.getDate(); // استخدام let بدلاً من const
            const year = d.getFullYear();

            if (month.length < 2) month = "0" + month;
            if (day.length < 2) day = "0" + day;

            return [year, month, day].join("-");
        },

        generateUniqueId() {
            return "id-" + Math.random().toString(36).substr(2, 9);
        },

        openDeleteDialog(studentId) {
            this.dialog_stu = studentId;
        },
        closeDeleteDialog() {
            this.dialog_stu = null;
        },
        async confirmDeleteStudent(studentId) {
            this.loading = true;
            try {
                await this.deleteStudent(studentId);
            } catch (error) {
                console.error("Error deleting student:", error);
            } finally {
                this.loading = false;
                this.closeDeleteDialog();
            }
        },
        async deleteStudent(id) {
            try {
                await deleteDoc(doc(db, "students", id));
                this.students = this.students.filter(
                    (student) => student.id !== id
                );
                // إعداد نص الرسالة وتفعيل Snackbar
                this.confirmationText = "تم مسح الطالب بنجاح";
                this.showSnackbar = true;
                console.log("Deleted student with id:", id);
            } catch (error) {
                console.error("Error deleting document:", error);
            }
        },
        handleReset() {
            this.form = {
                educational_level: this.year,
                student_name: "",
                class: "",
                gender: "",
                section: "",
                birthday: "2024/07/19",
                parent_name: "",
                national_id: "",

                Guardian: [
                    { Guardian_name: "" },
                    { Guardian_phone: "" },
                    { Guardian_email: "" },
                    { Guardian_password: "" },
                    { Brothers_in_school: "" },
                    { brother: [""] },
                ],
                errors: {},
                Results: [
                    {
                        weekly: [
                            {
                                Subject_Name: "دين",
                                Major_degree: 100,
                                Student_degree: 96,
                                Date_Test: 11 / 2,
                            },
                            {
                                Subject_Name: "دراسات",
                                Major_degree: 50,
                                Student_degree: 42,
                                Date_Test: 11 / 5,
                            },
                        ],
                    },
                    {
                        Monthly: [
                            {
                                Certificate_title: "شهر أكتوبر",
                                Degrees: [
                                    {
                                        Subject_Name: "عربي",
                                        Teacher_Name: "عماد عمر",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 99,
                                    },
                                    {
                                        Subject_Name: "قرآن كريم",
                                        Teacher_Name: "نور محمود",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 95,
                                    },
                                    {
                                        Subject_Name: " جغرافيا",
                                        Teacher_Name: "علاء محمود",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 80,
                                    },
                                    {
                                        Subject_Name: " تاريخ",
                                        Teacher_Name: "خالد محمد",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 77,
                                    },
                                ],
                            },
                            {
                                Certificate_title: "شهر نوفمبر",
                                Degrees: [
                                    {
                                        Subject_Name: "انجليزى",
                                        Teacher_Name: "كريم عمر",
                                        Behavior_assessment: "جيد",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 98,
                                    },
                                    {
                                        Subject_Name: " جغرافيا",
                                        Teacher_Name: "كمال محمود",
                                        Behavior_assessment: "جيد جدا",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 94,
                                    },
                                    {
                                        Subject_Name: " جغرافيا",
                                        Teacher_Name: "علاء محمود",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 82,
                                    },
                                    {
                                        Subject_Name: " تاريخ",
                                        Teacher_Name: "خالد محمد",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 79,
                                    },
                                ],
                            },
                            {
                                Certificate_title: "الترم الأول",
                                Degrees: [
                                    {
                                        Subject_Name: "انجليزى",
                                        Teacher_Name: "كريم عمر",
                                        Behavior_assessment: "جيد",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 98,
                                    },
                                    {
                                        Subject_Name: " جغرافيا",
                                        Teacher_Name: "كمال محمود",
                                        Behavior_assessment: "جيد جدا",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 94,
                                    },
                                    {
                                        Subject_Name: " جغرافيا",
                                        Teacher_Name: "علاء محمود",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 82,
                                    },
                                    {
                                        Subject_Name: " تاريخ",
                                        Teacher_Name: "خالد محمد",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 79,
                                    },
                                ],
                            },
                            {
                                Certificate_title: "شهر فبراير",
                                Degrees: [
                                    {
                                        Subject_Name: "انجليزى",
                                        Teacher_Name: "كريم عمر",
                                        Behavior_assessment: "جيد",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 98,
                                    },
                                    {
                                        Subject_Name: " جغرافيا",
                                        Teacher_Name: "كمال محمود",
                                        Behavior_assessment: "جيد جدا",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 94,
                                    },
                                    {
                                        Subject_Name: " جغرافيا",
                                        Teacher_Name: "علاء محمود",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 82,
                                    },
                                    {
                                        Subject_Name: " تاريخ",
                                        Teacher_Name: "خالد محمد",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 79,
                                    },
                                ],
                            },
                            {
                                Certificate_title: "شهر مارس",
                                Degrees: [
                                    {
                                        Subject_Name: "انجليزى",
                                        Teacher_Name: "كريم عمر",
                                        Behavior_assessment: "جيد",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 98,
                                    },
                                    {
                                        Subject_Name: " جغرافيا",
                                        Teacher_Name: "كمال محمود",
                                        Behavior_assessment: "جيد جدا",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 94,
                                    },
                                    {
                                        Subject_Name: " جغرافيا",
                                        Teacher_Name: "علاء محمود",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 82,
                                    },
                                    {
                                        Subject_Name: " تاريخ",
                                        Teacher_Name: "خالد محمد",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 79,
                                    },
                                ],
                            },
                            {
                                Certificate_title: "الترم الثاني",
                                Degrees: [
                                    {
                                        Subject_Name: "انجليزى",
                                        Teacher_Name: "كريم عمر",
                                        Behavior_assessment: "جيد",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 98,
                                    },
                                    {
                                        Subject_Name: " جغرافيا",
                                        Teacher_Name: "كمال محمود",
                                        Behavior_assessment: "جيد جدا",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 94,
                                    },
                                    {
                                        Subject_Name: " جغرافيا",
                                        Teacher_Name: "علاء محمود",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 82,
                                    },
                                    {
                                        Subject_Name: " تاريخ",
                                        Teacher_Name: "خالد محمد",
                                        Behavior_assessment: "ممتاز",
                                        Minor_degree: 50,
                                        Major_degree: 100,
                                        Student_degree: 79,
                                    },
                                ],
                            },
                        ],
                    },
                ],
                payments: {
                    Requird: 0,
                    paid_up: 0,
                    installment_system: "",
                },
                Notifications: [],

                photos: [],
            };
        },
        validateForm() {
            let isValid = true;
            // Clear previous error messages
            // Validation rules
            if (!this.form.student_name) {
                this.errors.student_name.push("اسم الطالب مطلوب.");
                isValid = false;
            }
            // if (!this.form.student_information[1].class) {
            //     this.errors.class.push("الفصل مطلوب.");
            // }
            // if (!this.form.student_information[2].educational_level) {
            //     this.errors.educational_level.push("المستوى التعليمي مطلوب.");
            // }
            // if (!this.form.student_information[3].gender) {
            //     this.errors.gender.push("الجنس مطلوب.");
            // }
            // if (!this.form.student_information[4].section) {
            //     this.errors.section.push("القسم مطلوب.");
            // }
            // if (!this.form.student_information[5].birthday) {
            //     this.errors.birthday.push("تاريخ الميلاد مطلوب.");
            // }

            return isValid;
        },
        async searchStudent() {
            try {
                const trimmedQuery = this.searchQuery.trim().toLowerCase();
                // Fetch all students if search query is empty
                if (!trimmedQuery) {
                    const querySnapshot = await getDocs(
                        collection(db, "students")
                    );
                    this.students = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                        showDetails: false,
                    }));
                } else {
                    // Perform search based on the trimmed search query
                    const querySnapshot = await getDocs(
                        collection(db, "students")
                    );
                    this.students = querySnapshot.docs
                        .map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                            showDetails: false,
                        }))
                        .filter((student) =>
                            student.student_name
                                .toLowerCase()
                                .includes(trimmedQuery)
                        );
                }
            } catch (error) {
                console.error("Error searching students:", error);
            }
        },
        removeItem(index) {
            this.testform4.splice(index, 1);
        },
        generateRandomPassword() {
            // توليد كلمة مرور عشوائية
            const characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let password = "";
            for (let i = 0; i < 8; i++) {
                password += characters.charAt(
                    Math.floor(Math.random() * characters.length)
                );
            }
            // تحديث حالة المكون لعرض الكلمة المرور الجديدةة
            this.randomPassword = password;
            return this.randomPassword;
        },
        toggleVisibility() {
            this.visible = !this.visible;
        },
        async copyPassword() {
            const toast = useToast();
            try {
                await navigator.clipboard.writeText(this.randomPassword);
                toast.success("تم نسخ الباسورد!");
            } catch (err) {
                console.error("Failed to copy text: ", err);
                toast.error("فشل في نسخ الباسورد", {
                    className: "custom-toast-error",
                });
            }
        },
        // 44444444444444444444444444444444444444444
        async loadParentDetails(National_id) {
            if (!National_id) {
                console.error("No National_id provided");
                return;
            }

            console.log("Loading parent details for National_id:", National_id);

            try {
                // جلب بيانات الأب من كوليكشن Parents
                const parentDoc = doc(db, "parents", National_id);
                const parentSnapshot = await getDoc(parentDoc);

                if (parentSnapshot.exists()) {
                    const parentData = parentSnapshot.data();
                    this.selectedParent = {
                        name: parentData.name || "غير متوفر",
                        Child: [],
                    };

                    // جلب الأطفال من كوليكشن students
                    const studentsQuery = query(
                        collection(db, "students"),
                        where("National_id", "==", National_id)
                    );
                    const studentsSnapshot = await getDocs(studentsQuery);

                    const children = [];
                    studentsSnapshot.forEach((doc) => {
                        children.push({
                            student_name: doc.data().student_name,
                            educational_level: doc.data().educational_level,
                            class: doc.data().class,
                        });
                    });

                    this.selectedParent.Child = children;
                } else {
                    console.error("No such document!");
                    this.selectedParent = {
                        name: "غير متوفر",
                        Child: [],
                    };
                }
            } catch (error) {
                console.error("Error getting document:", error);
                this.selectedParent = {
                    name: "خطأ في جلب البيانات",
                    Child: [],
                };
            }
        },
        openStudentDetails(student) {
            this.selectedStudent = student;
            this.loadParentDetails(student.National_id);
            this.dialogStudentDetails = true;
        },
        // l;
        initializeTempDate() {
            // this.tempDate = this.form.birthday;
            this.tempDate = this.form.birthday;
            new Date().toISOString().substr(0, 10);
        },
        confirmDate() {
            this.form.birthday = this.tempDate;
            this.formattedDate = this.formatDate(this.tempDate);
            this.menu = false;
        },

        // ik
        async addSubject(studentId) {
            try {
                const studentRef = doc(db, "students", studentId);
                const studentDoc = await getDoc(studentRef);
                if (studentDoc.exists()) {
                    const studentData = studentDoc.data();
                    studentData.Results[0].weekly.push({
                        Subject_Name: this.newSubject.Subject_Name,
                        Major_degree: this.newSubject.Major_degree,
                        Student_degree: this.newSubject.Student_degree,
                        Date: this.newSubject.Date,
                    });
                    // Update selectedStudent with the updated data
                    // عند تحديث selectedStudent باستخدام بيانات محدثة
                    this.selectedStudent = Object.assign(
                        {},
                        this.selectedStudent,
                        studentData
                    );

                    // Update the student document with the new weekly result
                    await updateDoc(studentRef, studentData);

                    // Close the dialog after adding the subject
                    this.dialogAddSubject = false;

                    // Reset newSubject for future additions
                    this.newSubject = {
                        Subject_Name: "",
                        Major_degree: null,
                        Student_degree: null,
                        Date: null,
                    };
                    // إعداد نص الرسالة وتفعيل Snackbar
                    this.confirmationText = "تم  اضافه الماده بنجاح";
                    this.showSnackbar = true;
                    // Fetch students again to update the UI
                    await this.fetchStudents();
                }
            } catch (error) {
                console.error("Error adding subject:", error);
            }
        },

        editSubject(studentId, index) {
            this.editedStudentId = studentId;
            this.editedIndex = index;
            const student = this.students.find(
                (student) => student.id === studentId
            );

            if (student) {
                this.editedSubject = {
                    ...student.Results[0].weekly[index],
                };
                this.editDialog = true;
            }
        },
        async saveEdit() {
            try {
                const studentRef = doc(db, "students", this.editedStudentId);
                const studentDoc = await getDoc(studentRef);
                if (studentDoc.exists()) {
                    const studentData = studentDoc.data();
                    Object.assign(
                        studentData.Results[0].weekly[this.editedIndex],
                        this.editedSubject
                    );
                    // عند تحديث selectedStudent باستخدام بيانات محدثة
                    this.selectedStudent = Object.assign(
                        {},
                        this.selectedStudent,
                        studentData
                    );
                    console.log(this.selectedStudent);

                    await updateDoc(studentRef, studentData);
                    this.closeDialog();
                    // إعداد نص الرسالة وتفعيل Snackbar
                    this.confirmationText = "تم  تعديل الماده بنجاح";
                    this.showSnackbar = true;
                    await this.fetchStudents();
                }
            } catch (error) {
                console.error("Error editing subject:", error);
            }
        },
        closeDialog() {
            this.editDialog = false;
            this.editedIndex = -1;
            this.editedSubject = {
                Subject_Name: "",
                Major_degree: 0,
                Student_degree: 0,
                Date: null, // إعادة تعيين التاريخ
            };
        },
        async deleteSubject(studentId, subjectIndex) {
            try {
                const studentRef = doc(db, "students", studentId);
                const studentDoc = await getDoc(studentRef);

                if (!studentDoc.exists()) {
                    console.error("Student does not exist with id:", studentId);
                    return;
                }

                const studentData = studentDoc.data();

                if (!studentData.Results || !studentData.Results[0].weekly) {
                    console.error(
                        "Invalid student data structure:",
                        studentData
                    );
                    return;
                }

                if (
                    subjectIndex < 0 ||
                    subjectIndex >= studentData.Results[0].weekly.length
                ) {
                    console.error("Invalid subject index:", subjectIndex);
                    return;
                }
                // عند تحديث selectedStudent باستخدام بيانات محدثة
                this.selectedStudent = Object.assign(
                    {},
                    this.selectedStudent,
                    studentData
                );

                studentData.Results[0].weekly.splice(subjectIndex, 1);

                await updateDoc(studentRef, studentData);
                // إعداد نص الرسالة وتفعيل Snackbar
                this.confirmationText = "تم  حذف الماده بنجاح";
                this.showSnackbar = true;
                await this.fetchStudents();

                console.log(
                    "Deleted subject at index:",
                    subjectIndex,
                    "for student with id:",
                    studentId
                );
            } catch (error) {
                console.error("Error deleting subject:", error);
            }
        },
        formatDatez(date) {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const day = String(d.getDate()).padStart(2, "0");
            return `${year}/${month}/${day}`;
        },
        initializeTempDatez() {
            this.tempDatez =
                this.newSubject.Date ||
                this.editedSubject.Date ||
                new Date().toISOString().substr(0, 10);
        },
        confirmDatez() {
            const formattedDate = this.formatDatez(this.tempDatez);
            if (this.dialogAddSubject) {
                this.newSubject.Date = formattedDate;
            } else {
                this.editedSubject.Date = formattedDate;
            }
            this.menuz = false;
        },
        // ool
        // ias
        async saveNotificationsEdit() {
            try {
                const studentRef = doc(db, "students", this.editedStudentId);
                const studentDoc = await getDoc(studentRef);
                if (studentDoc.exists()) {
                    const studentData = studentDoc.data();
                    Object.assign(
                        studentData.Notifications[this.editedIndex],
                        this.editedNotifications
                    );
                    // عند تحديث selectedStudent باستخدام بيانات محدثة
                    this.selectedStudent = Object.assign(
                        {},
                        this.selectedStudent,
                        studentData
                    );
                    await updateDoc(studentRef, studentData);
                    this.closeNotificationsDialogs();
                    // إعداد نص الرسالة وتفعيل Snackbar
                    this.confirmationText = "تم  تعديل الاشعار بنجاح";
                    this.showSnackbar = true;
                    await this.fetchStudents();
                }
            } catch (error) {
                console.error("Error editing subject:", error);
            }
        },
        editNotifications(studentId, index) {
            this.editedStudentId = studentId;
            this.editedIndex = index;
            const selectedStudent = this.students.find(
                (selectedStudent) => selectedStudent.id === studentId
            );
            if (selectedStudent) {
                this.editedNotifications = {
                    ...selectedStudent.Notifications[index],
                };
                this.editNotificationsDialog = true;
            }
        },
        async addNotifications(studentId) {
            try {
                const studentRef = doc(db, "students", studentId);
                const studentDoc = await getDoc(studentRef);
                if (studentDoc.exists()) {
                    const studentData = studentDoc.data();
                    studentData.Notifications.push({
                        NoticeTitle: this.AddNotice.NoticeTitle,
                        theDescription: this.AddNotice.theDescription,
                        NotificationType: this.AddNotice.NotificationType,
                    });
                    // عند تحديث selectedStudent باستخدام بيانات محدثة
                    this.selectedStudent = Object.assign(
                        {},
                        this.selectedStudent,
                        studentData
                    );
                    await updateDoc(studentRef, studentData);
                    this.dialogAddNotice = false;
                    this.AddNotice = {
                        NoticeTitle: this.AddNotice.NoticeTitle,
                        theDescription: this.AddNotice.theDescription,
                        NotificationType: this.AddNotice.NotificationType,
                    };
                    // إعداد نص الرسالة وتفعيل Snackbar
                    this.confirmationText = "تم  اضافه الاشعار بنجاح";
                    this.showSnackbar = true;
                    await this.fetchStudents();
                }
            } catch (error) {
                console.error("Error adding subject:", error);
            }
        },
        async deleteNotification(studentId, NotificatIndex) {
            try {
                const studentRef = doc(db, "students", studentId);
                const studentDoc = await getDoc(studentRef);
                if (studentDoc.exists()) {
                    const studentData = studentDoc.data();
                    studentData.Notifications.splice(NotificatIndex, 1);
                    // عند تحديث selectedStudent باستخدام بيانات محدثة
                    this.selectedStudent = Object.assign(
                        {},
                        this.selectedStudent,
                        studentData
                    );
                    await updateDoc(studentRef, studentData);
                    // إعداد نص الرسالة وتفعيل Snackbar
                    this.confirmationText = "تم  حذف الاشعار بنجاح";
                    this.showSnackbar = true;
                    await this.fetchStudents();
                    // this.dilog_ss = true;
                }
            } catch (error) {
                console.error("Error deleting subject:", error);
            }
        },
        closeNotificationsDialogs() {
            this.editNotificationsDialog = false;
            this.editedIndex = -1;
            this.editedNotifications = {
                NoticeTitle: "",
                theDescription: "",
                NotificationType: "",
            };
        },

        // ul
        async addPhoto(studentId) {
            try {
                if (this.AddPhoto.file) {
                    const storageRef = ref(
                        storage,
                        `photos/${this.AddPhoto.file.name}`
                    );
                    await uploadBytes(storageRef, this.AddPhoto.file);
                    const downloadURL = await getDownloadURL(storageRef);

                    const studentRef = doc(db, "students", studentId);
                    const studentDoc = await getDoc(studentRef);
                    if (studentDoc.exists()) {
                        const studentData = studentDoc.data();
                        // عند تحديث selectedStudent باستخدام بيانات محدثة
                        this.selectedStudent = Object.assign(
                            {},
                            this.selectedStudent,
                            studentData
                        );

                        // الحصول على الوقت الحالي بصيغة مناسبة
                        const photoTime = new Date().toLocaleString("ar-EG", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                        });

                        studentData.photos.push({
                            DatePhoto: photoTime,
                            linkphoto: downloadURL,
                        });
                        await updateDoc(studentRef, studentData);
                        this.dialogAddPhoto = false;

                        // إعادة تعيين النموذج بعد الإضافة
                        this.AddPhoto = {
                            Date: "",
                            file: null,
                        };
                        // إعداد نص الرسالة وتفعيل Snackbar
                        this.confirmationText = "تم  اضافه الصوره بنجاح";
                        this.showSnackbar = true;
                        await this.fetchStudents();
                    }
                }
            } catch (error) {
                console.error("Error adding photo:", error);
            }
        },
        async deletePhotos(studentId, PhotosIndex) {
            try {
                const studentRef = doc(db, "students", studentId);
                const studentDoc = await getDoc(studentRef);
                if (studentDoc.exists()) {
                    const studentData = studentDoc.data();
                    studentData.photos.splice(PhotosIndex, 1);
                    // عند تحديث selectedStudent باستخدام بيانات محدثة
                    this.selectedStudent = Object.assign(
                        {},
                        this.selectedStudent,
                        studentData
                    );
                    await updateDoc(studentRef, studentData);
                    // إعداد نص الرسالة وتفعيل Snackbar
                    this.confirmationText = "تم  حذف الصوره بنجاح";
                    this.showSnackbar = true;
                    await this.fetchStudents();
                    // this.dilog_ss = true;
                }
            } catch (error) {
                console.error("Error deleting subject:", error);
            }
        },

        async updateGuardian() {
            try {
                if (this.currentStudentId) {
                    const studentRef = doc(
                        db,
                        "students",
                        this.currentStudentId
                    );

                    await updateDoc(studentRef, {
                        Guardian: this.Guardian,
                    });

                    console.log("Guardian information updated successfully");
                } else {
                    console.error(
                        "No student ID is set for updating guardian information."
                    );
                }
            } catch (error) {
                console.error("Error updating guardian information:", error);
            }
        },
        closePhotoDialogs() {
            this.editPhotosDialog = false;
            this.editedIndex = -1;
            this.editedPhotos = {
                NoticeTitle: "",
                theDescription: "",
                NotificationType: "",
            };
        },
        // aos
        async saveStudentDetails() {
            if (this.selectedStudent) {
                try {
                    const studentRef = doc(db, "students", this.student.id);
                    await updateDoc(studentRef, this.student);
                    await this.fetchStudents(); // Optionally refetch students to update the list
                    this.dialogStudentDetails = false;
                    console.log("Student details updated successfully");
                } catch (error) {
                    console.error("Error updating student details:", error);
                }
            }
        },
        async updateMonthlyDegrees(degrees) {
            if (!this.selectedStudent) {
                this.console.error("Error: selectedStudent is null");
                return;
            }

            try {
                const studentRef = doc(db, "students", this.selectedStudent.id);

                // Clone the current results to avoid mutating the original data
                const updatedResults = [...this.selectedStudent.Results];

                // Map through Monthly results to find and update the selected month
                const updatedMonthly = updatedResults[1].Monthly.map(
                    (month) => {
                        if (month.Certificate_title === this.selectedMonth) {
                            return { ...month, Degrees: degrees };
                        }
                        return month;
                    }
                );

                // Update the Monthly field in updatedResults
                updatedResults[1].Monthly = updatedMonthly;

                // Update Firestore document with updatedResults
                await updateDoc(studentRef, {
                    Results: updatedResults,
                });

                console.log("Monthly degrees updated successfully");
            } catch (error) {
                console.error("Error updating monthly degrees:", error);
            }
        },
        handleInput() {
            // Track changes
            this.changesMade3 = true;
        },
        async updateFirebase(studentId, payments) {
            try {
                const studentDoc = doc(db, "students", studentId);
                await updateDoc(studentDoc, { payments });
                console.log("Document updated successfully");
            } catch (error) {
                console.error("Error updating document:", error);
            }
        },
        // saveChanges3() {
        //     // استدعاء updateFirebase فقط عند النقر على زر الحفظ
        //     this.updateFirebase(
        //         this.selectedStudent.id,
        //         this.selectedStudent.payments
        //     );
        //     this.changesMade3 = false;
        // },

        updatePaymentOptions() {
            if (this.paymentMethod === "نظام التقسيط") {
                this.selectedPlan = null;
                this.paidAmount = 0;
                this.amount = 0;
            }
        },
        payAmount() {
            const amountToPay = parseInt(this.amount);

            if (isNaN(amountToPay) || amountToPay <= 0) {
                this.showAlert("الرجاء إدخال المبلغ صحيحا");
                return;
            }

            this.paidAmount += amountToPay;
            // this.amount = 0;
            this.dialogSuccess = true;
        },
        validateTotalAmount() {
            if (this.totalAmount !== null) {
                if (isNaN(this.totalAmount) || this.totalAmount < 0) {
                    this.showAlert("لابد ان يكون رقما وليس سالبا");
                    this.totalAmount = null;
                }
            }
        },
        showAlert(message) {
            this.alertMessage = message;
            setTimeout(() => {
                this.alertMessage = "";
            }, 3000);
        },
        resetPayment() {
            this.paidAmount = 0;
        },
        updateStudentPayments(studentId, field, value) {
            const studentRef = doc(db, "students", studentId);
            const updateData = { [`payments.${field}`]: value };
            if (field === "paid_Up" || field === "Expenses") {
                updateData["payments.Residual"] = this.getResidual(studentId);
            }

            updateDoc(studentRef, updateData)
                .then(() => {
                    console.log("Document successfully updated!");
                })
                .catch((error) => {
                    console.error("Error updating document: ", error);
                });
        },
        getResidual(studentId) {
            const student = this.students.find((s) => s.id === studentId);
            return student.payments.Expenses - student.payments.paid_Up;
        },
        numberOfMonths(installmentPlan) {
            const monthsMap = {
                شهر: 1,
                شهرين: 2,
                "3 شهور": 3,
                "4 شهور": 4,
                "5 شهور": 5,
            };
            return Array.from(
                { length: monthsMap[installmentPlan] },
                (_, i) => i + 1
            );
        },
        installmentAmount(totalAmount, installmentPlan) {
            const monthsMap = {
                شهر: 1,
                شهرين: 2,
                "3 شهور": 3,
                "4 شهور": 4,
                "5 شهور": 5,
            };
            return Math.floor(totalAmount / monthsMap[installmentPlan]);
        },
        getMonthName(month) {
            const monthNames = [
                "شهر نوفمبر",
                "شهر ديسمبر",
                "الترم الأول",
                "شهر فبراير",
                "شهر مارس",
            ];
            return monthNames[month - 1] || month;
        },
        setChangesMade(status) {
            this.changesMade3 = status;
        },
        saveChanges3() {
            this.sortedStudents.forEach((student) => {
                const studentRef = doc(db, "students", student.id);
                const updateData = {
                    "payments.Expenses": student.payments.Expenses ?? 0,
                    "payments.payment_System":
                        student.payments.payment_System ?? "",
                    "payments.Installment_System":
                        student.payments.Installment_System ?? "",
                    "payments.paid_Up": student.payments.paid_Up ?? 0,
                    "payments.Residual": this.getResidual(student.id),
                };

                updateDoc(studentRef, updateData)
                    .then(() => {
                        console.log("Document successfully updated!");
                        this.changesMade3 = false; // Reset the flag after saving
                    })
                    .catch((error) => {
                        console.error("Error updating document: ", error);
                    });
            });
        },
        updateResidual() {
            const expenses = this.form.payments.Expenses || 0;
            const paidUp = this.form.payments.paid_Up || 0;
            this.form.payments.Residual = expenses - paidUp;
            this.createChart([paidUp, this.form.payments.Residual]);
        },
        createChart(data) {
            const ctx = document.getElementById("myChart");
            if (ctx) {
                // تحقق مما إذا كان هناك مخطط موجود وقم بتدميره
                if (this.myChart) {
                    this.myChart.destroy();
                }

                console.log("start createChart");
                this.CreateChart = true;
                this.myChart = new Chart(ctx, {
                    type: "doughnut",
                    data: {
                        datasets: [
                            {
                                label: "المصروفات",
                                data: data,
                                backgroundColor: ["#336699", "#d8588c"],
                                hoverOffset: 4,
                            },
                        ],
                    },
                });
            } else {
                console.log("error");
            }
        },
        validatePaidUp() {
            const expenses = this.selectedStudent.payments.Expenses || 0;
            this.maxExpenses = expenses;
            if (this.selectedStudent.payments.paid_Up > expenses) {
                this.selectedStudent.payments.paid_Up = expenses;
            }
        },
    },
    watch: {
        "form.birthday"(newVal) {
            this.formattedDate = this.formatDate(newVal);
        },

        "form.payments.Expenses"() {
            this.updateResidual();
        },
        "form.payments.paid_Up"() {
            this.updateResidual();
        },
    },
    computed: {
        ...mapState(useAuthStore, ["user"]),
        // icon() {
        //     return this.isPressed ? "mdi-eye-off" : "mdi-eye";
        // },
        filteredStudents() {
            if (this.selectedSection === "الكل") {
                return this.students.filter(
                    (student) => student.educational_level === this.year
                );
            }
            return this.students.filter(
                (student) =>
                    student.educational_level === this.year &&
                    student.section === this.selectedSection
            );
        },
        sortedStudents() {
            const studentsToSort = this.filteredStudents;

            if (this.gradeSortActive) {
                // الترتيب حسب الدرجات لشهر معين
                return [...studentsToSort].sort((a, b) => {
                    const gradeA = this.getMonthlyDegrees(
                        a,
                        this.gradeSortActive
                    );
                    const gradeB = this.getMonthlyDegrees(
                        b,
                        this.gradeSortActive
                    );
                    return gradeB - gradeA; // ترتيب تنازلي
                });
            } else if (this.paymentSortActive) {
                // الترتيب حسب المدفوعات
                return [...studentsToSort].sort((a, b) => {
                    const residualA = a.payments.Expenses - a.payments.paid_Up;
                    const residualB = b.payments.Expenses - b.payments.paid_Up;
                    return residualA - residualB;
                });
            } else {
                // الترتيب أبجدي
                return studentsToSort.sort((a, b) => {
                    const nameA = a.student_name.toUpperCase();
                    const nameB = b.student_name.toUpperCase();
                    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
                });
            }
        },
        selectedMonthlyDegrees() {
            if (!this.selectedStudent) {
                return [];
            }
            return (
                this.selectedStudent.Results[1].Monthly.find(
                    (month) => month.Certificate_title === this.selectedMonth
                )?.Degrees || []
            );
        },
        remainingAmount() {
            return Math.max(this.totalAmount - this.paidAmount, 0);
        },
    },
    mounted() {
        this.loadStudents();
        this.searchStudent(); // Fetch all students initially
        this.generateRandomPassword();
        this.fetchStudents();
        this.interval = setInterval(() => {
            if (this.value === 100) {
                clearInterval(this.interval);
                return;
            }
            this.value += 10;
        }, 100);

        console.log(this.progress);
        this.students = this.$parent.students_class;
        // مثال لاستدعاء الدالة
        this.loadParentDetails(this.form.parent_national_id);

        // Assuming students_class is passed down from parent
    },
    beforeUnmount() {
        clearInterval(this.interval);
    },
};
</script>

<style lang="scss" scoped>
.student-item {
    padding: 10px;
    direction: rtl;
}
.student-item {
    padding: 10px !important;
}
.v-list-item:hover {
    background-color: #2195f30e !important;
}

.error-message {
    color: red;
    font-size: 14px;
    margin-top: -10px;
    margin-bottom: 10px;
}

/* .v-progress-linear {
    position: static;
    overflow: visible;
} */
.progress-label .label-container {
    background-color: #3875a5;
    padding: 5px 10px;
    border-radius: 5px;
    position: relative;
    color: white;
}
.progress-label .arrow-down {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #3875a5;
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
}
.styled-table {
    width: 100%;
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 18px;
    text-align: right; /* لتنسيق النص من اليمين لليسار */
}

.styled-table th,
.styled-table td {
    padding: 12px 15px;
    border: 1px solid #dddddd;
}

.styled-table th {
    background-color: #f3f3f3;
}

.styled-table tr:nth-of-type(even) {
    background-color: #f3f3f3;
}
.custom-font {
    font-family: "Cairo", sans-serif;
    font-size: 22px;
    font-weight: bold;
}
.custom-title {
    font-size: 20px;
    font-weight: 500;
    color: #333;
    font-weight: bold;
}
.v-card-title {
    padding: 16px;
    background-color: #f9f9f9;
    border-bottom: 1px solid #eee;
}
.v-card-text {
    padding: 16px;
}
.fixed-card {
    width: 250px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.centered-subtitle {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}
.fixed_img {
    width: 100%;
    max-width: 300px;
}

.center_subtitle {
    text-align: center;
}
.payments_input input {
    text-align: center;
    font-size: 26px;
}
.notification-card {
    position: relative;
}
.notification-card .v-card-title {
    font-weight: bold;
}
.notification-card .v-card-text {
    margin-top: 10px;
}
.notification-card .v-icon {
    cursor: pointer;
    color: #42a5f5;
}
.notification-card .v-icon:hover {
    color: #1e88e5;
}

.v-overlay__scrim {
    background: rgb(0 0 0 / 26%) !important;
}
.v-dialog > .v-overlay__content > .v-card,
.v-dialog > .v-overlay__content > .v-sheet,
.v-dialog > .v-overlay__content > form > .v-card,
.v-dialog > .v-overlay__content > form > .v-sheet {
    box-shadow: none !important;
}
.sui {
    color: white;
    background: white;
}
.timeline-container {
    width: calc(100% - 110px) !important;
    margin: 20px !important;
}

.timeline {
    position: relative;
    margin-left: 20px;
}

.timeline-line {
    position: absolute;
    width: 2px;
    background-color: #ccc;
    left: 8px;
    top: 0;
    bottom: 0;
    margin: auto;
}
.progress_container {
    position: absolute;
    width: 5px;
    background-color: #eee;
    left: 8px;
    bottom: 0;
    margin: auto;
    height: calc(100% + 35px);
    top: 35px;
}

.timeline-item {
    position: relative;
    margin-bottom: 30px;
}

.timeline-item-content {
    position: relative;
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 10px;
    border-radius: 4px;
    position: relative;
    margin-left: 20px;
}
.timeline-item-content::before {
    content: "";
    position: absolute;
    bottom: -35px;
    left: -26.7px;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    /* border-radius: 50%; */
    transform: rotate(45deg);
    background-color: var(--main-color);
}
.timeline-item-content::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -24px;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-right: 20px solid #d8588c;
}
.timeline-item-header {
    padding-bottom: 10px;
}

.timeline-item-body {
    font-size: 14px;
}

.month-name {
    font-weight: bold;
    color: var(--main-color);
}

.payment-section {
    margin-top: 20px;
}
.progress-label {
    font-size: 14px;
    font-weight: bold;
    position: absolute;
    right: 21px;
    width: 106px;
    background: var(--main-color);
    color: #fff;
    text-align: center;
    padding: 10px;
    border-radius: 5px;
}
.timeline-item-content {
    margin-left: 30px;
    transition: 0.5s;
    transition: margin-left 0.5s;
}
.success-message {
    color: #4caf50; /* لون أخضر لرسائل النجاح */
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 20px;
    transition: 0.5s;
}

.timeline-item-content.transition {
    margin-left: 60px; /* أو أي قيمة انتقال تفضلها */
}

.progress {
    transition: height 0.5s;
}

.progress.transition {
    height: 100%;
}
.custom-alert {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 120px;
    font-size: 20px;
    z-index: 9999;
    border-radius: 20px;
    transition: all 0.5s ease-in-out;
    /* text-align: center; */
}
.v-card-text {
    padding: 0;
    margin-top: 15px;
}
.v-window__container {
    .title {
        font-size: 22px;
        font-weight: bold;
        color: var(--main-color);
        position: relative;
        margin: 0 10px 30px;
        &::before {
            content: "";
            position: absolute;
            bottom: -15px;
            height: 4px;
            width: 100%;
            background: var(--secound-color);
        }
    }

    .box {
        box-shadow: 0 0 10px #ddd;
        padding: 10px;
        margin: 0 10px 10px;
        border-radius: 5px;
        & > div {
            width: 100%;
            background: var(--secound-color);
            padding: 10px;
            border-radius: 5px;
        }

        .feat {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-top: 10px;
            .name {
                font-size: 19px;
                font-weight: bold;
                color: var(--therd-color);
            }
            .gender {
                color: var(--therd-color);
                font-weight: bold;
                font-size: 16px;
            }
            .educational_level {
                font-size: 17px;
                color: var(--main-color);
                font-weight: bold;
            }
            .Class {
                display: flex;
                align-items: center;
                gap: 5px;
                font-weight: bold;
                color: var(--pink-color);
                font-size: 16px;
            }
            .section {
                display: flex;
                align-items: center;
                gap: 5px;
                font-weight: bold;
                color: var(--pink-color);
                font-size: 16px;
            }
        }
    }
}
.weekly {
    .contain {
        display: flex;
        align-items: center;
        justify-content: space-between;
        row-gap: 20px;
        flex-wrap: wrap;
    }
    .feat {
        box-shadow: 0 0 10px #ddd;
        margin: 0 10px 10px;
        border-radius: 5px;
        padding: 10px;
        width: 48%;
        flex-grow: 1;
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border-radius: 5px;
            position: relative;
            margin: 0 auto 30px;
            background: var(--secound-color);
            &::before {
                content: "";
                position: absolute;
                bottom: -20px;
                height: 5px;
                width: 100%;
                background: var(--secound-color);
                left: 50%;
                transform: translate(-50%, -50%);
            }
            & > div:first-child {
                display: flex;
                align-items: center;
                font-size: 21px;
                font-weight: bold;
                color: var(--main-color);
            }
        }
        .table {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            width: 100%;

            & > div {
                display: flex;
                align-items: center;
                width: 100%;
                & > div {
                    display: flex;
                    align-items: center;
                    border: 1px solid var(--secound-color);
                    width: 50%;
                    justify-content: center;
                    padding: 10px;
                    font-size: 16px;
                    color: var(--therd-color);
                    font-weight: bold;
                    text-align: center;
                }
            }
        }
    }
}
.monthly {
    .header {
        display: flex;
        width: 100%;
        justify-content: space-between;
        flex-direction: column;

        & > div {
            width: auto;
            margin: 0 10px;
        }
        .download {
            height: 56px !important;
            color: var(--main-color);
            border-radius: 5px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            box-shadow: 0 0 10px #ddd;
            gap: 10px;
            font-weight: bold;
            text-align: center;
            img {
                width: 30px;
            }
        }
    }
    .Certificate {
        margin: 20px 10px;
        border: 2px outset var(--therd-color);
        padding: 20px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        .head {
            justify-content: space-between;
            display: flex;
            align-items: center;
            position: relative;
            flex-direction: column;
            gap: 20px;
            & > div {
                width: 100%;
            }
            &::before {
                content: "";
                position: absolute;
                bottom: -20px;
                height: 5px;
                width: 100%;
                background: var(--secound-color);
                left: 50%;
                transform: translate(-50%, -50%);
            }
            .right {
                display: flex;
                flex-direction: column;
                gap: 10px;
                font-size: 18px;
                font-weight: bold;
                color: var(--therd-color);
            }
            .left {
                display: flex;
                flex-direction: column;
                align-items: center;
                color: var(--main-color);
                font-weight: bold;
                img {
                    border-bottom-left-radius: 50%;
                    border-bottom-right-radius: 50%;
                    height: 97px;
                }
            }
        }
        .body {
            overflow: auto;
        }
    }
}
.v-card--variant-elevated {
    box-shadow: none;
}
.v-slide-group__content {
    justify-content: center !important;
    justify-content: center;
}
.v-progress-circular {
    margin: 1rem;
}
.v-progress-circular {
    margin: 0 !important;
}
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 35px;
}
th,
td {
    border: 1px solid #000;
    padding: 8px;
    text-align: center;
    color: var(--therd-color);
    font-weight: bold;
}
th {
    background-color: var(--secound-color);
    color: var(--main-color);
}
.table {
    margin: 0 10px;

    .Row {
        width: 100%;
        display: flex;
        align-items: center;
        & > div {
            width: 50%;
            padding: 10px;
            border: 1px solid var(--secound-color);
            display: flex;
            align-items: center;
            text-align: center;
            justify-content: center;
            font-size: 16px;
            font-weight: bold;
            color: var(--therd-color);
        }
    }
}
.Title {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 20px;
    color: var(--main-color);
    font-weight: bold;
    background: var(--secound-color);
    padding: 10px;
    border-radius: 5px;
    margin: 20px 10px;
    &.invoice {
        margin: 20px 0;
    }
}
.v-row {
    margin: 10px;
    display: flex;
    // gap: 10px;
    align-items: center;
    & > div {
        width: 48%;
    }
}
.details {
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: space-between;
    margin: 0 10px;
    .myChart {
        width: 100px;
    }
    ul {
        width: 100%;
        list-style: none;
        position: relative;
        &::before {
            content: "";
            position: absolute;
            right: -20px;
            left: 50%;
            width: 4px;
            height: 100%;
            background: var(--secound-color);
            transform: translateX(-50%);
        }
        li {
            position: relative;
            margin-right: 20px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 7px;
            gap: 10px;
            & > div {
                font-weight: bold;
            }
            & > div:last-child {
                color: var(--therd-color);
                font-size: 12px;
                text-align: center;
                span {
                    font-size: 16px;
                }
            }
            span {
                font-weight: bold;
                color: var(--therd-color);
                font-size: 16px;
            }
            svg {
                position: absolute;
                width: 15px;
                height: 15px;
                right: -20px;
                top: 50%;
                transform: translateY(-50%);
                border-radius: 2px;
                color: var(--main-color);
            }

            &:not(.li)::before {
                content: "";
                position: absolute;
                width: 15px;
                height: 15px;
                right: -20px;
                top: 50%;
                transform: translateY(-50%);
                border-radius: 2px;
                background: var(--main-color);
            }

            &:last-of-type:not(.li) {
                &::before {
                    background: var(--pink-color);
                }
            }
        }
    }
}
.container_img {
    display: flex;
    flex-wrap: wrap;
    width: calc(100% - 20px);
    margin: 10px auto;
    gap: 10px;
    .img {
        width: 32%;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: var(--secound-color);
        border-radius: 5px;
        img {
            width: 100%;
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
        }
        .date {
            padding: 10px;
            border-radius: 5px;
            color: var(--main-color);
            font-weight: bold;
        }
    }
}
@media (max-width: 599px) {
    .details_row {
        flex-direction: column;
        & > div {
            width: 100%;
        }
    }
    .container_img {
        flex-direction: column;
        .img {
            width: 100%;
            img {
                width: 100%;
            }
        }
    }
}
@media (min-width: 600px) and (max-width: 768px) {
}
@media (min-width: 769px) {
    .weekly {
        .contain {
            row-gap: 10px;
        }
    }
    .monthly {
        .header {
            width: 100%;
            flex-direction: row;
            gap: 10px;
            & > div {
                width: 48%;
            }
        }
        .Certificate {
            .head {
                flex-direction: row;
                & > div {
                    width: auto;
                }
            }
        }
    }
}
.student-progress {
    margin-bottom: 20px;
}

.progress-container {
    position: relative;
    display: inline-block;
    width: 100%;
}

.progress-bar {
    width: 100%;
    height: 32px;
    background: #e3f1fd;
}

.progress-label2 {
    position: absolute;
    top: -95%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: bold;
    white-space: nowrap;
}
.label-box {
    position: relative;
    background-color: #007bff;
    padding: 5px 10px;
    border-radius: 4px;
}

.label-box::after {
    content: "";
    position: absolute;
    bottom: -10px; /* وضع السهم أسفل المربع */
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #007bff; /* نفس لون خلفية المربع */
}
.custom-icon {
    font-size: 36px; /* يمكنك تعديل الحجم هنا */
}

.animated-icon {
    transition: transform 0.3s ease-in-out;
}

.animated-icon:hover {
    transform: scale(1.2); /* تكبير الأيقونة عند التمرير فوقها */
}
</style>
