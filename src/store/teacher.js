// store/teacher.js
import { defineStore } from "pinia";
import { initializeApp } from "@firebase/app";
import {
    getFirestore,
    collection,
    addDoc,
    doc,
    deleteDoc,
    updateDoc,
    getDocs,
} from "@firebase/firestore";
import { useSecureDataStore } from "./secureData";

const firebaseConfig = {
    apiKey: "AIzaSyBdk3sqIHjXvB2C-O-lvkRgMFpg8pemkno",
    authDomain: "alseraj--almoner.firebaseapp.com",
    projectId: "alseraj--almoner",
    storageBucket: "alseraj--almoner.appspot.com",
    messagingSenderId: "462211256149",
    appId: "1:462211256149:web:a03ace3c70b306620169dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const useTeacher = defineStore("teacher", {
    state: () => ({
        dialog: false,
        dialog_1: false,
        dialog_3: false,
        empty: false,
        snackbar: false,
        snackbar2: false,
        snackbar3: false,
        text12: "تم التعديل بنجاح",
        text10: "تم الإضافة بنجاح",
        text11: "تم الحذف بنجاح",
        user: {
            name: "",
            email: "",
            password: "",
            id: "",
            selectedSubject: [],
            selectedGrade: [],
            selectedStage: [],
        },
        users: [],
        loading: false,
        loading1: false,
        showPassword: false,
        name: "",
        email: "",
        password: "",
        id: "",
        selectedSubject: [],
        selectedGrade: [],
        selectedStage: [],
    }),
    actions: {
        toggleShowPassword() {
            this.showPassword = !this.showPassword;
        },
        generateRandomPassword() {
            const characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let password = "";
            for (let i = 0; i < 8; i++) {
                password += characters.charAt(
                    Math.floor(Math.random() * characters.length)
                );
            }
            this.user.password = password;
            return this.user.password;
        },
        user_Information(userId) {
            this.user = this.users.find((user) => user.id === userId);
        },
        async addTeacher() {
            try {
                const secureDataStore = useSecureDataStore();
                this.loading = true;
                const docRef = await addDoc(collection(db, "teachers"), {
                    name: secureDataStore.encryptData(this.user.name, "12345a"),
                    email: secureDataStore.encryptData(
                        this.user.email,
                        "12345a"
                    ),
                    password: this.user.password,
                    subject: this.user.subject,
                });
                await updateDoc(docRef, { id: docRef.id });
                console.log("Document written with ID: ", docRef.id);
                this.getData();
                this.snackbar = true;
                this.dialog = false;
                this.loading = false;
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },
        async getData() {
            try {
                const secureDataStore = useSecureDataStore();
                this.loading1 = true;
                this.users = [];
                const querySnapshot = await getDocs(collection(db, "teachers"));
                querySnapshot.forEach((doc) => {
                    if (doc.data().userType === "teacher") {
                        const userData = {
                            id: doc.id,
                            email: secureDataStore.decryptData(
                                doc.data().email,
                                "12345a"
                            ),
                            name: secureDataStore.decryptData(
                                doc.data().name,
                                "12345a"
                            ),
                            userType: doc.data().expectedUserType,
                            password: doc.data().password,
                            subject: doc.data().subject,
                        };
                        this.users.push(userData);
                    }
                });
                this.empty = this.users.length === 0;
                this.loading1 = false;
            } catch (error) {
                console.error("Error retrieving data: ", error);
            }
        },
        async deleteUser(userId) {
            try {
                console.log("Deleting user from Firestore:", userId);
                await deleteDoc(doc(db, "teachers", userId));
                this.users = this.users.filter((user) => user.id !== userId);
                console.log("User deleted successfully from users array");
                this.getData();
                this.snackbar2 = true;
                this.dialog_3 = false;
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        },
        setUserInformation(user) {
            this.nameInformation = user.name;
            this.IdInformation = user.id;
            this.emailInformation = user.email;
            this.subjectInformation = user.subject;
        },
        async updateTeacher(userId) {
            try {
                const secureDataStore = useSecureDataStore();
                this.loading = true;
                const docRef = doc(db, "teachers", userId);
                await updateDoc(docRef, {
                    name: secureDataStore.encryptData(
                        this.nameInformation,
                        "12345a"
                    ),
                    email: secureDataStore.encryptData(
                        this.emailInformation,
                        "12345a"
                    ),
                    subject: this.subjectInformation,
                });
                this.getData();
                this.loading = false;
                this.snackbar3 = true;
                this.dialog_1 = false;
            } catch (error) {
                console.error("Error updating user:", error);
            }
        },
    },
});
