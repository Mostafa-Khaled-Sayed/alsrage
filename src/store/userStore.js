import { defineStore } from "pinia";
import Cookies from "js-cookie";
/*import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, getDocs, collection } from "@firebase/firestore";
//import { useSecureDataStore } from "./secureData";
const firebaseConfig = {
    // Firebase configuration object
    apiKey: "AIzaSyBdk3sqIHjXvB2C-O-lvkRgMFpg8pemkno",
    authDomain: "alseraj--almoner.firebaseapp.com",
    projectId: "alseraj--almoner",
    storageBucket: "alseraj--almoner.appspot.com",
    messagingSenderId: "462211256149",
    appId: "1:462211256149:web:a03ace3c70b306620169dc",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);*/
export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: {
            id: "",
            National_id: "",
            password: "",
            userType: "",
            roles: [],
        },
        loading: false,
        error: null,
    }),
    actions: {
        /* async Check_User() {
            const userId = Cookies.get("user");
            console.log(userId);
            if (userId) {
                const docRef = doc(db, "users", JSON.parse(userId)); // Parse userId to ensure it's in correct format
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    this.user = docSnap.data();
                    if (this.user.type === "admin") {
                        this.user.expectedUserType = "admin";
                    } else if (this.user.type === "parent") {
                        this.user.expectedUserType = "parent";
                    }
                } else {
                    console.log("No such document!");
                }
            }
        },
        async Sing_In(email, password) {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                if (
                    doc.data().email === email &&
                    doc.data().password === password
                ) {
                    this.user = { email, password };
                    Cookies.set("user", JSON.stringify(this.user), {
                        expires: 7,
                    });
                    localStorage.setItem("user", doc.id);
                    setTimeout(() => {
                        this.Check_User();
                    }, 100);
                }
            });
        },*/
        get_Cookies() {
            // Retrieve the cookie value
            const user_data = Cookies.get("user");

            // Check if user_data is not null or undefined
            if (user_data) {
                try {
                    // Attempt to parse the JSON string
                    this.user = JSON.parse(user_data);
                } catch (error) {
                    console.error(
                        "Failed to parse user data from cookies:",
                        error
                    );
                    // Handle the error as needed, for example, set `this.user` to a default value or an empty object
                    this.user = {
                        id: "",
                        National_id: "",
                        password: "",
                        userType: "",
                        roles: [],
                    };
                }
            } else {
                // Handle cases where the cookie does not exist or is empty
                this.user = {
                    id: "",
                    National_id: "",
                    password: "",
                    userType: "",
                    roles: [],
                };
            }
        },
        async login(id, National_id, userType, roles, name) {
            this.loading = true;
            try {
                // تحقق من البريد الإلكتروني وكلمة المرور

                this.user = { id, National_id, userType, roles, name };
                this.error = null;
                // تخزين بيانات المستخدم في الكوكيز
                Cookies.set("user", JSON.stringify(this.user), {
                    expires: 7,
                });
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        logout() {
            (this.user = {
                id: "",
                National_id: "",
                password: "",
                userType: "",
                roles: [],
            }),
                // إزالة بيانات المستخدم من الكوكيز
                Cookies.remove("user");
        },
        // لإخفاء الخطأ بعد 5 ثوانٍ
        clearError() {
            setTimeout(() => {
                this.error = null;
            }, 5000);
        },
    },
});
