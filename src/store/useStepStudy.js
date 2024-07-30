import { defineStore } from "pinia";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/Firebase";

export const useStepStudy = defineStore("stepStudy", {
    state: () => ({
        school: {
            stepStudy: [
                {
                    name: "رياض الأطفال",
                    grades: ["الصف الأول", "الصف الثاني"],
                },
                {
                    name: "المرحلة الابتدائية",
                    grades: [
                        "الصف الأول الابتدائي",
                        "الصف الثاني الابتدائي",
                        "الصف الثالث الابتدائي",
                        "الصف الرابع الابتدائي",
                        "الصف الخامس الابتدائي",
                        "الصف السادس الابتدائي",
                    ],
                },
                {
                    name: "المرحلة الإعدادية",
                    grades: [
                        "الصف الأول الإعدادي",
                        "الصف الثاني الإعدادي",
                        "الصف الثالث الإعدادي",
                    ],
                },
                {
                    name: "المرحلة الثانوية",
                    grades: [
                        "الصف الأول الثانوي",
                        "الصف الثاني الثانوي",
                        "الصف الثالث الثانوي",
                    ],
                },
            ],
        },
        subjects: {}, // Placeholder for subjects by stage
        classRoomsData: [],
    }),
    actions: {
        getSteps() {
            return this.school.stepStudy;
        },
        getGradesForStage(stageName) {
            const stage = this.school.stepStudy.find(
                (s) => s.name === stageName
            );
            return stage ? stage.grades : [];
        },
        async fetchAllClassRooms() {
            try {
                const q = collection(db, "class_rooms");
                const querySnapshot = await getDocs(q);
                const classRooms = [];

                querySnapshot.forEach((doc) => {
                    classRooms.push({ id: doc.id, ...doc.data() });
                });

                this.classRoomsData.push(classRooms);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        },
        getClassRooms() {
            return this.classRoomsData;
        },
        getSubjectsByStage(stageValue) {
            return this.subjects[stageValue] || [];
        },
    },
});
