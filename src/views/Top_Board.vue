<template>
    <div class="visible">
        <Offline_error>
            <template v-slot:default>
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
                            <v-breadcrumbs-item
                                @click="$router.push('/admin')"
                                link
                            >
                                الإشراف
                            </v-breadcrumbs-item>
                            <v-breadcrumbs-divider />
                            <v-breadcrumbs-item>لوحة الشرف</v-breadcrumbs-item>
                        </v-breadcrumbs>
                    </div>
                    <div class="left">
                        <img
                            src="../assets/top_board/filter.png"
                            alt=""
                            @click="dialog = true"
                        />
                    </div>
                </div>

                <v-dialog v-model="dialog" width="90%">
                    <v-card width="100%" class="popup">
                        <div
                            class="d-flex justify-space-between align-center title"
                        >
                            <div
                                style="
                                    color: var(--main-color);
                                    display: flex;
                                    align-items: center;
                                    gap: 5px;
                                    font-size: 23px;
                                    font-weight: bold;
                                "
                            >
                                <font-awesome-icon :icon="['fas', 'filter']" />
                                <div>الفلتر</div>
                            </div>
                            <font-awesome-icon
                                :icon="['fas', 'xmark']"
                                @click="dialog = false"
                            />
                        </div>
                        <div class="Body">
                            <v-select
                                :items="educational_level"
                                label="اختر المرحلة الدراسية"
                                v-model="selectedEducationalLevel"
                                class="custom-select"
                            ></v-select>
                            <v-select
                                :items="month"
                                label="اختر الشهر"
                                v-model="selectedMonth"
                                class="custom-select"
                            ></v-select>
                            <v-select
                                :items="classes"
                                label="اختر الفصل"
                                v-model="selectedClass"
                                class="custom-select"
                            ></v-select>
                            <v-select
                                :items="sections"
                                label="اختر القسم"
                                v-model="selectedSection"
                                class="custom-select"
                            ></v-select>
                            <v-select
                                :items="genders"
                                label="اختر الجنس"
                                v-model="selectedGender"
                                class="custom-select"
                            ></v-select>
                            <div class="Btn">
                                <div @click="Filter">تطبيق الفلتر</div>
                            </div>
                        </div>
                    </v-card>
                </v-dialog>
            </template>
        </Offline_error>
        <v-container>
            <!-- <ul class="show_details">
                <li v-show="selectedEducationalLevel">
                    {{ selectedEducationalLevel }}
                </li>
                <li v-show="selectedMonth">
                    {{ selectedMonth }}
                </li>
                <li v-show="selectedClass">فصل {{ selectedClass }}</li>
                <li v-show="selectedSection">
                    {{ selectedSection }}
                </li>
                <li v-show="selectedGender">
                    {{ selectedGender }}
                </li>
            </ul> -->

            <ul class="show_details">
                <li v-show="selectedEducationalLevel">
                    {{ selectedEducationalLevel }}
                </li>
                <li v-show="selectedMonth">{{ selectedMonth }}</li>
                <li v-show="selectedClass">فصل {{ selectedClass }}</li>
                <li v-show="selectedSection">{{ selectedSection }}</li>
                <li v-show="selectedGender">{{ selectedGender }}</li>
                <li v-show="shouldShowResults">
                    نتيجه البحث : {{ filteredStudentsCount }}
                </li>
            </ul>

            <div class="boxes">
                <div
                    class="box"
                    v-for="(student, index) in students
                        .slice()
                        .sort((a, b) => b.totalDegree - a.totalDegree)"
                    :key="student.id"
                >
                    <div class="top">
                        <div>
                            <div class="number">{{ index + 1 }}</div>
                            <div class="ranking">الترتيب</div>
                        </div>
                        <div class="flex-row-reverse">
                            <div class="text-center">
                                <v-progress-circular
                                    :model-value="student.percentage"
                                    :rotate="360"
                                    :size="100"
                                    :width="15"
                                    color="var(--main-color)"
                                >
                                    <template v-slot:default>
                                        {{ student.percentage }} %
                                    </template>
                                </v-progress-circular>
                            </div>
                            <div class="ranking">النسبة المئوية</div>
                        </div>
                    </div>
                    <div class="bottom">
                        <div>{{ student.student_name }}</div>
                        <div>
                            <div>{{ student.educational_level }}</div>
                            <div>{{ student.gender }}</div>
                        </div>
                        <div>
                            <div>{{ student.section }}</div>
                            <div>فصل {{ student.class }}</div>
                        </div>
                        <div>
                            <div>المجموع</div>
                            <div>
                                {{ student.totalDegree }}
                                <span v-if="maxDegree !== undefined">
                                    / {{ maxDegree }}</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Show loading indicator if data is being fetched -->

            <!-- Display message if no filters are selected -->

            <div class="Msg" v-if="!hasSelectedFilters && !shouldShowResults">
                الرجاء اختيار على الاقل المرحلة الدراسية والشهر لعرض النتائج.
            </div>

            <!-- Display message if no results with delay -->

            <div
                class="Msg"
                v-if="
                    showNoResultsAlert &&
                    students.length === 0 &&
                    shouldShowResults
                "
            >
                لا توجد نتائج للعرض بناءً على الفلاتر المحددة.
            </div>

            <!-- Display results if available -->
        </v-container>
    </div>
    <Empty_error v-if="empty === true" :text="text0" />
    <confirm_message
        v-if="snackbar === true"
        :text="text10"
        :snackbar1="snackbar"
    />
    <confirm_message
        v-if="snackbar2 === true"
        :text="text11"
        :snackbar1="snackbar2"
    />
</template>
<script>
import { db } from "../Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Offline_error from "@/components/Offline_error.vue";
import Empty_error from "@/components/Empty_error.vue";
import confirm_message from "@/components/confirm_message.vue";
export default {
    components: {
        confirm_message,
        Empty_error,
        Offline_error,
    },
    data() {
        return {
            maxDegree: 0,
            interval: -1,
            loading1: null,
            text10: null,
            text11: null,
            snackbar: null,
            snackbar2: null,
            empty: null,
            dialog: null,
            students: [],
            selectedEducationalLevel: "الصف الأول الابتدائي",
            selectedClass: "",
            selectedGender: "",
            selectedSection: "",
            selectedMonth: "شهر فبراير",
            educational_level: [
                "مرحلة رياض الأطفال الأولى",
                "مرحلة رياض الأطفال الثانية",
                "الصف الأول الابتدائي",
                "الصف الثاني الابتدائي",
                "الصف الثالث الابتدائي",
                "الصف الرابع الابتدائي",
                "الخامس الابتدائى",
                "الصف السادس الابتدائي",
                "الصف الأول الإعدادي",
                "الصف الثاني الإعدادي",
                "الصف الثالث الإعدادي",
                "الصف الأول الثانوي",
                "الصف الثاني الثانوي",
                "الصف الثالث الثانوى",
            ],
            classes: ["", "1/1", "1/2"],
            genders: ["", "ذكر", "انثي"],
            sections: ["", "عربي", "لغات"],
            month: [
                "شهر أكتوبر",
                "شهر نوفمبر",
                "الترم الأول",
                "شهر فبراير",
                "شهر مارس",
                "الترم الثاني",
            ],
            showMoreFilters: false,
            showNoResultsAlert: false,
            alertTimeout: null,
            isLoading: false, // Add isLoading state
        };
    },
    mounted() {
        this.fetchStudents();
        this.fetchMaxDegree();
        this.interval = setInterval(() => {
            if (this.value === 100) {
                return (this.value = 0);
            }
            this.value += 10;
        }, 1000);
    },
    beforeUnmount() {
        clearInterval(this.interval);
    },
    computed: {
        shouldShowResults() {
            return this.selectedEducationalLevel && this.selectedMonth;
        },
        hasSelectedFilters() {
            return (
                this.selectedEducationalLevel ||
                this.selectedMonth ||
                this.selectedClass ||
                this.selectedGender ||
                this.selectedSection
            );
        },
        currentMonth() {
            return this.selectedMonth ? this.selectedMonth : "";
        },
        filteredStudentsCount() {
            return this.students.length;
        },
    },
    methods: {
        Filter() {
            this.fetchStudents().then(() => {
                this.fetchMaxDegree();
            });
            this.dialog = false;
        },
        async fetchMaxDegree() {
            try {
                const studentsRef = collection(db, "students");
                const q = query(
                    studentsRef,
                    where(
                        "educational_level",
                        "==",
                        this.selectedEducationalLevel
                    )
                );
                const querySnapshot = await getDocs(q);

                let maxDegree = 0;
                querySnapshot.forEach((doc) => {
                    const studentData = doc.data();
                    console.log("Student Data:", studentData); // تحقق من البيانات

                    const monthlyResults = studentData.Results?.find(
                        (result) => result.Monthly
                    );

                    if (monthlyResults) {
                        const monthData = monthlyResults.Monthly.find(
                            (item) =>
                                item.Certificate_title === this.selectedMonth
                        );
                        console.log("Month Data:", monthData); // تحقق من بيانات الشهر

                        if (monthData && monthData.Degrees) {
                            const studentMaxDegree = monthData.Degrees.reduce(
                                (sum, degree) => sum + degree.Major_degree,
                                0
                            );
                            console.log(
                                "Student Max Degree:",
                                studentMaxDegree
                            ); // تحقق من أقصى درجة
                            if (studentMaxDegree > maxDegree) {
                                maxDegree = studentMaxDegree;
                            }
                        }
                    }
                });

                this.maxDegree = maxDegree;
                console.log("Updated maxDegree:", this.maxDegree); // تحقق من القيمة النهائية
            } catch (error) {
                console.error("Error fetching maxDegree: ", error);
            }
        },
        async fetchStudents() {
            if (!this.selectedEducationalLevel || !this.selectedMonth) {
                this.students = [];
                return;
            }

            this.isLoading = true; // Start loading

            try {
                const studentsRef = collection(db, "students");
                let q = query(studentsRef);

                if (this.selectedEducationalLevel) {
                    q = query(
                        q,
                        where(
                            "educational_level",
                            "==",
                            this.selectedEducationalLevel
                        )
                    );
                }
                if (this.selectedClass) {
                    q = query(q, where("class", "==", this.selectedClass));
                }
                if (this.selectedGender) {
                    q = query(q, where("gender", "==", this.selectedGender));
                }
                if (this.selectedSection) {
                    q = query(q, where("section", "==", this.selectedSection));
                }

                const querySnapshot = await getDocs(q);
                let students = [];
                querySnapshot.forEach((doc) => {
                    const studentData = { id: doc.id, ...doc.data() };

                    if (this.selectedMonth) {
                        const monthlyResults = studentData.Results?.find(
                            (result) => result.Monthly
                        );
                        if (monthlyResults) {
                            const monthData = monthlyResults.Monthly.find(
                                (item) =>
                                    item.Certificate_title ===
                                    this.selectedMonth
                            );
                            if (monthData && monthData.Degrees) {
                                const totalDegree = monthData.Degrees.reduce(
                                    (sum, degree) =>
                                        sum + degree.Student_degree,
                                    0
                                );
                                const maxDegree = monthData.Degrees.reduce(
                                    (sum, degree) => sum + degree.Major_degree,
                                    0
                                ); // حساب الدرجة القصوى

                                studentData.totalDegree = totalDegree;
                                studentData.percentage = (
                                    (totalDegree / maxDegree) *
                                    100
                                ).toFixed(2); // حساب النسبة المئوية
                            } else {
                                studentData.totalDegree = 0;
                                studentData.percentage = "0.00"; // إذا لم توجد درجات
                            }
                        } else {
                            studentData.totalDegree = 0;
                            studentData.percentage = "0.00"; // إذا لم توجد نتائج شهرية
                        }
                    }

                    students.push(studentData);
                });

                this.students = students;

                if (students.length === 0 && this.shouldShowResults) {
                    // Show no results alert after a delay of 2 seconds
                    if (this.alertTimeout) clearTimeout(this.alertTimeout);
                    this.alertTimeout = setTimeout(() => {
                        this.showNoResultsAlert = true;
                    }, 400);
                } else {
                    this.showNoResultsAlert = false;
                }
            } catch (error) {
                console.error("Error fetching students: ", error);
            } finally {
                this.isLoading = false; // End loading
            }
        },
        toggleFilters() {
            this.showMoreFilters = !this.showMoreFilters;
        },
    },
};
</script>

<style lang="scss" scoped>
/* Animation for expanding and collapsing filters */
.v-expand-transition {
    transition: height 0.5s ease;
}

.custom-select .v-select__selections {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 8px 12px;
}

.custom-select .v-select__control {
    border-radius: 8px;
    background-color: #ffffff;
    border: 1px solid #ddd;
    transition: border-color 0.3s, box-shadow 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-select .v-select__control:focus-within {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
}

.custom-select .v-select__menu {
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.custom-select .v-select__item {
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s;
}

.custom-select .v-select__item:hover {
    background-color: #007bff;
    color: #ffffff;
}

.custom-select .v-select__item.v-select__item--active {
    background-color: #007bff;
    color: #ffffff;
}

.alert-animation {
    animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.elevated-card {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.card-animation {
    transition: transform 0.3s ease;
}
.v-card-text {
    background: #d8588c;
    color: #e9e6e6;
}

.card-animation:hover {
    transform: scale(1.03);
}

.ranking-container {
    position: absolute;
    top: 20px;
    left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.ranking-avatar {
    margin-bottom: 8px;
}

.ranking-label {
    font-size: 14px;
    color: #ffffff;
}

.loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Full viewport height */
}
.admin-card {
    padding: 68px;
    background-color: #2196f333;
}
.right {
    width: 90% !important;
    margin: 10px auto;
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
    }
    .v-breadcrumbs {
        padding: 16px 0;
    }
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
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
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
.title {
    padding: 20px 20px 0;
    position: relative;
    margin-bottom: 20px;
    font-size: 23px;
    & > svg {
        cursor: pointer;
        padding: 10px;
        color: var(--main-color);
        font-size: 20px;
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
.Body {
    margin-top: 10px;
    & > .v-input {
        width: calc(100% - 20px);
        margin: 0px auto;
        padding: 0 20px 10px;
    }
    .Btn {
        padding: 0 20px 20px;
        width: calc(100% - 20px);
        text-align: center;
        margin: auto;
        div {
            background: var(--main-color);
            color: #fff;
            font-size: 18px;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
        }
    }
}
ul.show_details {
    color: var(--therd-color);
    font-weight: bold;
    font-size: 16px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    li {
        list-style-type: square;
        list-style-position: inside;
        background: var(--secound-color);
        padding: 10px;
        border-radius: 5px;
    }
}
.boxes {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    .box {
        width: 100%;
        border-radius: 5px;
        border: 1px solid var(--secound-color);
        box-shadow: 0 0 3px #ddd;
        padding: 20px;
        flex-grow: 1;

        .top {
            display: flex;
            align-items: center;
            gap: 10px;
            justify-content: space-between;
            margin-bottom: 20px;
            & > div {
                box-shadow: 0 0 10px #ddd;
                border-radius: 5px;
                width: 48%;
                padding: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 5px;
                height: 140px;
                justify-content: space-around;
                .number {
                    font-size: 35px;
                    color: var(--main-color);
                    font-weight: bold;
                }
                .ranking {
                    color: var(--therd-color);
                    font-weight: bold;
                }
            }
        }
        .bottom {
            & > div {
                background: var(--secound-color);
                padding: 10px;
                border-radius: 5px;
                color: var(--main-color);
                font-weight: bold;
                margin: 10px 0 0;
                font-size: 18px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }
    }
}
.Msg {
    background: var(--pink-color);
    color: #fff;
    font-weight: bold;
    text-align: center;
    padding: 10px;
    border-radius: 5px;
    transition: 0.5s;
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
        justify-content: space-between;
    }
    .boxes {
        .box {
            width: 48%;
        }
    }
}
img {
    width: 35px;
    cursor: pointer;
}
img.pluse {
    width: 40px;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
}
.visible {
    opacity: 0;
    animation: fadeIn 1s ease-in-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
