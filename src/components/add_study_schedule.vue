<template>
    <v-dialog v-model="showDialog" max-width="90%">
        <v-card style="padding: 15px">
            <v-card-title
                class="headline"
                style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                "
            >
                إضافة جدول دراسي
                <v-spacer></v-spacer>
                <v-btn
                    :disabled="!changesMade"
                    color="green darken-1"
                    @click="saveSchedule"
                >
                    حفظ التعديلات
                </v-btn>
            </v-card-title>
            <v-card-text>
                <div style="padding: 20px">
                    <v-select
                        v-model="selectedClass"
                        :items="classes"
                        label="اختر الفصل"
                        @blur="fetchScheduleId"
                        required
                    ></v-select>
                    <v-select
                        v-model="selectedSection"
                        :items="sections"
                        label="اختر القسم"
                        @blur="fetchScheduleId"
                        required
                    ></v-select>
                    <v-card flat>
                        <div class="table">
                            <v-table>
                                <thead>
                                    <tr>
                                        <th>اليوم الدراسي</th>
                                        <th>الفترة الأولى</th>
                                        <th>الفترة الثانية</th>
                                        <th>الفترة الثالثة</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(
                                            degree, index
                                        ) in Results.schedule"
                                        :key="index"
                                    >
                                        <td>{{ degree.Subject_Name }}</td>
                                        <td>
                                            <v-text-field
                                                v-model="degree.Minor_degree"
                                                style="text-align: center"
                                                @input="handleInputChange"
                                                required
                                            ></v-text-field>
                                        </td>
                                        <td>
                                            <v-text-field
                                                v-model="degree.Major_degree"
                                                style="text-align: center"
                                                @input="handleInputChange"
                                                required
                                            ></v-text-field>
                                        </td>
                                        <td>
                                            <v-text-field
                                                v-model="degree.Student_degree"
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
                <div style="padding: 20px; text-align: right">
                    <p>آخر تعديل: {{ lastModified }}</p>
                </div>
            </v-card-text>
        </v-card>
        <confirm_message2
            v-model="showSnackbar"
            :text="confirmationText"
            :snackbar="showSnackbar"
            @close-snackbar="showSnackbar = false"
        />
    </v-dialog>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    getDocs,
    Timestamp,
    query,
    collection,
    where,
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
import confirm_message2 from "@/components/confirm_message2.vue";

export { db, storage };

export default {
    components: {
        confirm_message2,
    },
    props: {
        year: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            showDialog: false,
            changesMade: false,
            confirmationText: "",
            selectedClass: null, // تعيين القيمة الافتراضية لاحقًا
            selectedSection: null, // تعيين القيمة الافتراضية لاحقًا
            showSnackbar: false,
            classes: ["1/1", "1/2", "2/1", "2/2", "3/1", "3/2"],
            sections: ["عربي", "لغات"],
            Results: {
                educational_level: "",
                classes: ["1/1", "1/2", "2/1", "2/2", "3/1", "3/2"],
                sections: ["عربي", "لغات"],
                schedule: [
                    {
                        Subject_Name: "السبت",
                        Minor_degree: "",
                        Major_degree: "",
                        Student_degree: "",
                    },
                    {
                        Subject_Name: "الاحد",
                        Minor_degree: "",
                        Major_degree: "",
                        Student_degree: "",
                    },
                    {
                        Subject_Name: "الاثنين ",
                        Minor_degree: "",
                        Major_degree: "",
                        Student_degree: "",
                    },
                    {
                        Subject_Name: "الثلاثاء",
                        Minor_degree: "",
                        Major_degree: "",
                        Student_degree: "",
                    },
                    {
                        Subject_Name: "الاربعاء",
                        Minor_degree: "",
                        Major_degree: "",
                        Student_degree: "",
                    },
                    {
                        Subject_Name: "الخميس",
                        Minor_degree: "",
                        Major_degree: "",
                        Student_degree: "",
                    },
                ],
            },
            lastModified: "لم يتم التعديل بعد",
            scheduleId: null, // هنا لتخزين معرّف الجدول
        };
    },
    methods: {
        handleCloseSnackbar() {
            this.showSnackbar = false; // تحديث حالة الرسالة في المكون الأم
        },
        async loadSchedule() {
            if (!this.selectedClass || !this.selectedSection) return;

            try {
                this.changesMade = false;
                this.lastModified = "لم يتم التعديل بعد";

                const docRef = doc(db, "studySchedule", this.scheduleId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    this.Results.schedule =
                        data.schedule || this.Results.schedule;
                    this.lastModified = data.lastModified
                        ? data.lastModified.toDate().toLocaleString()
                        : "لم يتم التعديل بعد";
                }
            } catch (error) {
                console.error("Error getting document: ", error);
            }
        },
        async saveSchedule() {
            if (!this.selectedClass || !this.selectedSection) return;

            try {
                const docRef = doc(db, "studySchedule", this.scheduleId);
                const docSnap = await getDoc(docRef);

                const isNew = !docSnap.exists();

                await setDoc(
                    docRef,
                    {
                        class: this.selectedClass,
                        section: this.selectedSection,
                        educational_level: this.year,
                        schedule: this.Results.schedule,
                        lastModified: Timestamp.now(),
                    },
                    { merge: true }
                );

                this.changesMade = false;
                this.lastModified = new Date().toLocaleString();
                this.closeDialog();

                if (isNew) {
                    this.confirmationText = `تم إضافة جدول دراسي جديد للفصل ${this.selectedClass} للقسم ${this.selectedSection} للسنة الدراسية ${this.year}`;
                } else {
                    this.confirmationText = "تم تعديل الجدول";
                }
                this.showSnackbar = true;
            } catch (error) {
                console.error("Error updating document: ", error);
            }
        },
        async fetchScheduleId() {
            if (!this.selectedClass || !this.selectedSection) return;

            try {
                const querySnapshot = await getDocs(
                    query(
                        collection(db, "studySchedule"),
                        where("class", "==", this.selectedClass),
                        where("section", "==", this.selectedSection),
                        where("educational_level", "==", this.year)
                    )
                );

                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0];
                    this.scheduleId = doc.id;
                    this.loadSchedule(); // تحميل البيانات الحالية
                } else {
                    this.scheduleId = uuidv4();
                    this.Results.schedule = [
                        {
                            Subject_Name: "السبت",
                            Minor_degree: "",
                            Major_degree: "",
                            Student_degree: "",
                        },
                        {
                            Subject_Name: "الأحد",
                            Minor_degree: "",
                            Major_degree: "",
                            Student_degree: "",
                        },
                        {
                            Subject_Name: "الإثنين",
                            Minor_degree: "",
                            Major_degree: "",
                            Student_degree: "",
                        },
                        {
                            Subject_Name: "الثلاثاء",
                            Minor_degree: "",
                            Major_degree: "",
                            Student_degree: "",
                        },
                        {
                            Subject_Name: "الأربعاء",
                            Minor_degree: "",
                            Major_degree: "",
                            Student_degree: "",
                        },
                        {
                            Subject_Name: "الخميس",
                            Minor_degree: "",
                            Major_degree: "",
                            Student_degree: "",
                        },
                    ];
                }
            } catch (error) {
                console.error("Error fetching schedule ID: ", error);
            }
        },
        closeDialog() {
            this.showDialog = false;
        },
        handleInputChange() {
            this.changesMade = true;
        },
    },
    watch: {
        showDialog(val) {
            if (val) {
                // تعيين القيم الافتراضية عند فتح الحوار
                this.selectedClass = "1/1";
                this.selectedSection = "عربي";
                this.fetchScheduleId(); // قم بتحديث الجدول عند فتح الحوار
            }
        },
    },
    mounted() {
        console.log(this.year);
    },
};
</script>

<style scoped lang="scss"></style>
