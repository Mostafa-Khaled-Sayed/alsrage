<template>
    <div>
        <!-- Main Dialog -->
        <v-dialog
            v-model="subjectDialogVisible"
            max-width="90%"
            @click:outside="closeSubjectDialog"
        >
            <v-card style="padding: 30px">
                <div class="header">
                    <v-card-title>
                        <span class="headline">إضافة ماده</span>
                    </v-card-title>
                    <v-btn color="blue" @click="openAddSubjectDialog">
                        إضافة ماده
                    </v-btn>
                </div>
                <v-card-text>
                    <v-row>
                        <v-col v-if="subjects.length === 0">
                            <Empty_error text="لا يوجد مواد." />
                        </v-col>
                        <v-col
                            v-else
                            v-for="(sub, index) in subjects"
                            :key="sub.id"
                            cols="12"
                            md="4"
                        >
                            <v-alert
                                v-model="sub.show"
                                type="info"
                                class="pa-3 mb-3 notification-card"
                                border="left"
                                colored-border
                                @click.stop="toggleAlertVisibility(sub.id)"
                            >
                                <div
                                    class="d-flex justify-space-between align-center"
                                >
                                    <span>{{ sub.title }}</span>
                                    <div>
                                        <v-icon
                                            small
                                            color="white"
                                            class="mr-2"
                                            @click.stop="
                                                openEditSubjectDialog(
                                                    sub.id,
                                                    index
                                                )
                                            "
                                        >
                                            mdi-pencil
                                        </v-icon>
                                        <v-icon
                                            small
                                            color="white"
                                            class="mr-2"
                                            @click.stop="deleteSubject(sub.id)"
                                        >
                                            mdi-delete
                                        </v-icon>
                                    </div>
                                </div>
                                <div
                                    class="flex justify-space-between align-space-between"
                                >
                                    <span>{{ sub.maxNumber }}</span>
                                    <span>{{ sub.minNumber }}</span>
                                </div>
                            </v-alert>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="red" @click="closeSubjectDialog">إلغاء</v-btn>
                </v-card-actions>

                <!-- Add Subject Dialog -->
                <v-dialog
                    v-model="addSubjectDialogVisible"
                    max-width="500px"
                    @click:outside="closeAddSubjectDialog"
                >
                    <v-card>
                        <v-card-title>
                            <span class="headline">إضافة ماده جديدة</span>
                        </v-card-title>
                        <v-card-text>
                            <v-form ref="addForm" v-model="addSubjectForm">
                                <v-text-field
                                    v-model="newSubject.title"
                                    label="عنوان الماده"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    v-model="newSubject.maxNumber"
                                    label="الدرجه العظمه"
                                    type="number"
                                    min="0"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    v-model="newSubject.minNumber"
                                    label="الدرجه الصغره"
                                    type="number"
                                    min="0"
                                    required
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="closeAddSubjectDialog"
                                >إلغاء</v-btn
                            >
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="addSubject"
                                >حفظ</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <!-- Edit Subject Dialog -->
                <v-dialog
                    v-model="editSubjectDialogVisible"
                    max-width="500px"
                    @click:outside="closeEditSubjectDialog"
                >
                    <v-card>
                        <v-card-title>
                            <span class="headline">تعديل الماده</span>
                        </v-card-title>
                        <v-card-text>
                            <v-form ref="editForm" v-model="editSubjectForm">
                                <v-text-field
                                    v-model="editedSubject.title"
                                    label="عنوان الماده"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    type="number"
                                    min="0"
                                    v-model="editedSubject.maxNumber"
                                    label="القيمه العظمه"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    type="number"
                                    min="0"
                                    v-model="editedSubject.minNumber"
                                    label="القيمه الصغره"
                                    required
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="closeEditSubjectDialog"
                                >إلغاء</v-btn
                            >
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="saveSubjectEdit"
                                >حفظ</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card>
            <confirm_message2
                v-model="showSnackbar"
                :text="confirmationText"
                :snackbar="showSnackbar"
                @close-snackbar="showSnackbar = false"
            />
        </v-dialog>
    </div>
</template>

<script>
import confirm_message2 from "@/components/confirm_message2.vue";
import Empty_error from "@/components/Empty_error.vue";
import { db } from "@/Firebase";
import { useVuelidate } from "@vuelidate/core";
import { minValue, required } from "@vuelidate/validators";
import {
    where,
    collection,
    query,
    getDocs,
    writeBatch,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export default {
    components: {
        confirm_message2,
        Empty_error,
    },
    props: ["localSubject"],
    data() {
        return {
            v$: useVuelidate(),
            gradeId: this.$route.params.year,
            subjectDialogVisible: false,
            addSubjectDialogVisible: false,
            editSubjectDialogVisible: false,
            newSubject: { title: "", maxNumber: 100, minNumber: 0 },
            editedSubject: {},
            subjects: [],
            addSubjectForm: {},
            editSubjectForm: {},
            showSnackbar: false,
        };
    },
    validations() {
        return this.currentValidation;
    },
    computed: {
        currentValidation() {
            if (this.editSubjectDialogVisible) {
                return {
                    editedSubject: {
                        title: { required },
                        maxNumber: { required, minValue: minValue(0) },
                        minNumber: { required, minValue: minValue(0) },
                    },
                };
            } else {
                return {
                    newSubject: {
                        title: { required },
                        maxNumber: { required, minValue: minValue(0) },
                        minNumber: { required, minValue: minValue(0) },
                    },
                };
            }
        },
    },
    watch: {
        localSubject(newVal) {
            this.subjectDialogVisible = newVal;
        },
    },
    methods: {
        openAddSubjectDialog() {
            this.addSubjectDialogVisible = true;
        },
        closeAddSubjectDialog() {
            this.addSubjectDialogVisible = false;
        },
        openEditSubjectDialog(subjectId, index) {
            this.editedSubject = { ...this.subjects[index] };
            this.editSubjectDialogVisible = true;
        },
        closeEditSubjectDialog() {
            this.editSubjectDialogVisible = false;
        },
        async addSubject() {
            this.v$.$validate();
            if (this.v$.$error) return;

            const newSubject = { ...this.newSubject, id: uuidv4(), show: true };

            try {
                const classRoomsRef = collection(db, "class_rooms");
                const q = query(
                    classRoomsRef,
                    where("grade", "==", this.gradeId)
                );
                const querySnapshot = await getDocs(q);
                const batch = writeBatch(db);

                querySnapshot.forEach((doc) => {
                    const subjects = doc.data().subjects || [];
                    subjects.push(newSubject);
                    batch.update(doc.ref, { subjects });
                });

                await batch.commit();
                this.confirmationText = "تم إضافة ماده بنجاح";
                this.showSnackbar = true;
                await this.fetchGradeData(); // Refresh the data after adding
                this.closeAddSubjectDialog();
            } catch (error) {
                console.error("Error updating documents: ", error);
            }
        },
        async saveSubjectEdit() {
            this.v$.$validate();
            if (this.v$.$error) return;

            try {
                const classRoomsRef = collection(db, "class_rooms");
                const q = query(
                    classRoomsRef,
                    where("grade", "==", this.gradeId)
                );
                const querySnapshot = await getDocs(q);
                const batch = writeBatch(db);

                querySnapshot.forEach((doc) => {
                    const subjects = doc.data().subjects || [];
                    const index = subjects.findIndex(
                        (subject) => subject.id === this.editedSubject.id
                    );
                    if (index !== -1) {
                        subjects[index] = this.editedSubject;
                        batch.update(doc.ref, { subjects });
                    }
                });

                await batch.commit();
                this.confirmationText = "تم تعديل الماده بنجاح";
                this.showSnackbar = true;
                await this.fetchGradeData(); // Refresh the data after editing
                this.closeEditSubjectDialog();
            } catch (error) {
                console.error("Error updating documents: ", error);
            }
        },
        async deleteSubject(subjectId) {
            try {
                const classRoomsRef = collection(db, "class_rooms");
                const q = query(
                    classRoomsRef,
                    where("grade", "==", this.gradeId)
                );
                const querySnapshot = await getDocs(q);
                const batch = writeBatch(db);

                querySnapshot.forEach((doc) => {
                    let subjects = doc.data().subjects || [];
                    subjects = subjects.filter(
                        (subject) => subject.id !== subjectId
                    );
                    batch.update(doc.ref, { subjects });
                });

                await batch.commit();
                this.confirmationText = "تم حذف الماده بنجاح";
                this.showSnackbar = true;
                await this.fetchGradeData(); // Refresh the data after deletion
            } catch (error) {
                console.error("Error deleting document: ", error);
            }
        },
        async fetchGradeData() {
            try {
                const classRoomsRef = collection(db, "class_rooms");
                const q = query(
                    classRoomsRef,
                    where("grade", "==", this.gradeId)
                );
                const querySnapshot = await getDocs(q);
                const data = [];

                querySnapshot.forEach((doc) => {
                    const subjects = doc.data().subjects || [];
                    subjects.forEach((subject) => data.push(subject));
                });

                this.subjects = data;
            } catch (error) {
                console.error("Error fetching grade data: ", error);
            }
        },
        toggleAlertVisibility(subjectId) {
            const subject = this.subjects.find((sub) => sub.id === subjectId);
            if (subject) {
                subject.show = !subject.show; // Toggle visibility
            }
        },
    },
    mounted() {
        this.fetchGradeData();
    },
};
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.notification-card {
    cursor: pointer;
    transition: background-color 0.3s ease;
}
.notification-card:hover {
    background-color: #f0f0f0;
}
.notification-card .v-icon {
    cursor: pointer;
    transition: color 0.3s ease;
}
.notification-card .v-icon:hover {
    color: #2196f3;
}
</style>
