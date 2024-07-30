import { defineStore } from "pinia";
import {
    collection,
    addDoc,
    updateDoc,
    getDocs,
    deleteDoc,
} from "@firebase/firestore";
import { useSecureDataStore } from "./secureData";
import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    // Firebase configuration object
    apiKey: "AIzaSyBdk3sqIHjXvB2C-O-lvkRgMFpg8pemkno",
    authDomain: "alseraj--almoner.firebaseapp.com",
    projectId: "alseraj--almoner",
    storageBucket: "alseraj--almoner.appspot.com",
    messagingSenderId: "462211256149",
    appId: "1:462211256149:web:a03ace3c70b306620169dc",
};

// Initialize Firebase app and services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Define Pinia store for managing photo gallery
export const usenotification = defineStore("notification_vue", {
    state: () => ({
        notifications: [],
        notification: "",
    }),
    actions: {
        /*async setToken() {
            try {
                const token = await getToken(messaging);
                console.log("FCM Token:", token);
                return token;
            } catch (error) {
                console.error("Error getting FCM token:", error);
                throw error;
            }
        },
         async send_Notification() {
            try {
                const token = await this.setToken();
                const notification = {
                    title: "Hello from Firebase!",
                    body: "This is a Firebase Cloud Messaging (FCM) notification message!",
                };

                await fetch("https://fcm.googleapis.com/fcm/send", {
                    method: "POST",
                    headers: {
                        Authorization: `key=${firebaseConfig.apiKey}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        to: token,
                        notification: notification,
                    }),
                });

                console.log("Notification sent successfully!");
            } catch (error) {
                console.error("Error sending notification:", error);
                throw error;
            }
        },
        */
        async send_Notification(title, text, name) {
            try {
                const secrureDataStore = useSecureDataStore();
                const Data = {
                    text: secrureDataStore.encryptData(text, "12343a"),
                    title: secrureDataStore.encryptData(title, "12343a"),
                };
                const notRef = await addDoc(collection(db, name), Data);
                console.log("Document written with ID: ", notRef.id);

                // Update notification document with its own ID (optional)
                await updateDoc(notRef, {
                    id: notRef.id,
                });
            } catch (error) {
                console.error("Error sending notification:", error);
                throw error;
            }
        },
        async get_notifications(name) {
            try {
                // Check if the browser supports notifications and permission is not denied
                this.notifications = []; // Initialize notifications array
                this.counter = 0;
                const decryption = useSecureDataStore();
                const querySnapshot = await getDocs(collection(db, name));
                querySnapshot.forEach((doc) => {
                    const Data = {
                        id: doc.id,
                        text: decryption.decryptData(doc.data().text, "12343a"),
                        title: decryption.decryptData(
                            doc.data().title,
                            "12343a"
                        ),
                    };
                    this.push_Notification(
                        decryption.decryptData(doc.data().title, "12343a"),
                        decryption.decryptData(doc.data().text, "12343a")
                    );
                    this.notifications.push(Data);
                    // Delete the document from Firestore after processing
                    deleteDoc(doc.ref);
                });
                console.log("notifications", this.notifications);
            } catch (error) {
                console.error("Error retrieving data:", error);
            }
        },
        async push_Notification(title, text) {
            try {
                // Check if the browser supports notifications and permission is not denied
                if (
                    window.Notification &&
                    Notification.permission !== "denied"
                ) {
                    const permission = await Notification.requestPermission();
                    if (permission === "granted") {
                        // Notification permission is granted, create a notification
                        this.notification = new Notification(title, {
                            body: text,
                            icon: "/path/to/icon.png", // Optional icon path
                        });

                        // Handle click event on the notification (optional)
                        this.notification.onclick = function () {
                            // Handle what happens when the user clicks on the notification
                            console.log("Notification clicked");
                            // You can redirect to a specific page, etc.
                        };

                        console.log("Notification sent successfully!");
                    } else {
                        // Notification permission denied by user
                        alert("Notification permission denied");
                    }
                } else {
                    // Browser does not support notifications or permission is denied
                    alert("Notifications not supported or permission denied");
                }
            } catch (error) {
                console.error("Error sending notification:", error);
                throw error;
            }
        },
    },
});
