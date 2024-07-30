<template>
    <div>
        <!-- Breadcrumbs and filters -->
        <div class="right">
            <v-breadcrumbs class="mt-4 mb-4">
                <v-breadcrumbs-item @click="$router.push('/admin')" link>
                    الإشراف
                </v-breadcrumbs-item>
                <v-breadcrumbs-divider />
                <v-breadcrumbs-item
                    @click="$router.push('/Modifications')"
                    link
                >
                    الإعدادات
                </v-breadcrumbs-item>
            </v-breadcrumbs>
        </div>
        <!-- Title -->
        <v-container class="text-center mb-4">
            <v-row>
                <v-col cols="12">
                    <h1 class="display-1 mt-5" style="color: #336699">
                        لوحة الشرف
                    </h1>
                </v-col>
                <v-col cols="12">
                    <h2 class="subtitle-1 mb-1" style="color: #336699">
                        {{ currentMonth }}
                    </h2>
                </v-col>
            </v-row>
        </v-container>

        <v-container>
            <!-- Show loading indicator if data is being fetched -->

            <v-row class="d-flex flex-wrap justify-center mb-4">
                <v-col cols="12" sm="6" md="4" lg="3" class="mb-2">
                    <v-select
                        :items="educational_level"
                        label="اختر المرحلة الدراسية"
                        v-model="selectedEducationalLevel"
                        class="custom-select"
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="3" class="mb-2">
                    <v-select
                        :items="month"
                        label="اختر الشهر"
                        v-model="selectedMonth"
                        class="custom-select"
                    ></v-select>
                </v-col>

                <!-- More filters toggle -->
                <v-col cols="12" class="mb-2 d-flex justify-center">
                    <button
                        @click="toggleFilters"
                        flat
                        style="
                            color: #336699;
                            font-size: 18px;
                            font-family: 'Cairo', sans-serif;
                        "
                    >
                        {{
                            showMoreFilters ? " تصفيه اقل " : "  تصفية متقدمة  "
                        }}
                    </button>
                </v-col>
                <v-row v-if="isLoading" class="justify-center align-center">
                    <v-col
                        cols="12"
                        class="mt-5 d-flex justify-center text-center"
                    >
                        <v-progress-circular
                            indeterminate
                            color="primary"
                            size="70"
                            class="loading-spinner"
                        ></v-progress-circular>
                    </v-col>
                </v-row>
                <!-- Additional filters -->
                <v-col
                    v-if="showMoreFilters"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                    class="mb-2"
                >
                    <v-select
                        :items="classes"
                        label="اختر الفصل"
                        v-model="selectedClass"
                        class="custom-select"
                    ></v-select>
                </v-col>
                <v-col
                    v-if="showMoreFilters"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                    class="mb-2"
                >
                    <v-select
                        :items="genders"
                        label="اختر الجنس"
                        v-model="selectedGender"
                        class="custom-select"
                    ></v-select>
                </v-col>
                <v-col
                    v-if="showMoreFilters"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                    class="mb-2"
                >
                    <v-select
                        :items="sections"
                        label="اختر القسم"
                        v-model="selectedSection"
                        class="custom-select"
                    ></v-select>
                </v-col>
            </v-row>

            <v-row>
                <!-- Display message if no filters are selected -->
                <v-col
                    v-if="!hasSelectedFilters && !shouldShowResults"
                    cols="12"
                >
                    <v-alert class="alert-animation" type="info">
                        الرجاء اختيار على الاقل المرحلة الدراسية والشهر لعرض
                        النتائج.
                    </v-alert>
                </v-col>

                <!-- Display message if no results with delay -->
                <v-col
                    v-if="
                        showNoResultsAlert &&
                        students.length === 0 &&
                        shouldShowResults
                    "
                    cols="12"
                >
                    <v-alert class="alert-animation" type="info">
                        لا توجد نتائج للعرض بناءً على الفلاتر المحددة.
                    </v-alert>
                </v-col>

                <!-- Display results if available -->
                <template v-if="shouldShowResults && students.length > 0">
                    <v-col
                        v-for="(student, index) in students
                            .slice()
                            .sort((a, b) => b.totalDegree - a.totalDegree)"
                        :key="student.id"
                        cols="12"
                        md="4"
                    >
                        <v-card class="mb-4 elevated-card card-animation">
                            <v-responsive class="position-relative">
                                <v-img
                                    :src="student.photos[0]"
                                    height="200px"
                                    class="white--text"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                >
                                    <v-card-title class="headline">
                                        {{ student.student_name }}
                                    </v-card-title>
                                </v-img>
                                <div class="ranking-container">
                                    <v-avatar
                                        size="56"
                                        color="#d8588c"
                                        class="ranking-avatar"
                                    >
                                        <span class="white--text headline">
                                            {{ index + 1 }}
                                        </span>
                                    </v-avatar>
                                    <div class="ranking-label">الترتيب</div>
                                    <v-chip
                                        class="font-weight-bold"
                                        color="primary"
                                        large
                                    >
                                        {{ student.totalDegree }}
                                    </v-chip>
                                </div>
                            </v-responsive>

                            <v-card-text>
                                <div class="text-center mt-2"></div>
                                <div>القسم: {{ student.section }}</div>
                                <div>
                                    المرحلة الدراسية:
                                    {{ student.educational_level }}
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </template>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import { db } from "../Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default {
    data() {
        return {
            students: [],
            selectedEducationalLevel: null,
            selectedClass: null,
            selectedGender: null,
            selectedSection: null,
            selectedMonth: null,
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
            genders: ["ذكر", "انثي"],
            sections: ["عربي", "لغات"],
            month: ["شهر يناير", "شهر فبراير", "شهر مارس", "شهر ابريل"],
            showMoreFilters: false,
            showNoResultsAlert: false,
            alertTimeout: null,
            isLoading: false, // Add isLoading state
        };
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
    },
    watch: {
        selectedEducationalLevel() {
            this.fetchStudents();
        },
        selectedClass() {
            this.fetchStudents();
        },
        selectedGender() {
            this.fetchStudents();
        },
        selectedSection() {
            this.fetchStudents();
        },
        selectedMonth() {
            this.fetchStudents();
        },
    },
    methods: {
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
                                studentData.totalDegree = totalDegree;
                            } else {
                                studentData.totalDegree = 0;
                            }
                        } else {
                            studentData.totalDegree = 0;
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
                    }, 2000);
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

<style scoped>
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
.right {
    width: 90% !important;
    height: 60px;
    margin: auto;
    font-weight: bold;
    font-size: 20px;
    color: #336699;
    padding-top: 20px;
}
.loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Full viewport height */
}
</style>
