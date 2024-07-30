<template>
    <v-container class="mt-0">
        <!-- بيانات الطالب -->
        <div class="visible">
            <svg
                style="
                    position: fixed;
                    top: 50%;
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
            <div class="right">
                <div>
                    <v-breadcrumbs>
                        <v-breadcrumbs-item>
                            <img
                                src="../assets/profile/user.png"
                                alt=""
                                class="pluse"
                            />
                            <div>الملف الشخصي</div>
                        </v-breadcrumbs-item>
                    </v-breadcrumbs>
                    <div class="hello_text mb-8">
                        مرحبًا {{ student.student_name }}، نشكرك على ثقتك في
                        معهد السراج المنير الأزهري، نتطلع سويًا لتحقيق المستقبل
                        المشرق .
                    </div>
                </div>
                <div class="left">
                    <img
                        src="../assets/profile/edit-info.png"
                        alt=""
                        class="pluse pluse_1 ml-2"
                    />
                    <img
                        src="../assets/profile/logout.png"
                        alt=""
                        class="pluse pluse_1 ml-5"
                    />
                </div>
            </div>
        </div>
        <!-- Loading  تحميل -->

        <v-card
            variant="flat"
            style="border: none; background: #fff; margin: 22px"
        >
            <v-tabs v-model="tab_2" style="height: 0; background-color: #fff">
                <v-tab value="one">الطالب</v-tab>
            </v-tabs>

            <v-card-text>
                <v-tabs-window v-model="tab_2">
                    <v-tabs-window-item value="one">
                        <v-card
                            variant="flat"
                            style="border: none; background: #fff"
                        >
                            <!--....................... -->
                            <v-tabs
                                v-model="tab_5"
                                style="border: 0; background: #fff"
                            >
                                <v-tab value="one1"
                                    ><img
                                        src="../assets/student/graduated.png"
                                        alt=""
                                        width="30px"
                                /></v-tab>
                                <v-tab value="two1">
                                    <img
                                        src="../assets/student/school.png"
                                        alt=""
                                        width="30px"
                                    />
                                </v-tab>
                                <v-tab value="three1">
                                    <img
                                        src="../assets/student/academic.png"
                                        alt=""
                                        width="30px"
                                    />
                                </v-tab>
                                <v-tab value="four1">
                                    <img
                                        src="../assets/student/notification-bell.png"
                                        alt=""
                                        width="30px"
                                /></v-tab>
                                <!-- <v-tab value="five1">
                                    <img
                                        src="../assets/student/photo.png"
                                        alt=""
                                        width="30px"
                                /></v-tab>
                                <v-tab value="se11">
                                    <img
                                        src="../assets/student/planning2.png"
                                        alt=""
                                        width="30px"
                                /></v-tab> -->

                                <v-tab value="seven1">
                                    <img
                                        src="../assets/student/analysis.png"
                                        alt=""
                                        width="30px"
                                /></v-tab>
                            </v-tabs>
                            <v-card
                                variant="flat"
                                style="background: #fff; border: none"
                            >
                                <v-card-text>
                                    <v-tabs-window v-model="tab_5">
                                        <v-tabs-window-item
                                            value="one1"
                                            style="background-color: #fff"
                                        >
                                            <div class="visible">
                                                <svg
                                                    style="
                                                        position: fixed;
                                                        top: 50%;
                                                        left: 50%;
                                                        transform: translate(
                                                            -50%,
                                                            -50%
                                                        );
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
                                                        <stop
                                                            offset="0"
                                                            stop-color="#336699"
                                                        ></stop>
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
                                                <div class="right">
                                                    <div>
                                                        <v-breadcrumbs>
                                                            <v-breadcrumbs-item>
                                                                <div>
                                                                    بياناتك
                                                                    الشخصيه
                                                                </div>
                                                            </v-breadcrumbs-item>
                                                        </v-breadcrumbs>
                                                    </div>
                                                </div>

                                                <div
                                                    class="children"
                                                    style="background: #fff"
                                                >
                                                    <div
                                                        class="body"
                                                        style="background: #fff"
                                                        v-if="isAuthenticated"
                                                    >
                                                        <div class="box">
                                                            <div class="head">
                                                                <div
                                                                    class="name"
                                                                >
                                                                    {{
                                                                        student.student_name
                                                                    }}
                                                                </div>
                                                                <img
                                                                    src="../assets/profile/information.png"
                                                                />
                                                            </div>
                                                            <div
                                                                class="class"
                                                                style="
                                                                    color: var(
                                                                        --therd-color
                                                                    );
                                                                "
                                                            >
                                                                <div>
                                                                    {{
                                                                        student.educational_level
                                                                    }}
                                                                </div>
                                                                <div>
                                                                    {{
                                                                        student.gender
                                                                    }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="class"
                                                                style="
                                                                    color: var(
                                                                        --therd-color
                                                                    );
                                                                "
                                                            >
                                                                <div>
                                                                    {{
                                                                        student.section
                                                                    }}
                                                                </div>
                                                                <div>
                                                                    {{
                                                                        student.class
                                                                    }}
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="class"
                                                                style="
                                                                    color: var(
                                                                        --therd-color
                                                                    );
                                                                "
                                                            >
                                                                <div>
                                                                    الرقم القومى
                                                                </div>
                                                                <div>
                                                                    {{
                                                                        student.National_id
                                                                    }}
                                                                </div>
                                                            </div>
                                                            <div class="class">
                                                                <div>
                                                                    تاريخ
                                                                    الميلاد
                                                                </div>
                                                                <div>
                                                                    {{
                                                                        student.birthday
                                                                    }}
                                                                </div>
                                                            </div>
                                                            <div class="class">
                                                                <div>
                                                                    رقم الهاتف
                                                                </div>
                                                                <div>
                                                                    {{
                                                                        student.phone
                                                                    }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </v-tabs-window-item>
                                        <v-tabs-window-item
                                            value="two1"
                                            class="weekly"
                                        >
                                            <div class="title">
                                                التطبيقات الأسبوعية
                                            </div>
                                            <div
                                                class="contain d-flex w-100"
                                                v-for="(
                                                    result, resultIndex
                                                ) in student.Results"
                                                :key="resultIndex"
                                            >
                                                <div
                                                    class="feat"
                                                    v-for="(
                                                        subject, index
                                                    ) in result.weekly"
                                                    :key="index"
                                                >
                                                    <div class="header">
                                                        <div>
                                                            <div class="sub">
                                                                {{
                                                                    subject?.Subject_Name
                                                                }}
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="text-center"
                                                        >
                                                            <v-progress-circular
                                                                :model-value="
                                                                    subject?.Student_degree
                                                                "
                                                                :rotate="360"
                                                                :size="80"
                                                                :width="15"
                                                                color="var(--main-color)"
                                                            >
                                                                <template
                                                                    v-slot:default
                                                                >
                                                                    {{
                                                                        subject?.Student_degree
                                                                    }}
                                                                    %
                                                                </template>
                                                            </v-progress-circular>
                                                        </div>
                                                    </div>
                                                    <div class="table">
                                                        <div class="Row">
                                                            <div>
                                                                درجة الطالب
                                                            </div>
                                                            <div>
                                                                {{
                                                                    subject?.Student_degree
                                                                }}
                                                            </div>
                                                        </div>
                                                        <div class="Row">
                                                            <div>
                                                                الدرجة النهائية
                                                            </div>
                                                            <div>
                                                                {{
                                                                    subject?.Major_degree
                                                                }}
                                                            </div>
                                                        </div>
                                                        <div class="Row">
                                                            <div>
                                                                تاريخ الإمتحان
                                                            </div>
                                                            <div>
                                                                {{
                                                                    subject?.Date_Test
                                                                }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </v-tabs-window-item>
                                        <!-- 00000000000000000000000000 -->
                                        <v-tabs-window-item
                                            value="three1"
                                            style="width: 100% !important"
                                            class="monthly"
                                        >
                                            <div v-if="student.state">
                                                <div
                                                    class="title"
                                                    style="border: none"
                                                >
                                                    النتائج الشهرية
                                                </div>
                                                <div class="header">
                                                    <v-select
                                                        v-model="selectedMonth"
                                                        label="أختر الشهر"
                                                        :items="[
                                                            'شهر أكتوبر',
                                                            'شهر نوفمبر',
                                                            'الترم الأول',
                                                            'شهر فبراير',
                                                            'شهر مارس',
                                                            'الترم الثاني',
                                                        ]"
                                                    ></v-select>
                                                    <div
                                                        class="download"
                                                        @click="downloadPDF"
                                                    >
                                                        <img
                                                            src="../assets/student/download-pdf.png"
                                                            alt=""
                                                        />
                                                        <div>تحميل الشهادة</div>
                                                    </div>
                                                </div>
                                                <div class="Certificate">
                                                    <div class="head">
                                                        <div
                                                            class="right"
                                                            style="border: none"
                                                        >
                                                            <div>
                                                                الإسم :
                                                                {{
                                                                    student.student_name
                                                                }}
                                                            </div>
                                                            <div>
                                                                المرحلة الدراسية
                                                                :
                                                                {{
                                                                    student.educational_level
                                                                }}
                                                            </div>
                                                            <div>
                                                                السنة الدراسية :
                                                                {{
                                                                    student.year
                                                                }}
                                                            </div>
                                                            <div>
                                                                الفصل :
                                                                {{
                                                                    student?.section
                                                                }}
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="left"
                                                            style="border: none"
                                                        >
                                                            <img
                                                                src="../assets/images.jpeg"
                                                                alt="School Logo"
                                                            />
                                                            <p
                                                                class="ma-2 text-center"
                                                            >
                                                                معهد السراج
                                                                المنير الأزهري
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div class="body">
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        المادة
                                                                    </th>
                                                                    <th>
                                                                        المدرس
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
                                                                        درجة
                                                                        الطالب
                                                                    </th>
                                                                    <th>
                                                                        الدرجة
                                                                        الكبرى
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <template
                                                                    v-if="
                                                                        filteredResults.length >
                                                                        0
                                                                    "
                                                                >
                                                                    <template
                                                                        v-for="(
                                                                            monthly,
                                                                            index
                                                                        ) in filteredResults"
                                                                        :key="
                                                                            index
                                                                        "
                                                                    >
                                                                        <template
                                                                            v-for="(
                                                                                degree,
                                                                                degreeIndex
                                                                            ) in monthly.Degrees"
                                                                            :key="
                                                                                degreeIndex
                                                                            "
                                                                        >
                                                                            <tr>
                                                                                <td>
                                                                                    {{
                                                                                        degree.Subject_Name
                                                                                    }}
                                                                                </td>
                                                                                <td>
                                                                                    {{
                                                                                        degree.Teacher_Name
                                                                                    }}
                                                                                </td>
                                                                                <td>
                                                                                    {{
                                                                                        degree.Behavior_assessment
                                                                                    }}
                                                                                </td>
                                                                                <td>
                                                                                    {{
                                                                                        degree.Minor_degree
                                                                                    }}
                                                                                </td>
                                                                                <td>
                                                                                    {{
                                                                                        degree.Student_degree
                                                                                    }}
                                                                                </td>
                                                                                <td>
                                                                                    {{
                                                                                        degree.Major_degree
                                                                                    }}
                                                                                </td>
                                                                            </tr>
                                                                        </template>
                                                                    </template>
                                                                </template>
                                                                <template
                                                                    v-else
                                                                >
                                                                    <tr>
                                                                        <td
                                                                            colspan="6"
                                                                        >
                                                                            No
                                                                            data
                                                                            available
                                                                        </td>
                                                                    </tr>
                                                                </template>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else>
                                                <div class="">
                                                    <v-alert type="warning">
                                                        تم حجب الاختبارات لحين
                                                        السداد.
                                                    </v-alert>
                                                </div>
                                            </div>
                                        </v-tabs-window-item>

                                        <v-tabs-window-item
                                            value="four1"
                                            class="notifications-tab"
                                        >
                                            <v-card
                                                flat
                                                class="notifications-card"
                                            >
                                                <div
                                                    class="notifications-title Title"
                                                >
                                                    الإشعارات
                                                </div>
                                                <v-list>
                                                    <v-list-item-group>
                                                        <v-list-item
                                                            v-for="(
                                                                notification,
                                                                index
                                                            ) in notifications"
                                                            :key="index"
                                                        >
                                                            <v-list-item-content>
                                                                <v-alert
                                                                    :color="
                                                                        getNotificationColor(
                                                                            notification.NotificationType
                                                                        )
                                                                    "
                                                                    dense
                                                                    class="notification-alert"
                                                                >
                                                                    <template
                                                                        v-slot:prepend
                                                                    >
                                                                        <v-icon>
                                                                            {{
                                                                                getNotificationIcon(
                                                                                    notification.NotificationType
                                                                                )
                                                                            }}
                                                                        </v-icon>
                                                                    </template>
                                                                    <v-list-item-title
                                                                        class="notification-title"
                                                                    >
                                                                        {{
                                                                            notification.NoticeTitle
                                                                        }}
                                                                    </v-list-item-title>
                                                                    <v-list-item-subtitle
                                                                        class="notification-description"
                                                                    >
                                                                        {{
                                                                            notification.theDescription
                                                                        }}
                                                                    </v-list-item-subtitle>
                                                                </v-alert>
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                    </v-list-item-group>
                                                    <v-list-item
                                                        v-if="
                                                            !notifications.length
                                                        "
                                                    >
                                                        <v-list-item-content>
                                                            <v-alert
                                                                type="info"
                                                                border="false"
                                                                color="grey lighten-3"
                                                                dense
                                                            >
                                                                لا توجد إشعارات
                                                                حالياً.
                                                            </v-alert>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list>
                                            </v-card>
                                        </v-tabs-window-item>
                                        <!-- 5555555555555555 -->
                                        <v-tabs-window-item
                                            value="five1"
                                            style="border: none"
                                        >
                                            <v-card flat style="border: none">
                                                <div class="title">
                                                    صور الطالب
                                                </div>
                                                <v-row
                                                    style="flex-wrap: nowrap"
                                                >
                                                    <v-col
                                                        v-for="(
                                                            photo, index
                                                        ) in student.photos"
                                                        :key="index"
                                                        cols="12"
                                                        md="4"
                                                    >
                                                        <v-card>
                                                            <v-img
                                                                :src="
                                                                    photo.linkphoto
                                                                "
                                                                :alt="`Photo taken on ${photo.DatePhoto}`"
                                                            ></v-img>
                                                            <v-card-subtitle
                                                                class="ma-2"
                                                                >{{
                                                                    photo.DatePhoto
                                                                }}</v-card-subtitle
                                                            >
                                                        </v-card>
                                                    </v-col>
                                                </v-row>
                                            </v-card>
                                        </v-tabs-window-item>
                                        <!-- <v-tabs-window-item value="seven1">
                                            <v-card flat v-if="student.state">
                                                <div
                                                    class="title"
                                                    style="margin-bottom: 20px"
                                                >
                                                    ألاخصائيات
                                                </div>
                                                <p>dsadsadsad</p>
                                            </v-card>
                                        </v-tabs-window-item>
                                        <v-tabs-window-item value="se11">
                                            <v-card flat v-if="student">
                                                الخطط الاسبوعيه
                                            </v-card>
                                        </v-tabs-window-item> -->
                                    </v-tabs-window>
                                </v-card-text>
                            </v-card>
                        </v-card>
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { db } from "@/Firebase.js";
import { doc, getDoc, getDocs } from "firebase/firestore";
import Chart from "chart.js/auto";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Amiri_Regular from "@/assets/fonts/Amiri-Regular.js";
import { mapActions } from "pinia";
import { usenotification } from "../store/notification.js";

export default {
    data() {
        return {
            photos: [],
            loading1: false,
            isAuthenticated: false,
            loading: true, // أضفناه لتفعيل عنصر التحميل
            CreateChart: null,
            interval: null,
            value: 0,
            results: [],
            paymentMethod: null,
            dialogSuccess: false,
            transitionTimeline: false, // متغير للتحكم في الانتقال للـ timeline-item-content
            transitionProgress: false, // متغير للتحكم في الانتقال للبروجريس بار
            alertMessage: false,
            reachedProgress: false,
            currentActive: 0,
            // circles: [],
            totalAmount: null,
            paidAmount: 0,
            progress: 0,
            tab_5: null,
            tab_4: null,
            tab_1: 0,
            tab_2: null,
            tab_3: null,
            tab: "option-1", // تحديد التاب الافتراضي
            selectedGrade: null,
            gradeLevels: ["الصف الأول", "الصف الثاني", "الصف الثالث"],
            selectedMonth: "شهر أكتوبر",
            selectedPlan: null,
            selectPaid: ["شهر", "شهرين", "3 شهور", "4 شهور", "5 شهور"],
            amount: 0,
            selectedPaymentPlan: null,
            paymentPlans: ["شهر", "شهرين", "3 شهور", "4 شهور", "5 شهور"],
            steps: [
                "بدأ ",
                "الخطوة 1",
                "الخطوة 2",
                "الخطوة 3",
                "الخطوة 4",
                "الخطوة 5",
            ],

            // خاص بالبروحريس بار وتقسيم القسط

            student: {
                notifications: [],
                student_name: "",
                National_id: "",
                educational_level: "",
                class: "",
                section: "",
                gender: "",
                birthday: "",
                phone: "",
                tests: [],
                // Results: [], // بيانات النتائج ستكون هنا
                state: true, // إضافة حالة للتحكم في عرض الاختبارات
                name: "أحمد محمد",
                age: 12,
                BithOfDate: "2009-08-05",
                gradeLevel: "الصف الخامس",
                schoolYear: "2023-2024",
                photo: {
                    url1: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
                },
            },
        };
    },
    mounted() {
        this.get_notifications("students_notification");
        this.interval = setInterval(() => {
            if (this.value === 100) {
                clearInterval(this.interval);
                return;
            }
            this.value += 10;
        }, 100);
    },

    async created() {
        const documentId = this.$route.params.id; // استلام documentId من الـ route params
        this.loading = true; // بدء حالة التحميل

        try {
            // محاولة الحصول على بيانات الطالب
            const docSnap = await getDoc(doc(db, "students", documentId));
            if (docSnap.exists()) {
                const studentData = docSnap.data();
                this.student = studentData;
                this.results = studentData.Results || []; // استخراج بيانات Results
                this.isAuthenticated = true;

                // جلب بيانات الإشعارات من حقل Notifications
                this.notifications = studentData.Notifications || [];
                this.photos = studentData.photos || [];
            } else {
                console.error("No document found for the given ID");
                this.isAuthenticated = false;
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            this.isAuthenticated = false;
        } finally {
            this.loading1 = false; // إنهاء حالة التحميل
        }
    },
    beforeUnmount() {
        clearInterval(this.interval);
    },
    computed: {
        filteredResults() {
            if (!this.results || !this.selectedMonth) return []; // التأكد من أن results و selectedMonth مُهيّأت
            return this.results.flatMap((result) =>
                result.Monthly
                    ? result.Monthly.filter(
                          (monthly) =>
                              monthly.Certificate_title === this.selectedMonth
                      )
                    : []
            );
        },
        filteredPhotos() {
            if (!this.selectedGrade) {
                return this.student.photos;
            }
            return this.student.photos.filter(
                (photo) => photo.grade === this.selectedGrade
            );
        },
        selectedMonthlyDegrees() {
            // تأكد من أن student و Results و Monthly ليست null أو undefined
            if (
                this.student &&
                this.student.Results &&
                Array.isArray(this.student.Results) &&
                this.student.Results.length > 0
            ) {
                const selectedResult = this.student.Results.find(
                    (result) =>
                        result.Monthly &&
                        result.Monthly.length > 0 &&
                        result.Monthly.find(
                            (month) =>
                                month.Certificate_title === this.selectedMonth
                        )
                );

                if (selectedResult) {
                    const selectedMonth = selectedResult.Monthly.find(
                        (month) =>
                            month.Certificate_title === this.selectedMonth
                    );
                    return selectedMonth ? selectedMonth.Degrees : [];
                }
            }
            return [];
        },
        numberOfMonths() {
            if (!this.selectedPlan) return [];
            const monthsMap = {
                شهر: 1,
                شهرين: 2,
                "3 شهور": 3,
                "4 شهور": 4,
                "5 شهور": 5,
            };
            return Array.from(
                { length: monthsMap[this.selectedPlan] },
                (_, i) => i + 1
            );
        },
        installmentAmount() {
            if (!this.selectedPlan) return 0;
            const monthsMap = {
                شهر: 1,
                شهرين: 2,
                "3 شهور": 3,
                "4 شهور": 4,
                "5 شهور": 5,
            };
            return Math.floor(this.totalAmount / monthsMap[this.selectedPlan]);
        },
        remainingAmount() {
            return Math.max(this.totalAmount - this.paidAmount, 0);
        },
    },
    methods: {
        ...mapActions(usenotification, ["get_notifications"]),
        async loadStudent(id) {
            try {
                const studentRef = doc(db, "students", id);
                const studentSnapshot = await getDocs(studentRef);
                if (studentSnapshot.exists()) {
                    this.student = studentSnapshot.data();
                } else {
                    console.error("No such student!");
                    this.student = null;
                }
            } catch (error) {
                console.error("Error loading student:", error);
                this.student = null;
            }
        },
        getNotificationColor(type) {
            switch (type) {
                case "تنبيه":
                    return "blue lighten-3";
                case "سئ":
                    return "orange lighten-3";
                case "error":
                    return "red lighten-3";
                case "جيد":
                    return "green lighten-3";
                default:
                    return "blue lighten-3";
            }
        },
        getNotificationIcon(type) {
            switch (type) {
                case "تنبيه":
                    return "mdi-information";
                case "سئ":
                    return "mdi-alert";
                case "error":
                    return "mdi-alert-circle";
                case "جيد":
                    return "mdi-check-circle";
                default:
                    return "mdi-information";
            }
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
        // createChart() {
        //     const ctx = document.getElementById("myChart");
        //     if (ctx) {
        //         console.log("start createChart");
        //         this.CreateChart = true;
        //         new Chart(ctx, {
        //             type: "doughnut",
        //             data: {
        //                 datasets: [
        //                     {
        //                         label: "المصروفات",
        //                         data: ["90", "80"],
        //                         backgroundColor: ["#336699", "#d8588c"],
        //                         hoverOffset: 4,
        //                     },
        //                 ],
        //             },
        //         });
        //     } else {
        //         console.log("error");
        //     }
        // },
        downloadPDF() {
            const doc = new jsPDF("landscape");
            doc.addFileToVFS("Amiri-Regular.ttf", Amiri_Regular);
            doc.addFont("Amiri-Regular.ttf", "Amiri-Regular", "normal");
            doc.setFont("Amiri-Regular");
            //border
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 5; // حجم الهامش من كل جانب
            doc.setLineWidth(0.5);
            doc.rect(
                margin,
                margin,
                pageWidth - 2 * margin,
                pageHeight - 2 * margin
            );
            // Profile Certification

            // إضافة الصورة
            const imgData =
                "data:image/jpeg;base64,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"; // حط النص اللي جبته من الموقع هنا
            doc.addImage(imgData, "JPEG", 15, 15, 50, 50);

            // إضافة النص تحت الصورة
            // دى فنكشن built in
            doc.setFontSize(14);
            doc.text("معهد السراج المنير الأزهرى", 16, 70);

            doc.text("الاسم:  " + this.student.name, 248, 30);
            doc.text("المرحله الدراسيه:  " + this.student.gradeLevel, 225, 40);
            doc.text("السنه الدراسيه:  " + this.student.schoolYear, 232, 50);
            doc.setFontSize(30);
            doc.text("شهادة", 130, 84);
            // ******************************************************
            const tableColumn = [
                "الدرجة النهائية للطالب",
                "الدرجة الكبرى",
                "الدرجة الصغرى",
                "تقييم السلوك",
                "اسم المعلم",
                "اسم المادة",
            ];
            const tableRows = [];
            this.selectedMonthlyDegrees.forEach((degree) => {
                const degreeData = [
                    degree.Minor_degree,
                    degree.Student_degree,
                    degree.Major_degree,
                    degree.Behavior_assessment,
                    degree.Teacher_Name,
                    degree.Subject_Name,
                ];
                tableRows.push(degreeData);
            });
            //  ده التيبل
            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 100,
                styles: {
                    font: "Amiri-Regular",
                    fontSize: 10,
                    cellWidth: "wrap",
                    halign: "right", // تحديد محاذاة النص إلى اليمين
                    valign: "middle", // تحديد محاذاة عمودياً
                    cellPadding: 5, // تحديد هامش الخلية
                },
                columnStyles: {
                    0: { cellWidth: "auto" },
                    1: { cellWidth: "auto" },
                    2: { cellWidth: "auto" },
                    3: { cellWidth: "auto" },
                    4: { cellWidth: "auto" },
                    5: { cellWidth: "auto" },
                },
            });

            doc.save("table.pdf");
        },
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
    },
    watch: {
        amount(newValue) {
            const amountToPay = parseInt(newValue);

            if (!isNaN(amountToPay) && amountToPay > 0) {
                this.paidAmount = amountToPay;
            } else {
                this.paidAmount = 0;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.v-card {
    margin-bottom: 20px;
    background-color: var(--secound-color);
    border: 1px solid var(--main-color);
    border-radius: 10px;
}

.student-card-title {
    background-color: var(--main-color);
    color: white;
    font-weight: bold;
    padding: 10px;
    border-radius: 10px 10px 0 0;
}

.v-text-field {
    background-color: white;
    border-radius: 4px;
}

.student-card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-list-item {
    border-bottom: 1px solid var(--therd-color);
}

.v-list-item-title {
    color: var(--pink-color);
    font-weight: bold;
}
.loading-dialog {
    border: none;
    box-shadow: none;
    border-radius: 8px;
    padding: 20px;
}

.v-dialog__content {
    align-items: center;
    justify-content: center;
}
.admin-card {
    padding: 68px;
    background-color: #2196f333;
}
.right {
    width: 100% !important;
    margin-right: 20px;
    font-weight: bold;
    font-size: 20px;
    border-bottom: 5px solid var(--secound-color);
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .v-breadcrumbs-item:first-child {
        color: var(--main-color);
        cursor: pointer;
        font-size: 24px;
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .v-breadcrumbs {
        padding: 16px 0;
    }
}
.left {
    display: flex;
    align-items: center;
    gap: 15px;
}
.v-container {
    margin: 20px auto !important;
    flex-wrap: wrap;
    padding: 0;
    justify-content: flex-start !important;
    flex-direction: column;
    gap: 40px;
}
.card {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    font-size: 20px;
    color: var(--main-color);
    font-weight: bold;
    padding: 20px;
    text-align: center;
    width: 100%;
}
.feat {
    width: 100%;
    box-shadow: 0 0 10px #ddd;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    // max-width: 33%;
    & > div {
        width: 100%;

        position: relative;
    }
    .Top {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 250px;
        .v-img {
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
        }
        svg {
            position: absolute;
            top: 8px;
            left: 8px;
            width: 15px;
            height: 15px;
            padding: 6px;
            border-radius: 50%;
            cursor: pointer;
            color: #fff;
            z-index: 100000000000;
            background: var(--main-color);
            &:first-child {
                left: 40px;
            }
        }
    }
    .Bottom {
        padding: 10px;
        .title {
            font-size: 20px;
            color: var(--main-color);
            font-weight: bold;
            margin: 5px 0;
        }
        .time {
            display: flex;
            align-items: center;
            gap: 5px;
            color: var(--therd-color);
            font-weight: bold;
            margin-bottom: 20px;
            position: relative;
            font-size: 14px;
            &::before {
                content: "";
                position: absolute;
                bottom: -10px;
                left: 0;
                width: 100%;
                height: 4px;
                background: var(--secound-color);
            }
        }
        .description {
            font-weight: bold;
            color: var(--therd-color);
        }
    }
    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        margin-bottom: 15px;
        &::before {
            content: "";
            position: absolute;
            bottom: -15px;
            height: 3px;
            width: 100%;
            background: var(--secound-color);
        }
        & > div {
            display: flex;
            align-items: center;
            gap: 5px;
            .number {
                background: var(--main-color);
                color: #fff;
                border-radius: 5px;
                font-weight: bold;
                font-size: 18px;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .name {
                font-size: 20px;
                color: var(--main-color);
                font-weight: bold;
            }
            svg {
                color: var(--main-color);
                font-size: 20px;
                cursor: pointer;

                &:hover {
                    color: var(--therd-color);
                }
            }
        }
    }
    .body {
        & > div {
            font-weight: bold;
            font-size: 19px;
            color: var(--therd-color);
            margin: 20px 0 5px;
        }
        ul {
            color: var(--therd-color);
            font-weight: bold;
            font-size: 16px;
            li {
                list-style-type: square;
                list-style-position: inside;
            }
        }
    }
    .footer {
        .show_password {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            background: var(--main-color);
            width: 100%;
            padding: 10px;
            color: #fff;
            border-radius: 5px;
            cursor: pointer;
            &:hover {
                background-color: var(--therd-color);
            }
        }
    }
}
.v-card.v-theme--light.v-card--density-default.v-card--variant-elevated {
    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 10px 0;
        font-size: 23px;
        color: var(--main-color);
        font-weight: bold;
        position: relative;
        margin-bottom: 20px;
        svg {
            cursor: pointer;
            padding: 10px;
        }
        &::before {
            content: "";
            position: absolute;
            bottom: -10px;
            left: 50%;
            height: 4px;
            width: 95%;
            background: var(--secound-color);
            transform: translateX(-50%);
        }
    }
    .body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        color: var(--therd-color);
        background: var(--secound-color);
        margin: 0 10px 10px;
        border-radius: 5px;
        svg {
            color: var(--main-color);
            font-size: 18px;
            cursor: pointer;
        }
    }
}
.hello_text {
    font-size: 20px;
    color: var(--therd-color);
    font-weight: bold;
}
.form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    div {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    img.pluse {
        width: 30px !important;
    }
    img.pluse.pluse_1 {
        width: 30px !important;
    }
}
.children {
    width: 100%;
    .title {
        width: 100%;
        background: var(--secound-color);
        padding: 10px;
        border-radius: 5px;
        color: var(--main-color);
        font-size: 22px;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .body {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
        margin-top: 20px;

        .box {
            box-shadow: 0 0 10px #ddd;
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 10px;
            border-radius: 5px;
            position: relative;
            gap: 5px;
            .head {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: var(--secound-color);
                padding: 10px;
                border-radius: 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                margin-top: 10px;
                img {
                    width: 35px;
                }
                .name {
                    font-size: 18px;
                    font-weight: bold;
                    color: var(--main-color);
                }
            }
            .grad {
                color: var(--therd-color);
                font-weight: bold;
                font-size: 15px;
                background: var(--secound-color);
                padding: 10px;
                border-radius: 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                margin-top: 10px;
            }
            .class {
                display: flex;
                align-items: center;
                gap: 5px;
                color: var(--pink-color);
                font-weight: bold;
                background: var(--secound-color);
                padding: 10px;
                border-radius: 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                margin-top: 10px;
            }
        }
    }
}
@media (max-width: 599px) {
}
@media (min-width: 600px) and (max-width: 768px) {
}
@media (min-width: 769px) {
    .v-container {
        flex-direction: row;
        gap: 15px;
        align-items: stretch !important;
    }
    .card {
        width: 32%;
    }
    .feat {
        width: 32%;
        justify-content: flex-start;
    }
}

img.pluse {
    width: 40px;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
}
img.pluse.pluse_1 {
    width: 30px;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
}
.visible {
    opacity: 0;
    animation: fadeIn 1s ease-in-out forwards;
    margin-top: 20px;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.popup .title {
    padding: 20px 20px 0 !important;
    font-size: 23px;
    font-weight: bold;
    color: var(--main-color);
    position: relative;
    margin-bottom: 15px;
    &::before {
        content: "";
        position: absolute;
        bottom: -15px;
        height: 3px;
        width: calc(100% - 40px);
        background: var(--secound-color);
        left: 50%;
        transform: translateX(-50%);
    }
}
.v-btn--icon.v-btn--density-default {
    color: var(--main-color);
    width: auto;
    height: auto;
    box-shadow: none;
    &:hover {
        background: #fff;
    }
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
    gap: 10px;
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
.month-name {
    font-weight: bold;
    color: var(--main-color);
}
.v-container {
    overflow: hidden;
}
.v-container {
    overflow: hidden;
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
}
.v-card-title {
    padding: 16px;
    background-color: #f9f9f9;
    border-bottom: 1px solid #eee;
}
.v-card-text {
    padding: 16px;
}
.container {
    width: 100%;
    margin: auto;
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
    gap: 10px;
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
    .monthly .Certificate .head .right[data-v-38d76ab4] {
        align-items: stretch !important;
    }
}
.v-list-item[data-v-38d76ab4] {
    border: none;
}
.v-card--variant-elevated[data-v-38d76ab4] {
    background: #fff;
}
</style>
