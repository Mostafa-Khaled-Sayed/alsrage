<template>
    <v-container class="login-container">
        <v-card>
            <v-card-title class="text-center">Login</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="handleLogin">
                    <v-select
                        v-model="userType"
                        :items="userTypes"
                        label="User Type"
                        required
                    ></v-select>
                    <v-text-field
                        v-model="National_id"
                        label="National_id"
                        type="text"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        required
                    ></v-text-field>

                    <v-btn
                        type="submit"
                        :loading="loading"
                        :disabled="loading"
                        color="primary"
                    >
                        Login
                    </v-btn>
                    <v-alert v-if="error" type="error" class="mt-2">{{
                        error
                    }}</v-alert>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useAuthStore } from "../store/userStore";
import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDocs, collection } from "@firebase/firestore";
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
const db = getFirestore(app);
import { useSecureDataStore } from "@/store/secureData.js";
export default {
    data() {
        return {
            National_id: "",
            password: "",
            userType: "",
            id: "",
            roles: [],
            userTypes: ["parent", "admin", "student"],
            user: [],
        };
    },
    computed: {
        ...mapState(useAuthStore, ["loading", "error", "user_data"]),
    },
    watch: {
        userType(newValue) {
            if (newValue === "parent") {
                this.National_id = "1234567891011";
                this.password = "123456";
            } else if (newValue === "admin") {
                this.National_id = "1210987654321";
                this.password = "123456";
            } else if (newValue === "student") {
                this.National_id = "1233214569585202";
                this.password = "111";
            }
        },
    },
    methods: {
        ...mapActions(useAuthStore, ["login"]),
        async Check_User() {
            const decryption = useSecureDataStore();
            let authenticatedUser = null;
            try {
                if (this.userType === "parent") {
                    const querySnapshot = await getDocs(
                        collection(db, "parents")
                    );
                    querySnapshot.forEach((doc) => {
                        if (
                            doc.id === this.National_id &&
                            doc.data().password === this.password
                        ) {
                            authenticatedUser = {
                                id: doc.id,
                                National_id: doc.data().National_id,
                                name: doc.data().name,
                                userType: "parent",
                                email: "",
                                roles: "",
                            };
                        }
                    });
                    return authenticatedUser;
                }
                if (this.userType === "admin") {
                    const querySnapshot = await getDocs(
                        collection(db, "users")
                    );
                    querySnapshot.forEach((doc) => {
                        const decryptedNational_id = decryption.decryptData(
                            doc.data().National_id,
                            "12345a"
                        );
                        if (
                            decryptedNational_id === this.National_id &&
                            doc.data().password === this.password
                        ) {
                            authenticatedUser = {
                                id: doc.id,
                                email: decryption.decryptData(
                                    doc.data().email,
                                    "12345a"
                                ),
                                name: decryption.decryptData(
                                    doc.data().name,
                                    "12345a"
                                ),
                                userType: doc.data().userType,
                                National_id: decryptedNational_id,
                                roles: doc.data().roles,
                            };
                        }
                    });
                    return authenticatedUser;
                }
                if (this.userType === "student") {
                    const querySnapshot = await getDocs(
                        collection(db, "students")
                    );
                    querySnapshot.forEach((doc) => {
                        if (
                            doc.id === this.National_id &&
                            doc.data().password === this.password
                        ) {
                            authenticatedUser = {
                                id: doc.id,
                                email: "",
                                name: doc.data().student_name,
                                userType: "student",
                                National_id: doc.id,
                                roles: "",
                            };
                        }
                    });
                    return authenticatedUser;
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                throw error; // Optionally rethrow the error for higher-level error handling
            }
        },
        async handleLogin() {
            let authenticatedUser = await this.Check_User();
            if (authenticatedUser) {
                // Call your login method or perform necessary actions
                await this.login(
                    authenticatedUser.id,
                    authenticatedUser.email,
                    authenticatedUser.userType,
                    authenticatedUser.roles,
                    authenticatedUser.name
                );
                if (!this.error) {
                    if (authenticatedUser.userType === "parent") {
                        this.$router.push({ name: "Parent_Dashboard" });
                    } else if (authenticatedUser.userType === "admin") {
                        this.$router.push({ name: "admin_Dashboard" });
                    } else {
                        // تأكد من تمرير المعلمة id بشكل صحيح
                        this.$router.push({
                            name: "Student_Dashboard",
                            params: { id: authenticatedUser.id },
                        });
                    }
                }
            } else {
                // Handle invalid credentials
                console.log("Invalid email or password.");
                // Set an error message or handle the UI accordingly
                this.error = true; // Assuming error handling mechanism
            }
        },
    },
};
</script>

<style scoped>
.login-container {
    max-width: 300px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
}
</style>
