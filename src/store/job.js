import { defineStore, mapActions } from "pinia";
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    query,
    orderBy,
    updateDoc,
    deleteDoc,
    arrayUnion,
    doc,
    Timestamp,
} from "@firebase/firestore";
import { useSecureDataStore } from "./secureData";
import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
    ref as storageRef,
} from "firebase/storage";

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
const storage = getStorage(app);
import { usenotification } from "../store/notification.js";
// Define Pinia store
export const useJobs = defineStore("job", {
    state: () => ({
        // State variables
        dialog: false,
        dialog_1: false,
        dialog_2: false,
        dialog_3: false,
        dialog_9: false,
        name_Information: "",
        email_Information: "",
        phone_Information: "",
        CV_Information: null,
        applies_Information: [],
        id_Information: "",
        Id_Information: "",
        progress: 0,
        Jobs: [],
        Job: {
            title: "",
            description: "",
            applies: [],
            id: "",
            time: "",
        },
        Apply: {
            name: "",
            email: "",
            phone: "",
            title: "",
            CV: null,
            description: "",
        },
        random: 0,
        applies: [],
        apply: [],
        notifications: [],
        text: "",
        counter: [],
        loading: false,
        loading1: false,
        loading3: false,
        empty: false,
        empty0: false,
        empty1: false,
        empty2: false,
        text0: "لا يوجد وظائف",
        text1: "لا يوجد طلبات توظيف ",
        text2: "لا يوجد إشعارات",
        snackbar: false,
        snackbar2: false,
        snackbar3: false,
        text12: " تم التعديل بنجاح",
        text10: " تم الاضافة بنجاح",
        text11: " تم الحذف بنجاح",
    }),
    actions: {
        // Action methods
        ...mapActions(usenotification, [
            "send_Notification",
            "get_notifications",
        ]),
        // Upload CV file to Firebase Storage
        async upload_CV(file) {
            this.random = Math.random();
            const storageReference = storageRef(
                storage,
                "CVs/" + this.random + file.name
            );
            // Upload the file bytes to the storage reference and get a snapshot of the upload
            const snapshot = await uploadBytesResumable(storageReference, file);

            // Calculate the progress percentage
            this.progress = (
                (snapshot.bytesTransferred / snapshot.totalBytes) *
                100
            ).toFixed(2);
            console.log("the progress" + this.progress);
            // Log a message indicating the upload is complete, along with the snapshot details
            console.log("Uploaded a blob or file!", snapshot);

            // Return a promise that resolves with the download URL of the uploaded file
            return getDownloadURL(snapshot.ref);
        },

        // Delete CV file from Firebase Storage
        async delete_CV(CV) {
            const storage = getStorage();

            // Create a reference to the file to delete
            const desertRef = ref(storage, CV);

            // Delete the file
            deleteObject(desertRef);
        },

        // Add application for a job
        async Add_Apply(JobId) {
            try {
                const secrureDataStore = useSecureDataStore();
                this.loading = true;
                if (this.Apply.CV) {
                    // Step 1: Upload CV and get the download URL
                    const CVUrl = await this.upload_CV(this.Apply.CV);
                    const currentTime = Timestamp.now();
                    // Step 2: Prepare data to add to the "Apply" collection
                    const applyData = {
                        Job_id: this.Id_Information,

                        name: secrureDataStore.encryptData(
                            this.Apply.name,
                            "12343a"
                        ),
                        email: secrureDataStore.encryptData(
                            this.Apply.email,
                            "12343a"
                        ),
                        phone: secrureDataStore.encryptData(
                            this.Apply.phone,
                            "12343a"
                        ),
                        CV: secrureDataStore.encryptData(CVUrl, "12343a"),
                        description: secrureDataStore.encryptData(
                            this.Apply.description,
                            "12343a"
                        ),
                        time: currentTime,
                    };

                    // Step 3: Add a document to the "Apply" collection
                    const docRef = await addDoc(
                        collection(db, "Apply"),
                        applyData
                    );
                    console.log("Document written with ID: ", docRef.id);

                    // Step 4: Update the corresponding "Jobs" document with the new apply information
                    const jobRef = doc(db, "Jobs", JobId);
                    await updateDoc(jobRef, {
                        applies: arrayUnion(docRef.id),
                        // Assuming you want to store apply document IDs in the "Jobs" document
                    });
                    console.log("Updated Job document with apply information.");

                    // Step 5: Update the Apply document with its own ID (optional)
                    await updateDoc(docRef, {
                        id: docRef.id,
                    });

                    // Step 6: Update counter and notifications
                    const Snapshot = await getDocs(collection(db, "counter"));
                    Snapshot.forEach((doc) => {
                        this.counter = doc.data();
                    });
                    this.counter.counter++;
                    this.text =
                        " قام " +
                        this.Apply.name +
                        " بالتقديم على وظيفة " +
                        this.Title_Information;
                    this.send_Notification(
                        "اشعار تقديم على الوظيفة",
                        this.text,
                        "Job_Applies"
                    );
                    const Data = {
                        text: secrureDataStore.encryptData(this.text, "12343a"),
                        time: currentTime,
                    };
                    const notRef = await addDoc(
                        collection(db, "Apply_notifications"),
                        Data
                    );
                    console.log("Document written with ID: ", notRef.id);

                    // Update notification document with its own ID (optional)
                    await updateDoc(notRef, {
                        id: notRef.id,
                    });

                    // Update counter document
                    const countRef = doc(db, "counter", "xLGdsLcpA71sNZRNvUmU");
                    updateDoc(countRef, {
                        counter: this.counter.counter,
                    });
                    this.snackbar = true;
                    this.loading = false;

                    // Step 7: Refresh data if needed
                    this.Get_Apply_data();
                    (this.Apply = {
                        name: "",
                        email: "",
                        phone: "",
                        title: "",
                        CV: null,
                        description: "",
                    }),
                        // Step 8: Close dialog or perform UI-related operations
                        (this.dialog_2 = false);
                } else {
                    console.error("No File selected.");
                    this.loading = false;
                }
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },
        async Delete_Apply(applyId, JobId, CV) {
            try {
                this.loading = true;

                // Step 1: Delete the Apply document from the "Apply" collection
                await deleteDoc(doc(db, "Apply", applyId));
                console.log(
                    "Document with ID ",
                    applyId,
                    " deleted successfully."
                );

                // Step 2: Delete the corresponding CV from Firebase Storage
                await this.delete_CV(CV);
                console.log("CV deleted successfully.");

                // Step 3: Remove the apply document ID from the corresponding "Jobs" document
                const jobRef = doc(db, "Jobs", JobId);
                const jobSnapshot = await getDoc(jobRef);

                if (jobSnapshot.exists()) {
                    const jobData = jobSnapshot.data();
                    const updatedApplies = jobData.applies.filter(
                        (id) => id !== applyId
                    );
                    await updateDoc(jobRef, { applies: updatedApplies });
                    console.log(
                        "Apply document ID removed from Jobs document."
                    );
                } else {
                    console.log("Jobs document not found.");
                }
                // Find the index of the Apply in the Apply array
                const index = this.apply.findIndex(
                    (Apply) => Apply.id === applyId
                );
                // If the Apply is found in the Apply array, remove it
                if (index !== -1) {
                    this.apply.splice(index, 1);
                    console.log("Apply deleted successfully from Apply array");
                } else {
                    console.log("Apply not found in Apply array");
                }
                // Step 4: Refresh data if needed
                this.Get_Apply_data();
                this.Get_data();
                this.snackbar2 = true;
                // Step 5: Perform UI-related operations (if needed)
                // Close dialog, update UI, etc.
                this.dialog_9 = false;
                this.loading = false;
            } catch (error) {
                console.error("Error deleting document: ", error);
                this.loading = false;
            }
        },

        // Display counter functionality
        async counter_display() {
            if (this.counter.counter === 0) {
                let bg_error = document.querySelector(".bg-error");
                bg_error.style.display = "none";
            }
        },

        // Add new job listing
        async Add_Jobs() {
            try {
                this.loading = true;
                const secrureDataStore = useSecureDataStore();
                const currentTime = Timestamp.now();
                const docRef = await addDoc(collection(db, "Jobs"), {
                    title: secrureDataStore.encryptData(
                        this.Job.title,
                        "12343a"
                    ),
                    description: secrureDataStore.encryptData(
                        this.Job.description,
                        "12343a"
                    ),
                    time: currentTime,
                    applies: this.Job.applies,
                });
                console.log("Apply document updated with ID: ", docRef.id);

                // Update job document with its own ID (optional)
                await updateDoc(docRef, {
                    id: docRef.id,
                });
                this.send_Notification(
                    "اشعار وظائف",
                    "تم إضافة وظيفة جديدة",
                    "public_notification"
                );
                this.send_Notification(
                    "اشعار وظائف",
                    "تم إضافة وظيفة جديدة",
                    "parent_notification"
                );
                console.log("Document written with ID: ", docRef.id);
                this.Get_data();
                this.snackbar = true;
                this.loading = false;
                this.Job = {
                    title: "",
                    description: "",
                    applies: [],
                    id: "",
                    time: "",
                };
                this.dialog = false;
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },

        // Retrieve apply data
        async Get_Apply_data() {
            try {
                this.loading1 = true;
                const decryption = useSecureDataStore();
                this.applies = []; // Initialize applies array
                const querySnapshot = await getDocs(collection(db, "Apply"));
                querySnapshot.forEach((doc) => {
                    const Data = {
                        id: doc.id,
                        Job_id: doc.data().Job_id,
                        name: decryption.decryptData(doc.data().name, "12343a"),
                        email: decryption.decryptData(
                            doc.data().email,
                            "12343a"
                        ),
                        phone: decryption.decryptData(
                            doc.data().phone,
                            "12343a"
                        ),
                        CV: decryption.decryptData(doc.data().CV, "12343a"),
                        description: decryption.decryptData(
                            doc.data().description,
                            "12343a"
                        ),
                        time: doc.data().time,
                    };
                    this.applies.push(Data);
                });
                console.log("applies", this.applies);
                this.loading1 = false;
            } catch (error) {
                console.error("Error retrieving data:", error);
            }
        },

        // Retrieve notifications data
        async Get_notifications_data() {
            try {
                this.get_notifications("Job_Applies");
                this.notifications = []; // Initialize notifications array
                this.counter = 0;
                const decryption = useSecureDataStore();
                const querySnapshot = await getDocs(
                    query(
                        collection(db, "Apply_notifications"),
                        orderBy("time", "desc")
                    )
                );
                querySnapshot.forEach((doc) => {
                    const Data = {
                        id: doc.id,
                        text: decryption.decryptData(doc.data().text, "12343a"),
                        time: doc.data().time,
                    };
                    this.notifications.push(Data);
                });
                console.log("notifications", this.notifications);
                if (this.notifications.length === 0) {
                    this.empty0 = true;
                } else {
                    this.empty0 = false;
                }
                this.Get_counter_data();
            } catch (error) {
                console.error("Error retrieving data:", error);
            }
        },

        // Retrieve counter data
        async Get_counter_data() {
            const Snapshot = await getDocs(collection(db, "counter"));
            Snapshot.forEach((doc) => {
                this.counter = doc.data();
            });
            console.log("counter", this.counter);
        },

        // Update counter data
        async Update_counter() {
            try {
                this.counter = 0;
                const docRef = doc(db, "counter", "xLGdsLcpA71sNZRNvUmU");
                updateDoc(docRef, {
                    counter: this.counter,
                });
                this.Get_counter_data();
                this.dialog_1 = false;
            } catch (error) {
                console.error("Error updating the Job:", error);
            }
        },

        // Retrieve applies for a job
        async Get_applies(job_apply) {
            this.apply = []; // Clear the array before populating with new data
            this.loading3 = true;
            try {
                const decryption = useSecureDataStore();
                for (const index of job_apply) {
                    const docRef = doc(db, "Apply", index);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const Data = {
                            id: docSnap.id,
                            name: decryption.decryptData(
                                docSnap.data().name,
                                "12343a"
                            ),
                            email: decryption.decryptData(
                                docSnap.data().email,
                                "12343a"
                            ),
                            phone: decryption.decryptData(
                                docSnap.data().phone,
                                "12343a"
                            ),
                            CV: decryption.decryptData(
                                docSnap.data().CV,
                                "12343a"
                            ),
                            description: decryption.decryptData(
                                docSnap.data().description,
                                "12343a"
                            ),
                            time: docSnap.data().time,
                        };
                        // Document exists, push data to apply array
                        this.apply.push(Data);
                    } else {
                        console.error("No such document!");
                    }
                }
                console.log("All apply data:", this.apply);
                if (this.apply.length === 0) {
                    this.empty1 = true;
                } else {
                    this.empty1 = false;
                }
                this.loading3 = false;
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        },
        async delete_Job_Applies(Job_Id) {
            try {
                const decryption = useSecureDataStore();
                const querySnapshot = await getDocs(collection(db, "Apply"));
                querySnapshot.forEach((docs) => {
                    if (docs.data().Job_id === Job_Id) {
                        // Delete each document found in the query
                        deleteDoc(doc(db, "Apply", docs.id));
                        this.delete_CV(
                            decryption.decryptData(docs.data().CV, "12343a")
                        );

                        console.log("Deleted applies for Job ID:", Job_Id);
                    }
                });
            } catch (error) {
                console.error(
                    "Error deleting applies for Job ID:",
                    Job_Id,
                    error
                );
                throw error; // Optionally rethrow the error for higher-level error handling
            }
        },
        // Retrieve all job data
        async Get_data() {
            try {
                const decryption = useSecureDataStore();
                this.loading1 = true;
                this.Jobs = [];
                const querySnapshot = await getDocs(
                    query(collection(db, "Jobs"), orderBy("time", "desc"))
                );

                querySnapshot.forEach((doc) => {
                    const Data = {
                        id: doc.id,
                        title: decryption.decryptData(
                            doc.data().title,
                            "12343a"
                        ),
                        description: decryption.decryptData(
                            doc.data().description,
                            "12343a"
                        ),
                        applies: doc.data().applies,

                        time: doc.data().time,
                    };
                    this.Jobs.push(Data);
                });
                console.log("this.Jobs", this.Jobs);
                this.loading1 = false;
                if (this.Jobs.length === 0) {
                    this.empty2 = true;
                } else {
                    this.empty2 = false;
                }
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },

        // Retrieve limited job data (first 3 jobs)
        async Get_splice() {
            try {
                const decryption = useSecureDataStore();
                this.loading1 = true;
                this.Jobs = [];
                const querySnapshot = await getDocs(collection(db, "Jobs"));
                querySnapshot.forEach((doc) => {
                    const Data = {
                        id: doc.id,
                        title: decryption.decryptData(
                            doc.data().title,
                            "12343a"
                        ),
                        description: decryption.decryptData(
                            doc.data().description,
                            "12343a"
                        ),
                        applies: doc.data().applies,

                        time: doc.data().time,
                    };
                    this.Jobs.push(Data);
                });
                this.Jobs = this.Jobs.slice(0, 3);
                console.log("this.Jobs", this.Jobs);
                if (this.Jobs.length === 0) {
                    this.empty = true;
                } else {
                    this.empty = false;
                }
                this.loading1 = false;
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },

        // Delete notification document
        async delete_notifications(notification_Id) {
            try {
                // Log before attempting to delete
                console.log(
                    "Deleting notification from Firestore:",
                    notification_Id
                );

                // Delete the document from Firestore
                await deleteDoc(
                    doc(db, "Apply_notifications", notification_Id)
                );

                // Log after successful deletion
                console.log(
                    "notification deleted from Firestore successfully:",
                    notification_Id
                );

                // Find the index of the notification in the notifications array
                const index = this.notifications.findIndex(
                    (notification) => notification.id === notification_Id
                );

                // If the notification is found in the notifications array, remove it
                if (index !== -1) {
                    this.notifications.splice(index, 1);
                    console.log(
                        "notification deleted successfully from notifications array"
                    );
                } else {
                    console.log(
                        "notification not found in notifications array"
                    );
                }

                // Refresh notifications data
                this.Get_notifications_data();
            } catch (error) {
                console.error("Error deleting notification:", error);
            }
        },

        // Delete job document
        async delete_Job(Job_Id) {
            try {
                // Delete associated data from the Apply collection
                await this.delete_Job_Applies(Job_Id);
                // Log before attempting to delete
                console.log("Deleting Job from Firestore:", Job_Id);

                // Delete the document from Firestore
                await deleteDoc(doc(db, "Jobs", Job_Id));

                // Log after successful deletion
                console.log("Job deleted from Firestore successfully:", Job_Id);

                // Find the index of the Job in the Jobs array
                const index = this.Jobs.findIndex((Job) => Job.id === Job_Id);

                // If the Job is found in the Jobs array, remove it
                if (index !== -1) {
                    this.Jobs.splice(index, 1);
                    console.log("Job deleted successfully from Jobs array");
                } else {
                    console.log("Job not found in Jobs array");
                }
                // Refresh jobs data
                this.Get_data();
                this.snackbar2 = true;
                this.dialog_3 = false;
            } catch (error) {
                console.error("Error deleting Job:", error);
            }
        },

        // Store job details for displaying in a dialog
        Job_Information(Job) {
            this.name_Information = "";
            this.email_Information = "";
            this.phone_Information = "";
            this.CV_Information = null;
            this.applies_Information = [];
            this.Title_Information = Job.title;
            this.Id_Information = Job.id;
            console.log(Job.id);
            this.Description_Information = Job.description;
            this.applies_Information = Job.applies;
        },
        // Store job details for displaying in a dialog
        Apply_Information(Apply) {
            this.Name_Information = "";
            this.Email_Information = "";
            this.CV_Information = null;
            this.Name_Information = Apply.name;
            this.id_Information = Apply.id;
            console.log(Apply.id);
            this.CV_Information = Apply.CV;
        },
        // Update job details
        async Update_Jobs(JobId) {
            try {
                this.loading = true;
                const secrureDataStore = useSecureDataStore();
                const currentTime = Timestamp.now().toDate();
                const docRef = doc(db, "Jobs", JobId);
                updateDoc(docRef, {
                    title: secrureDataStore.encryptData(
                        this.Title_Information,
                        "12343a"
                    ),
                    description: secrureDataStore.encryptData(
                        this.Description_Information,
                        "12343a"
                    ),
                    time: currentTime,
                });
                this.Get_data();
                this.snackbar3 = true;
                this.name_Information = "";
                this.email_Information = "";
                this.phone_Information = "";
                this.CV_Information = null;
                this.applies_Information = [];
                this.loading = false;
                this.dialog_1 = false;
            } catch (error) {
                console.error("Error updating the Job:", error);
            }
        },
    },
});
