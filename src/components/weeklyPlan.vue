<template>
    <v-dialog v-model="showDialog2" max-width="90%">
        <v-card style="padding: 15px; min-height: 400px">
            <v-card-title
                class="headline"
                style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                "
            >
                الخطط الأسبوعية
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" @click="showAddWeeklyPlanDialog">
                    إضافة خطة أسبوعية
                </v-btn>
            </v-card-title>
            <v-row>
                <v-col
                    style="margin-top: 100px"
                    v-if="filteredWeeklyPlans.length === 0"
                >
                    <Empty_error text="لا يوجد خطط اسبوعيه." />
                </v-col>
                <v-col
                    v-else
                    cols="4"
                    v-for="(plan, index) in filteredWeeklyPlans"
                    :key="index"
                >
                    <v-card
                        class="my-2"
                        color="info"
                        style="width: 100%; padding: 20px; text-align: center"
                    >
                        <v-card-title class="mb-5">
                            الخطه الاسبوعيه
                            <v-spacer></v-spacer>
                        </v-card-title>
                        <div
                            style="
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                margin-bottom: 24px;
                                font-size: 22px;
                            "
                        >
                            <p>{{ selectedYear }}</p>
                            <p>{{ plan.class }}</p>
                            <p>{{ plan.section }}</p>
                        </div>
                        <div
                            style="
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                font-size: 22px;
                            "
                        >
                            <v-icon
                                @click="showDetailsDialog(plan)"
                                class="mr-2"
                                >mdi-eye</v-icon
                            >
                            <v-icon @click="deletePlan(plan.id)"
                                >mdi-delete</v-icon
                            >
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
        <v-dialog v-model="showAddWeeklyPlan" max-width="90%">
            <v-card>
                <v-card-title
                    class="headline"
                    style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 20px;
                    "
                >
                    إضافة خطة أسبوعية جديدة
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" @click="addWeeklyPlan">
                        إضافة
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-select
                        v-model="selectedClass"
                        :items="classes"
                        label="اختر الفصل"
                        @change="loadScheduleForClass"
                    >
                    </v-select>
                    <v-select
                        v-model="selectedSection"
                        :items="sections"
                        label="اختر القسم"
                        @change="loadScheduleForClass"
                    >
                    </v-select>
                    <div class="table">
                        <v-table>
                            <thead>
                                <tr>
                                    <th>اليوم الدراسي</th>
                                    <th>الفتره الأولى</th>
                                    <th>الفتره الثانية</th>
                                    <th>الفتره الثالثة</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(plan, index) in daysOfWeek"
                                    :key="index"
                                >
                                    <td>{{ plan.day }}</td>
                                    <td>
                                        <v-text-field
                                            v-model="plan.minor_degree"
                                            style="text-align: center"
                                            @input="handleInputChange"
                                            required
                                        ></v-text-field>
                                    </td>
                                    <td>
                                        <v-text-field
                                            v-model="plan.major_degree"
                                            style="text-align: center"
                                            @input="handleInputChange"
                                            required
                                        ></v-text-field>
                                    </td>
                                    <td>
                                        <v-text-field
                                            v-model="plan.student_degree"
                                            style="text-align: center"
                                            @input="handleInputChange"
                                            required
                                        ></v-text-field>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="grey darken-1"
                        text
                        @click="closeAddWeeklyPlanDialog"
                    >
                        إلغاء
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="showDetails6" max-width="90%">
            <v-card style="padding: 15px">
                <v-card-title
                    class="headline"
                    style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    "
                >
                    تفاصيل الخطة
                    <v-spacer></v-spacer>
                    <v-btn
                        :disabled="!changesMade"
                        color="green darken-1"
                        @click="saveDetails"
                    >
                        حفظ التعديلات
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <div style="padding: 20px">
                        <div style="text-align: right; font-size: 24px">
                            <p>
                                المرحله الدراسيه:
                                <span
                                    style="color: rgb(33, 150, 243) !important"
                                    >{{ year }}</span
                                >
                            </p>
                            <p>
                                الفصل:
                                <span
                                    style="color: rgb(33, 150, 243) !important"
                                    >{{ selectedPlan.class }}</span
                                >
                            </p>
                            <p>
                                القسم:
                                <span
                                    style="color: rgb(33, 150, 243) !important"
                                    >{{ selectedPlan.section }}</span
                                >
                            </p>
                        </div>
                        <v-card flat>
                            <div class="table">
                                <v-table>
                                    <thead>
                                        <tr>
                                            <th>اليوم الدراسي</th>
                                            <th>الفتره الأولى</th>
                                            <th>الفتره الثانية</th>
                                            <th>الفتره الثالثة</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="(
                                                degree, index
                                            ) in selectedPlan.days"
                                            :key="index"
                                        >
                                            <td>{{ degree.day }}</td>
                                            <td>
                                                <v-text-field
                                                    v-model="
                                                        degree.minor_degree
                                                    "
                                                    style="text-align: center"
                                                    @input="handleInputChange"
                                                    required
                                                ></v-text-field>
                                            </td>
                                            <td>
                                                <v-text-field
                                                    v-model="
                                                        degree.major_degree
                                                    "
                                                    style="text-align: center"
                                                    @input="handleInputChange"
                                                    required
                                                ></v-text-field>
                                            </td>
                                            <td>
                                                <v-text-field
                                                    v-model="
                                                        degree.student_degree
                                                    "
                                                    style="text-align: center"
                                                    @input="handleInputChange"
                                                    required
                                                ></v-text-field>
                                            </td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </div>
                        </v-card>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="grey darken-1"
                        text
                        @click="closeDetailsDialog"
                    >
                        إلغاء
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <confirm_message2
            v-model="showSnackbar"
            :text="confirmationText"
            :snackbar="showSnackbar"
            @close-snackbar="showSnackbar = false"
        />
    </v-dialog>
</template>

<script>
import confirm_message2 from "@/components/confirm_message2.vue";
import Empty_error from "@/components/Empty_error.vue";

import {
    getFirestore,
    doc,
    setDoc,
    getDocs,
    // Timestamp,
    collection,
    addDoc,
    deleteDoc,
    getDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "@firebase/app";

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
    components: {
        confirm_message2,
        Empty_error,
    },
    props: {
        year: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            showDetails6: false,
            selectedPlan: {},
            lastModified: "",
            changesMade: false,
            showAddWeeklyPlan: false,
            selectedClass: null,
            selectedSection: null,
            showSnackbar: false,
            confirmationText: "",
            selectedYear: null,
            classes: ["1/1", "1/2", "2/1", "2/2", "3/1", "3/2"],
            sections: ["عربي", "لغات"],
            showDialog2: false,
            newPlanName: "",
            weeklyPlans: [], // Store weekly plans here
            daysOfWeek: [
                {
                    day: "السبت",
                    minor_degree: "",
                    major_degree: "",
                    student_degree: "",
                },
                {
                    day: "الأحد",
                    minor_degree: "",
                    major_degree: "",
                    student_degree: "",
                },
                {
                    day: "الإثنين",
                    minor_degree: "",
                    major_degree: "",
                    student_degree: "",
                },
                {
                    day: "الثلاثاء",
                    minor_degree: "",
                    major_degree: "",
                    student_degree: "",
                },
                {
                    day: "الأربعاء",
                    minor_degree: "",
                    major_degree: "",
                    student_degree: "",
                },
                {
                    day: "الخميس",
                    minor_degree: "",
                    major_degree: "",
                    student_degree: "",
                },
            ],
            years: [2024, 2023, 2022, 2021], // Example years
        };
    },
    async mounted() {
        this.selectedYear = this.year;
        await this.loadWeeklyPlans();
    },
    computed: {
        filteredWeeklyPlans() {
            return this.weeklyPlans.filter(
                (plan) => plan.educational_level === this.selectedYear
            );
        },
    },
    methods: {
        async loadWeeklyPlans() {
            try {
                const querySnapshot = await getDocs(
                    collection(db, "weeklyPlan")
                );
                this.weeklyPlans = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
            } catch (error) {
                console.error("Error getting weekly plans: ", error);
            }
        },
        showAddWeeklyPlanDialog() {
            this.resetForm(); // Reset the form fields when showing the dialog
            this.showAddWeeklyPlan = true;
        },
        async addWeeklyPlan() {
            if (this.selectedClass && this.selectedSection) {
                try {
                    const existingPlanIndex = this.weeklyPlans.findIndex(
                        (plan) =>
                            plan.class === this.selectedClass &&
                            plan.section === this.selectedSection &&
                            plan.educational_level === this.selectedYear
                    );

                    if (existingPlanIndex !== -1) {
                        // Update existing plan
                        const docRef = doc(
                            db,
                            "weeklyPlan",
                            this.weeklyPlans[existingPlanIndex].id
                        );
                        await setDoc(docRef, {
                            ...this.weeklyPlans[existingPlanIndex],
                            days: this.daysOfWeek,
                        });

                        this.weeklyPlans[existingPlanIndex] = {
                            ...this.weeklyPlans[existingPlanIndex],
                            days: this.daysOfWeek,
                        };
                    } else {
                        // Add new plan
                        const newPlan = {
                            class: this.selectedClass,
                            section: this.selectedSection,
                            days: this.daysOfWeek,
                            educational_level: this.selectedYear,
                        };
                        const docRef = await addDoc(
                            collection(db, "weeklyPlan"),
                            newPlan
                        );
                        this.weeklyPlans.push({
                            id: docRef.id,
                            ...newPlan,
                        });
                    }
                    this.confirmationText = "تم اضافه الخطه الاسبوعيه بنجاح";
                    this.showSnackbar = true;
                    this.closeAddWeeklyPlanDialog();
                } catch (error) {
                    console.error("Error adding/updating weekly plan: ", error);
                }
            }
        },
        async deletePlan(id) {
            try {
                await deleteDoc(doc(db, "weeklyPlan", id));
                this.weeklyPlans = this.weeklyPlans.filter(
                    (plan) => plan.id !== id
                );
                this.confirmationText = "تم حذف الخطه الاسبوعيه بنجاح";
                this.showSnackbar = true;
            } catch (error) {
                console.error("Error deleting plan: ", error);
            }
        },
        showDetailsDialog(plan) {
            this.selectedPlan = plan;
            this.showDetails6 = true;
        },
        async saveDetails() {
            try {
                const docRef = doc(db, "weeklyPlan", this.selectedPlan.id);
                await setDoc(docRef, {
                    ...this.selectedPlan,
                });

                this.changesMade = false;
                this.showDetails6 = false;
                this.confirmationText = "تم تعديل الخطه الاسبوعيه بنجاح";
                this.showSnackbar = true;
            } catch (error) {
                console.error("Error updating plan details: ", error);
            }
        },
        closeAddWeeklyPlanDialog() {
            this.showAddWeeklyPlan = false;
        },
        closeDetailsDialog() {
            this.showDetails6 = false;
        },
        handleInputChange() {
            this.changesMade = true;
        },
        async loadScheduleForClass() {
            if (!this.selectedClass || !this.selectedSection) return;
            try {
                const docRef = doc(
                    db,
                    "studySchedule",
                    `${this.selectedClass.replace("/", "-")}_${
                        this.selectedSection
                    }`
                );
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    this.daysOfWeek = data.schedule || [
                        {
                            day: "السبت",
                            minor_degree: "",
                            major_degree: "",
                            student_degree: "",
                        },
                        {
                            day: "الأحد",
                            minor_degree: "",
                            major_degree: "",
                            student_degree: "",
                        },
                        {
                            day: "الإثنين",
                            minor_degree: "",
                            major_degree: "",
                            student_degree: "",
                        },
                        {
                            day: "الثلاثاء",
                            minor_degree: "",
                            major_degree: "",
                            student_degree: "",
                        },
                        {
                            day: "الأربعاء",
                            minor_degree: "",
                            major_degree: "",
                            student_degree: "",
                        },
                        {
                            day: "الخميس",
                            minor_degree: "",
                            major_degree: "",
                            student_degree: "",
                        },
                    ];
                } else {
                    this.resetForm(); // Reset form if no data is found
                }
            } catch (error) {
                console.error("Error getting document: ", error);
            }
        },
        resetForm() {
            this.selectedClass = null;
            this.selectedSection = null;
            this.daysOfWeek = [
                {
                    day: "السبت",
                    minor_degree: "",
                    major_degree: "",
                    student_degree: "",
                },
                {
                    day: "الأحد",
                    minor_degree: "",
                    major_degree: "",
                    student_degree: "",
                },
                {
                    day: "الإثنين",
                    minor_degree: "",
                    major_degree: "",
                    student_degree: "",
                },
                {
                    day: "الثلاثاء",
                    minor_degree: "",
                    major_degree: "",
                    student_degree: "",
                },
                {
                    day: "الأربعاء",
                    minor_degree: "",
                    major_degree: "",
                    student_degree: "",
                },
                {
                    day: "الخميس",
                    minor_degree: "",
                    major_degree: "",
                    student_degree: "",
                },
            ];
        },
    },
};
</script>

<style scoped lang="scss">
/* Add your styles here */
</style>
