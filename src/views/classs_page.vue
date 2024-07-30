<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <div class="ser">
                        <div class="right">
                            <div>{{ year }}</div>
                        </div>
                        <div
                            class="left"
                            style="
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                gap: 20px;
                            "
                        >
                            <font-awesome-icon
                                :icon="['fas', 'filter']"
                                style="cursor: pointer"
                                @click="dialogFilter = true"
                            />
                            <font-awesome-icon
                                :icon="['fas', 'plus']"
                                @click="dialog = true"
                                style="cursor: pointer"
                                v-tooltip="add"
                            />
                        </div>
                    </div>
                    <v-dialog v-model="dialog" width="90%">
                        <v-card width="100%" class="popup">
                            <v-card-title
                                class="d-flex justify-space-between align-center"
                            >
                                <div
                                    class="text-h4 ps-2"
                                    style="color: var(--main-color)"
                                >
                                    إضافة
                                </div>
                                <v-btn
                                    style="color: var(--main-color)"
                                    icon="mdi-close"
                                    variant="text"
                                    @click="dialog = false"
                                ></v-btn>
                            </v-card-title>
                            <div class="cards mb-4" style="padding: 10px">
                                <v-row
                                    style="
                                        display: flex;
                                        justify-content: space-around;
                                        align-items: center;
                                    "
                                    class="mb-4"
                                >
                                    <v-card
                                        style="
                                            background-color: var(
                                                --secound-color
                                            ) !important;
                                            width: 30% !important;
                                        "
                                        class="card text-center mt-3"
                                        prepend-icon="mdi-book-open-variant"
                                        link
                                        @click="subject = true"
                                    >
                                        <v-card-title>إضافة مواد</v-card-title>
                                    </v-card>

                                    <!-- v-card to open dialog -->
                                    <v-card
                                        style="
                                            background-color: var(
                                                --secound-color
                                            ) !important;
                                            width: 30% !important;
                                        "
                                        class="card text-center mt-3"
                                        prepend-icon="mdi-account"
                                        link
                                        @click="openDialog"
                                    >
                                        <v-card-title
                                            >إضافة جدول دراسي</v-card-title
                                        >
                                    </v-card>
                                    <v-card
                                        style="
                                            background-color: var(
                                                --secound-color
                                            ) !important;
                                            width: 30% !important;
                                        "
                                        class="card text-center mt-3"
                                        prepend-icon="mdi-account"
                                        link
                                        @click="dialog_1 = true"
                                    >
                                        <v-card-title @click="dialog = false"
                                            >إضافة إشعارات</v-card-title
                                        >
                                    </v-card>
                                </v-row>
                                <add-subject
                                    @closeDialog="closeDialog"
                                    :localSubject="subject"
                                />
                                <add-study-schedule
                                    :year="year"
                                    v-model="showDialog"
                                />
                                <v-row
                                    style="
                                        display: flex;
                                        justify-content: space-around;
                                        align-items: center;
                                    "
                                >
                                    <v-card
                                        style="
                                            background-color: var(
                                                --secound-color
                                            ) !important;
                                        "
                                        class="card text-center mt-3"
                                        prepend-icon="mdi-newspaper-variant-multiple-outline"
                                        @click="showAddStudentDialog"
                                        width="30%"
                                    >
                                        <v-card-title @click="dialog = false"
                                            >إضافة بيانات الطالب</v-card-title
                                        >
                                    </v-card>
                                    <v-card
                                        style="
                                            background-color: var(
                                                --secound-color
                                            ) !important;
                                        "
                                        class="card text-center mt-3"
                                        prepend-icon="mdi-image"
                                        link
                                        @click="dialog_2 = true"
                                        width="30%"
                                    >
                                        <v-card-title @click="dialog = false"
                                            >إضافة الصور</v-card-title
                                        >
                                    </v-card>
                                    <!--Bubble sheet -->
                                    <v-card
                                        style="
                                            background-color: var(
                                                --secound-color
                                            ) !important;
                                            width: 30% !important;
                                        "
                                        class="card text-center mt-3"
                                        prepend-icon="mdi-help-circle-outline"
                                        link
                                        @click="dialog_bubble = true"
                                    >
                                        <v-card-title @click="dialog = false"
                                            >إضافة أختبارات</v-card-title
                                        >
                                    </v-card>
                                </v-row>
                                <v-row
                                    style="
                                        display: flex;
                                        justify-content: space-around;
                                        align-items: center;
                                    "
                                >
                                    <v-card
                                        style="
                                            background-color: var(
                                                --secound-color
                                            ) !important;
                                        "
                                        class="card text-center mt-3"
                                        prepend-icon="mdi-newspaper-variant-multiple-outline"
                                        width="30%"
                                        @click="openDialog2"
                                    >
                                        <v-card-title
                                            >إضافة الخطه الاسبوعيه</v-card-title
                                        >
                                    </v-card>
                                </v-row>
                                <weeklyPlan
                                    v-model="showDialog2"
                                    :year="year"
                                />
                            </div>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialog_1" max-width="90%">
                        <v-card style="padding: 30px">
                            <div
                                style="
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    margin-bottom: 20px;
                                "
                            >
                                <div style="display: flex; align-items: center">
                                    <v-card-title>
                                        <span class="headline"
                                            >إضافة اشعار</span
                                        >
                                    </v-card-title>
                                </div>
                                <v-btn
                                    color="blue"
                                    @click="dialogAddNotice = true"
                                    >إضافة اشعار</v-btn
                                >
                            </div>
                            <v-card-text>
                                <v-row>
                                    <v-col
                                        v-if="
                                            filteredClasses[0].Notifications
                                                .length === 0
                                        "
                                    >
                                        <Empty_error text="لا يوجد اشعارات." />
                                    </v-col>
                                    <v-col
                                        v-else
                                        v-for="(
                                            classRoom, index
                                        ) in filteredClasses[0].Notifications"
                                        :key="classRoom.id"
                                        @click="selectClass(classRoom)"
                                        cols="12"
                                        md="4"
                                    >
                                        <v-alert
                                            :type="
                                                classRoom.NotificationType ===
                                                'سئ'
                                                    ? 'error'
                                                    : classRoom.NotificationType ===
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
                                                    classRoom.NoticeTitle
                                                }}</span>
                                                <div>
                                                    <v-icon
                                                        small
                                                        color="white"
                                                        class="mr-2"
                                                        @click="
                                                            editNotification(
                                                                filteredClasses[0]
                                                                    .id,
                                                                index
                                                            )
                                                        "
                                                        >mdi-pencil</v-icon
                                                    >
                                                    <v-icon
                                                        small
                                                        class="mr-2"
                                                        color="white"
                                                        @click="
                                                            deleteNotification(
                                                                filteredClasses[0]
                                                                    .id,
                                                                index
                                                            )
                                                        "
                                                        >mdi-delete</v-icon
                                                    >
                                                </div>
                                            </div>
                                            <div>
                                                {{ classRoom.theDescription }}
                                            </div>
                                        </v-alert>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-dialog
                                v-model="dialogAddNotice"
                                max-width="500px"
                            >
                                <v-card>
                                    <v-card-title>
                                        <span class="headline"
                                            >إضافة اشعار جديدة</span
                                        >
                                    </v-card-title>
                                    <v-card-text>
                                        <v-form ref="addForm">
                                            <v-text-field
                                                v-model="
                                                    newNotification.NoticeTitle
                                                "
                                                label="عنوان الاشعار"
                                                required
                                            ></v-text-field>
                                            <v-textarea
                                                v-model="
                                                    newNotification.theDescription
                                                "
                                                label="الوصف"
                                                required
                                            ></v-textarea>
                                            <v-select
                                                v-model="
                                                    newNotification.NotificationType
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
                                            @click="dialogAddNotice = false"
                                            >إلغاء</v-btn
                                        >
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="
                                                addNotification(
                                                    filteredClasses[0].id
                                                )
                                            "
                                            >حفظ</v-btn
                                        >
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-card>
                    </v-dialog>
                    <v-dialog
                        v-model="editNotificationDialog"
                        max-width="500px"
                    >
                        <v-card>
                            <v-card-title>
                                <span class="headline">تعديل الاشعار</span>
                            </v-card-title>
                            <v-card-text>
                                <v-form ref="editForm">
                                    <v-text-field
                                        v-model="editedNotification.NoticeTitle"
                                        label="عنوان الاشعار"
                                        required
                                    ></v-text-field>
                                    <v-textarea
                                        v-model="
                                            editedNotification.theDescription
                                        "
                                        label="الوصف"
                                        required
                                    ></v-textarea>
                                    <v-select
                                        v-model="
                                            editedNotification.NotificationType
                                        "
                                        label="نوع الاشعار"
                                        required
                                        :items="['سئ', 'جيد', 'معلومات']"
                                    ></v-select>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="closeNotificationDialogs"
                                    >إلغاء</v-btn
                                >
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="saveNotificationEdit"
                                    >حفظ</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-dialog v-model="dialog_2" max-width="90%">
                        <div style="background: white; padding: 53px">
                            <div
                                style="
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    margin-bottom: 20px;
                                "
                            >
                                <div style="display: flex; align-items: center">
                                    <h2 style="color: #2196f3">الصور</h2>
                                </div>
                                <v-btn
                                    color="blue"
                                    @click="dialogAddPhoto = true"
                                    >اضافه صوره</v-btn
                                >
                            </div>
                            <v-row>
                                <v-col
                                    v-if="
                                        filteredClasses[0].photos.length === 0
                                    "
                                >
                                    <Empty_error text="لا يوجد صور." />
                                </v-col>
                                <v-col
                                    v-else
                                    cols="12"
                                    md="4"
                                    v-for="(photo, index) in filteredClasses[0]
                                        .photos"
                                    :key="index"
                                >
                                    <v-card
                                        class="mb-3 notification-card"
                                        outlined
                                    >
                                        <v-card-title
                                            class="d-flex align-left"
                                            style="justify-content: end"
                                        >
                                            <div>
                                                <v-icon
                                                    small
                                                    class="mr-2"
                                                    @click="
                                                        deletePhotos(
                                                            filteredClasses[0]
                                                                .id,
                                                            index
                                                        )
                                                    "
                                                    >mdi-delete</v-icon
                                                >
                                            </div>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-img
                                                :src="photo.linkphoto"
                                                aspect-ratio="1"
                                                class="mb-2"
                                            ></v-img>
                                            <!-- عرض وقت الصورة -->
                                            <p
                                                style="
                                                    color: grey;
                                                    font-size: 0.9em;
                                                "
                                            >
                                                {{ photo.DatePhoto }}
                                            </p>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </div>
                    </v-dialog>

                    <v-dialog v-model="dialogAddPhoto" max-width="500px">
                        <v-card>
                            <v-card-title>
                                <span class="headline">إضافة صوره جديدة</span>
                            </v-card-title>
                            <v-card-text>
                                <v-form ref="addForm">
                                    <v-file-input
                                        style="width: 100%"
                                        v-model="AddPhoto.file"
                                        label="صورة"
                                        accept="image/*"
                                        variant="outlined"
                                        prepend-icon=""
                                        width="100%"
                                        prepend-inner-icon="mdi-paperclip"
                                        required
                                    ></v-file-input>
                                    <v-textarea
                                        v-model="AddPhoto.grade"
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
                                    @click="dialogAddPhoto = false"
                                    >إلغاء</v-btn
                                >
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="addPhoto(filteredClasses[0].id)"
                                    >حفظ</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-dialog v-model="dialog_bubble" max-width="90%">
                        <v-card style="padding: 0">
                            <div>
                                <div
                                    style="
                                        background-color: #2196f3;
                                        color: #fff;
                                        font-size: 18px;
                                        padding: 10px;
                                    "
                                >
                                    إنشاء إختبار
                                </div>
                            </div>
                            <v-card-text style="margin-top: 5px">
                                <!-- معلومات الاختبار -->
                                <v-form ref="createTestForm">
                                    <v-row class="d-flex justify-center">
                                        <v-col cols="4">
                                            <v-text-field
                                                :value="year"
                                                disabled
                                            ></v-text-field>
                                            <v-select
                                                v-model="newTest.className"
                                                :items="all_classes"
                                                label="اسم الفصل"
                                                required
                                            ></v-select>
                                            <v-select
                                                v-model="newTest.section"
                                                :items="section"
                                                label="القسم"
                                                required
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="8">
                                            <v-text-field
                                                v-model="
                                                    newTest.questions[0]
                                                        .question
                                                "
                                                label="السؤال الأول"
                                                required
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="
                                                    newTest.questions[0]
                                                        .correctAnswer
                                                "
                                                label="الإجابة الصحيحة"
                                                required
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="
                                                    newTest.questions[0]
                                                        .wrongAnswer1
                                                "
                                                label="الإجابة الخاطئة 1"
                                                required
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="
                                                    newTest.questions[0]
                                                        .wrongAnswer2
                                                "
                                                label="الإجابة الخاطئة 2"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>

                                    <!-- جزء خاص بالأسئلة -->
                                    <v-divider></v-divider>

                                    <v-row>
                                        <v-col cols="12">
                                            <v-row
                                                v-for="(
                                                    question, index
                                                ) in newTest.questions.slice(1)"
                                                :key="index"
                                            >
                                                <v-col cols="12">
                                                    <v-text-field
                                                        v-model="
                                                            question.question
                                                        "
                                                        label="السؤال"
                                                        required
                                                    ></v-text-field>
                                                    <v-text-field
                                                        v-model="
                                                            question.correctAnswer
                                                        "
                                                        label="الإجابة الصحيحة"
                                                        required
                                                    ></v-text-field>
                                                    <v-text-field
                                                        v-model="
                                                            question.wrongAnswer1
                                                        "
                                                        label="الإجابة الخاطئة 1"
                                                        required
                                                    ></v-text-field>
                                                    <v-text-field
                                                        v-model="
                                                            question.wrongAnswer2
                                                        "
                                                        label="الإجابة الخاطئة 2"
                                                        required
                                                    ></v-text-field>
                                                    <v-divider></v-divider>
                                                </v-col>
                                            </v-row>

                                            <!-- زر إضافة الأسئلة -->
                                            <v-btn
                                                @click="addQuestion"
                                                color="primary"
                                                style="
                                                    margin-right: 34%;
                                                    margin-top: 20px;
                                                "
                                                >+ إضافة سؤال</v-btn
                                            >
                                        </v-col>
                                    </v-row>

                                    <!-- زر إضافة الاختبار -->
                                    <v-btn
                                        @click="addTest"
                                        class="mt-16"
                                        color="success"
                                        >إضافة الاختبار</v-btn
                                    >
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                </v-col>
            </v-row>
            <v-snackbar
                v-model="snackbar.visible"
                :color="snackbar.color"
                timeout="3000"
            >
                {{ snackbar.message }}
                <v-btn text @click="snackbar.visible = false">Close</v-btn>
            </v-snackbar>
            <v-row>
                <v-col>
                    <h3
                        v-if="isSortedAscending"
                        style="color: rgba(33, 150, 243, 0.768627451)"
                    >
                        نوع الفلتر :
                        {{ isSortedAscending ? " ابجدي" : "" }}
                    </h3>
                    <h3
                        v-if="paymentSortActive"
                        style="color: rgba(33, 150, 243, 0.768627451)"
                    >
                        نوع الفلتر :
                        {{ paymentSortActive ? "حسب المدفوعات" : "" }}
                    </h3>
                    <h3
                        v-if="filtersy.byGrades"
                        style="color: rgba(33, 150, 243, 0.768627451)"
                    >
                        نوع الفلتر :
                        {{ filtersy.byGrades ? filtersy.byGrades : "" }}
                    </h3>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4" sm="6">
                    <v-btn
                        :class="{ active: activeButton === 'الكل' }"
                        :style="buttonStyle('الكل')"
                        rounded="xl"
                        size="x-large"
                        block
                        @click="updateSection('الكل')"
                    >
                        الكل
                    </v-btn>
                </v-col>
                <v-col cols="12" md="4" sm="6">
                    <v-btn
                        :class="{ active: activeButton === 'عربي' }"
                        :style="buttonStyle('عربي')"
                        rounded="xl"
                        size="x-large"
                        block
                        @click="updateSection('عربي')"
                    >
                        عربي
                    </v-btn>
                </v-col>
                <v-col cols="12" md="4" sm="6">
                    <v-btn
                        :class="{ active: activeButton === 'لغات' }"
                        :style="buttonStyle('لغات')"
                        rounded="xl"
                        size="x-large"
                        block
                        @click="updateSection('لغات')"
                    >
                        لغات
                    </v-btn>
                </v-col>
            </v-row>

            <v-dialog
                v-model="dialogFilter"
                max-width="600px"
                class="custom-dialog"
            >
                <transition name="fade">
                    <v-card>
                        <v-card-title class="headline">
                            فلتر الطلاب
                        </v-card-title>
                        <v-card-text>
                            <!-- Filter Options -->
                            <v-form>
                                <!-- Alphabetical Order Toggle -->
                                <v-row class="mb-3">
                                    <v-col>
                                        <v-switch
                                            v-model="paymentSortActive"
                                            label="اعلي المدفوعات"
                                            :style="{
                                                color: paymentSortActive
                                                    ? 'green'
                                                    : '',
                                            }"
                                            @change="handlePaymentSortChange"
                                            class="filter-switch"
                                        />
                                    </v-col>
                                </v-row>

                                <!-- Sort by Grades Select -->
                                <v-row class="mb-3">
                                    <v-col cols="12">
                                        <v-select
                                            v-model="filtersy.byGrades"
                                            :items="gradeOptions"
                                            label="ترتيب حسب الدرجات"
                                            outlined
                                            hide-details
                                        ></v-select>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </transition>
            </v-dialog>
        </v-container>
        <StudentList
            :year="year"
            :sortStudents="sortStudentsByYearAndAlphabetically"
            :selectedSection="selectedSection"
            :isSortedAscending="isSortedAscending"
            :paymentSortActive="paymentSortActive"
            :gradeSortActive="filtersy.byGrades"
            :gradeOptions="gradeOptions"
        />
        <confirm_message2
            v-model="showSnackbar"
            :text="confirmationText"
            :snackbar="showSnackbar"
            @close-snackbar="showSnackbar = false"
        />
    </div>
</template>

<script>
import StudentList from "@/components/StudentList.vue";
import Empty_error from "@/components/Empty_error.vue";
import { useDialogStore } from "@/store/useDialogStore";
import { reactive } from "vue";
import { mapActions } from "pinia";
import { usenotification } from "../store/notification.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    getFirestore,
    addDoc,
    query,
    where,
    serverTimestamp,
} from "firebase/firestore";
import { initializeApp } from "@firebase/app";
import { getStorage } from "firebase/storage";
import "vue-toastification/dist/index.css"; // Import the CSS file
import confirm_message2 from "@/components/confirm_message2.vue";
// import { decodeURIComponent } from "vue-router";
import addSubject from "@/components/subject/addSubject.vue";
// import addStudySchedule from "@/components/add_study_schedule.vue";
import AddStudySchedule from "@/components/add_study_schedule.vue";
import weeklyPlan from "@/components/weeklyPlan.vue";
const firebaseConfig = {
    apiKey: "AIzaSyBdk3sqIHjXvB2C-O-lvkRgMFpg8pemkno",
    authDomain: "alseraj--almoner.firebaseapp.com",
    projectId: "alseraj--almoner",
    storageBucket: "alseraj--almoner.appspot.com",
    messagingSenderId: "462211256149",
    appId: "1:462211256149:web:a03ace3c70b306620169dc",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
export default {
    name: "ClassPage",
    components: {
        StudentList,
        addSubject,
        AddStudySchedule,
        weeklyPlan,
        confirm_message2,
        Empty_error,
    },
    props: ["year"],
    setup() {
        const dialogStore = useDialogStore();
        const showAddStudentDialog = () => {
            dialogStore.showAddStudentDialog();
        };
        const showSearchStudentDialog = () => {
            dialogStore.showSearchStudentDialog();
        };
        return { showAddStudentDialog, showSearchStudentDialog };
    },
    data() {
        return {
            paymentSortActive: false,
            activeButton: "الكل",
            all_classes: ["1/1", "1/2", "2/1", "2/2", "3/1", "3/2"],
            section: ["عربي", "لغات"],
            selectedSection: "الكل",
            dialog_6: false,
            showDialog: false,
            showDialog2: false,
            isSortedAscending: true,
            showSnackbar: false,
            StudySchedule: {
                // البيانات التي ترغب في تمريرها إلى المكون
            },
            filtersy: {
                byGrades: "",
            },
            newTest: {
                className: "",
                section: "",
                questions: [
                    {
                        question: "",
                        correctAnswer: "",
                        wrongAnswer1: "",
                        wrongAnswer2: "",
                    },
                ],
            },
            snackbar: {
                visible: false,
                message: "",
                color: "error",
            },
            class_rooms: [],
            photos: [
                {
                    Date: "",
                    link: "",
                },
            ],
            subject: false,

            sortActive: false, // متغير لتتبع حالة الترتيب
            dialog: false,
            newNotification: {
                NoticeTitle: "",
                theDescription: "",
                NotificationType: "",
            },
            filters: reactive({
                alphabetical: false,
            }),
            students_class: [],
            searchQuery: "",
            dialogAddPhoto: false,
            dialog_1: false,
            dialog_bubble: false,
            dialog_2: false,
            dialogAddNotice: false,
            editNotificationDialog: false,
            dialogFilter: false,
            AddNotice: {
                NoticeTitle: "",
                theDescription: "",
                NotificationType: "",
            },
            editedNotification: {
                NoticeTitle: "",
                theDescription: "",
                NotificationType: "",
            },

            progress: 0,
            selectedClass: [],
            students: [],
            classes: [],
            AddPhoto: {
                Date: "",
                link: "",
            },

            gradeOptions: [
                "شهر أكتوبر",
                "شهر نوفمبر",
                "الترم الأول",
                "شهر فبراير",
                "شهر مارس",
                "الترم الثاني",
            ],
            monthOptions: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ],
        };
    },
    computed: {
        decodedYear() {
            return decodeURIComponent(this.$route.params.year);
        },

        filteredClasses() {
            return this.class_rooms.filter(
                (classs) => classs.grade === this.year
            );
        },
    },
    methods: {
        ...mapActions(usenotification, ["send_Notification"]),
        updateSection(section) {
            this.activeButton = section;
            this.selectedSection = section;
        },
        buttonStyle(section) {
            return this.activeButton === section
                ? { background: "white", color: "#54aef5" }
                : { background: "#54aef5", color: "white" };
        },
        openDialog() {
            this.showDialog = true;
        },
        openDialog2() {
            this.showDialog2 = true;
        },
        addQuestion() {
            const firstQuestion = this.newTest.questions[0];
            if (
                firstQuestion.question &&
                firstQuestion.correctAnswer &&
                firstQuestion.wrongAnswer1 &&
                firstQuestion.wrongAnswer2
            ) {
                this.newTest.questions.push({
                    question: "",
                    correctAnswer: "",
                    wrongAnswer1: "",
                    wrongAnswer2: "",
                });
            } else {
                alert(
                    "الرجاء ملء جميع الحقول في السؤال الأول قبل إضافة المزيد."
                );
            }
        },
        async addTest() {
            const educationalLevel = this.year;
            const className = this.newTest.className;
            const section = this.newTest.section;

            if (!educationalLevel || !className || !section) {
                this.snackbar.message = "يرجى ملء جميع الحقول";
                this.snackbar.color = "error";
                this.snackbar.visible = true;
                return;
            }

            const testData = {
                info: {
                    class: className,
                    section: section,
                },
                students: [
                    {
                        student_id: "",
                        degree: "",
                    },
                ],
                Questions: this.newTest.questions,
                createdAt: serverTimestamp(),
            };

            try {
                await addDoc(collection(db, "exam"), testData);

                this.snackbar.message = "تم إضافة الاختبار بنجاح";
                this.snackbar.color = "success";
                this.snackbar.visible = true;
                this.dialog_bubble = false;
            } catch (error) {
                this.snackbar.message = "خطأ أثناء إضافة الاختبار";
                this.snackbar.color = "warning";
                this.snackbar.visible = true;
            }
        },
        closeDialog(value) {
            this.subject = value;
        },
        async sortStudentsByPayment() {
            this.students_class.sort((a, b) => {
                if (a.payment_status === b.payment_status) {
                    return 0;
                }
                return a.payment_status > b.payment_status ? -1 : 1;
            });
        },
        togglePaymentSort() {
            this.paymentSortActive = !this.paymentSortActive;
        },
        async sortStudentsByYearAndAlphabetically() {
            try {
                // جلب الطلاب المنتمين إلى السنة المحددة
                const q = query(
                    collection(db, "students"),
                    where("year", "==", this.year)
                );
                const querySnapshot = await getDocs(q);

                this.students_class = querySnapshot.docs
                    .map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                        showDetails: false,
                    }))
                    .sort((a, b) => {
                        const nameA =
                            a.student_information[0].student_name.toLowerCase();
                        const nameB =
                            b.student_information[0].student_name.toLowerCase();

                        if (this.isSortedAscending) {
                            return nameA.localeCompare(nameB, "ar", {
                                sensitivity: "base",
                            });
                        } else {
                            return nameB.localeCompare(nameA, "ar", {
                                sensitivity: "base",
                            });
                        }
                    });

                console.log(this.students_class);
            } catch (error) {
                console.error("Error sorting students:", error);
            }
        },
        toggleSorting() {
            this.isSortedAscending = !this.isSortedAscending;
        },
        toggleSortOrder() {
            if (this.isSortingActive) {
                this.isSortedAscending = !this.isSortedAscending;
                this.sortStudentsByYearAndAlphabetically();
            }
        },
        resetSortOrder() {
            this.isSortedAscending = !this.isSortedAscending;
            this.sortStudentsByYearAndAlphabetically();
        },

        toggleAlphabetical() {
            this.alphabetical = !this.alphabetical;
        },
        togglePayments() {
            this.payments = !this.payments;
        },
        togglePaymentsSorting() {
            this.paymentSortActive = !this.paymentSortActive;
        },
        applyFilter() {
            // تطبيق الفلتر بناءً على الخيارات المحددة
            this.dialog = false;
        },
        handlePaymentSortChange() {
            // عندما يكون paymentSortActive مفعلًا، نظبط filtersy.byGrades إلى null
            if (this.paymentSortActive) {
                this.filtersy.byGrades = null;
            }
        },
        applyFilters() {
            // Handle filter logic here
            console.log("Filters applied:", this.filters);
            this.dialogFilter = false;
        },
        async fetchClassRooms() {
            try {
                const querySnapshot = await getDocs(
                    collection(db, "class_rooms")
                );
                this.class_rooms = querySnapshot.docs.map((doc) => {
                    const classRoomData = doc.data();
                    const classRoom = {
                        id: doc.id,
                        ...classRoomData,
                    };
                    return classRoom;
                });

                console.log("Fetched class rooms:", this.class_rooms);
            } catch (error) {
                console.error("Error fetching class rooms:", error);
            }
        },
        async addNotification(classId) {
            try {
                const classRef = doc(db, "class_rooms", classId);
                const classDoc = await getDoc(classRef);
                if (classDoc.exists()) {
                    const classData = classDoc.data();
                    classData.Notifications.push({
                        NoticeTitle: this.newNotification.NoticeTitle,
                        theDescription: this.newNotification.theDescription,
                        NotificationType: this.newNotification.NotificationType,
                    });
                    this.newNotification = Object.assign(
                        {},
                        this.newNotification,
                        classData
                    );
                    this.send_Notification(
                        this.newNotification.NoticeTitle,
                        this.newNotification.theDescription,
                        "Class_Notification"
                    );
                    await updateDoc(classRef, classData);
                    this.dialogAddNotice = false;
                    this.newNotification = {
                        NoticeTitle: "",
                        theDescription: "",
                        NotificationType: "",
                    };
                    this.confirmationText = "تم إضافة اشعار بنجاح";
                    this.showSnackbar = true;

                    await this.fetchClassRooms();
                } else {
                    console.error("Class document does not exist.");
                }
            } catch (error) {
                console.error("Error adding notification:", error);
            }
        },
        async deleteNotification(classId, notificationIndex) {
            try {
                const classRef = doc(db, "class_rooms", classId);
                const classDoc = await getDoc(classRef);
                if (classDoc.exists()) {
                    const classData = classDoc.data();
                    classData.Notifications.splice(notificationIndex, 1);
                    await updateDoc(classRef, {
                        Notifications: classData.Notifications,
                    });
                    this.confirmationText = "تم حذف اشعار بنجاح";
                    this.showSnackbar = true;
                    await this.fetchClassRooms();
                }
            } catch (error) {
                console.error("Error deleting notification:", error);
            }
        },
        editNotification(classId, index) {
            this.editedNotification = {
                ...this.filteredClasses[0].Notifications[index],
            };
            this.editedClassId = classId;
            this.editedIndex = index;
            console.log(this.editedIndex);
            this.editNotificationDialog = true;
        },
        async saveNotificationEdit() {
            try {
                const classRef = doc(db, "class_rooms", this.editedClassId);
                const classDoc = await getDoc(classRef);
                if (classDoc.exists()) {
                    const classData = classDoc.data();
                    Object.assign(
                        classData.Notifications[this.editedIndex],
                        this.editedNotification
                    );
                    await updateDoc(classRef, {
                        Notifications: classData.Notifications,
                    });
                    this.closeNotificationDialogs();
                    this.confirmationText = "تم تعديل اشعار بنجاح";
                    this.showSnackbar = true;
                    await this.fetchClassRooms();
                }
            } catch (error) {
                console.error("Error editing notification:", error);
            }
        },
        selectClass(classRoom) {
            this.selectedClass = classRoom;
        },
        closeNotificationDialogs() {
            this.editNotificationDialog = false;
        },
        // OIJI
        async addPhoto(classId) {
            try {
                if (this.AddPhoto.file) {
                    const storageRef = ref(
                        storage,
                        `photos/${this.AddPhoto.file.name}`
                    );
                    await uploadBytes(storageRef, this.AddPhoto.file);
                    const downloadURL = await getDownloadURL(storageRef);

                    const classRef = doc(db, "class_rooms", classId);
                    const classDoc = await getDoc(classRef);
                    if (classDoc.exists()) {
                        const classData = classDoc.data();

                        // تأكد من أن photos موجودة وهي مصفوفة
                        if (!Array.isArray(classData.photos)) {
                            classData.photos = [];
                        }

                        // الحصول على الوقت الحالي بصيغة مناسبة
                        const photoTime = new Date().toLocaleString("ar-EG", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                        });

                        classData.photos.push({
                            DatePhoto: photoTime,
                            linkphoto: downloadURL,
                        });
                        await updateDoc(classRef, { photos: classData.photos });

                        this.dialogAddPhoto = false;
                        this.AddPhoto = {
                            Date: "",
                            link: "",
                        };
                        this.confirmationText = "تم اضافه الصوره بنجاح";
                        this.showSnackbar = true;
                        await this.fetchClassRooms();
                    } else {
                        console.error("Class document does not exist.");
                    }
                }
            } catch (error) {
                console.error("Error adding photo:", error);
            }
        },
        async deletePhotos(classId, photoIndex) {
            try {
                const classRef = doc(db, "class_rooms", classId);
                const classDoc = await getDoc(classRef);
                if (classDoc.exists()) {
                    const classData = classDoc.data();
                    classData.photos.splice(photoIndex, 1);
                    await updateDoc(classRef, { photos: classData.photos });
                    this.confirmationText = "تم حذف الصوره بنجاح";
                    this.showSnackbar = true;
                    await this.fetchClassRooms();
                }
            } catch (error) {
                console.error("Error deleting photo:", error);
            }
        },
    },
    async mounted() {
        await this.fetchClassRooms();
        console.log(this.filteredClasses);
        this.fetchClassRooms();
    },
};
</script>

<style lang="scss" scoped>
form {
    width: 90%;
    margin: auto;
}
.ser {
    width: 100%;
    height: 100px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #2196f3c4;
    color: white;
    font-size: 23px;
}
.custom-dialog .v-dialog {
    border-radius: 10px; /* Example: Rounded corners */
    // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Example: Soft shadow */
}

.custom-dialog .v-card {
    background-color: #ffffff; /* Example: White background */
}
</style>
