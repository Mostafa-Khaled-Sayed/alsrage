import { defineStore, mapActions } from "pinia";
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    Timestamp,
} from "@firebase/firestore";
import { useSecureDataStore } from "./secureData";
import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
import {
    getStorage,
    ref,
    uploadBytes,
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
import { usenotification } from "../store/notification.js";
// Define Pinia store for managing news
export const useNews = defineStore("News", {
    state: () => ({
        dialog: false,
        dialog_1: false,
        dialog_3: false,
        editor: [],
        editor1: [],
        Title_Information: "",
        Description_Information: "",
        Image_Information: null,
        Time_Condition: "",
        progress: 0,
        image: "",
        dialog_6: false,
        News: [],
        New: {
            title: "",
            image: null,
            description: "",
            time: "",
        },
        random: 0,
        loading: false,
        loading1: false,
        empty: false,
        text0: "لا يوجد أخبار",
        snackbar: false,
        snackbar2: false,
        snackbar3: false,
        text12: " تم التعديل بنجاح",
        text10: " تم الاضافة بنجاح",
        text11: " تم الحذف بنجاح",
    }),
    actions: {
        ...mapActions(usenotification, ["send_Notification"]),
        // Action method to upload an image to Firebase Storage
        async upload_Image(file) {
            this.random = Math.random();
            const storageReference = storageRef(
                storage,
                "images/" + this.random + file.name
            );
            // Upload the file bytes to the storage reference and get a snapshot of the upload
            const snapshot = await uploadBytes(storageReference, file);

            // Calculate the progress percentage
            this.progress = parseInt(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            // Log a message indicating the upload is complete, along with the snapshot details
            console.log("Uploaded a blob or file!", snapshot);

            // Return a promise that resolves with the download URL of the uploaded file
            return getDownloadURL(snapshot.ref);
        },

        // Action method to delete a photo from Firebase Storage
        async delete_photo(image) {
            const storage = getStorage();

            // Create a reference to the file to delete
            const desertRef = ref(storage, image);

            // Delete the file
            deleteObject(desertRef);
            console.log("Photo deleted");
        },
        alignment(text, align) {
            text.textAlign = align;
        },
        // Action method to add news item to Firestore
        async Add_News() {
            try {
                this.loading = true;
                const secrureDataStore = useSecureDataStore();
                if (this.New.image) {
                    // Step 1: Upload the image and get the download URL
                    const imageUrl = await this.upload_Image(this.New.image);
                    // Get current local time
                    const currentTime = Timestamp.now();

                    // Step 2: Add a document to the "News" collection in Firestore
                    const docRef = await addDoc(collection(db, "News"), {
                        title: secrureDataStore.encryptData(
                            this.New.title,
                            "12343a"
                        ),
                        description: secrureDataStore.encryptData(
                            this.New.description,
                            "12343a"
                        ),
                        time: currentTime,

                        image: secrureDataStore.encryptData(imageUrl, "12343a"),
                    });

                    // Step 3: Update the newly added document with its own ID
                    await updateDoc(docRef, {
                        id: docRef.id,
                    });
                    console.log("Document written with ID: ", docRef.id);
                    this.send_Notification(
                        "اشعار أخبار",
                        "تم إضافة خبر جديد",
                        "public_notification"
                    );
                    this.send_Notification(
                        "اشعار أخبار",
                        "تم إضافة خبر جديد",
                        "parent_notification"
                    );
                    this.send_Notification(
                        "اشعار أخبار",
                        "تم إضافة خبر جديد",
                        "students_notification"
                    );
                    // Step 4: Refresh news data
                    this.Get_data();
                    this.snackbar = true;
                    this.New = {
                        title: "",
                        image: null,
                        description: "",
                        time: "",
                    };
                    this.loading = false;
                    this.dialog = false;
                } else {
                    console.error("No image selected.");
                    this.loading = false;
                }
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },

        // Action method to get all news data from Firestore
        async Get_data() {
            try {
                this.News = [];
                const decryption = useSecureDataStore();
                this.loading1 = true;
                const querySnapshot = await getDocs(
                    query(collection(db, "News"), orderBy("time", "desc"))
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
                        image: decryption.decryptData(
                            doc.data().image,
                            "12343a"
                        ),
                        time: doc.data().time,
                    };
                    this.News.push(Data);
                });
                console.log("this.News", this.News);
                if (this.News.length === 0) {
                    this.empty = true;
                } else {
                    this.empty = false;
                }
                this.loading1 = false;
            } catch (error) {
                console.error("Error retrieving data:", error);
            }
        },
        // Action method to get limited news data (first 3 items)
        async Get_splice() {
            try {
                this.News = [];
                const decryption = useSecureDataStore();
                this.loading1 = true;

                const querySnapshot = await getDocs(collection(db, "News"));
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
                        image: decryption.decryptData(
                            doc.data().image,
                            "12343a"
                        ),
                        time: doc.data().time,
                    };
                    this.News.push(Data);
                });
                this.News = this.News.slice(0, 3);
                console.log("this.News", this.News);
                if (this.News.length === 0) {
                    this.empty = true;
                } else {
                    this.empty = false;
                }
                this.loading1 = false;
            } catch (error) {
                console.error("Error retrieving data:", error);
            }
        },

        // Action method to delete a news item from Firestore
        async delete_New(NewId, image) {
            try {
                // Log before attempting to delete
                console.log("Deleting New from Firestore:", NewId);

                // Step 1: Delete the document from Firestore
                await deleteDoc(doc(db, "News", NewId));

                // Step 2: Delete the corresponding image from Firebase Storage
                this.delete_photo(image);

                // Log after successful deletion
                console.log("New deleted from Firestore successfully:", NewId);

                // Step 3: Find the index of the deleted New in the News array
                const index = this.News.findIndex((New) => New.id === NewId);

                // If the New is found in the News array, remove it
                if (index !== -1) {
                    this.News.splice(index, 1);
                    console.log("New deleted successfully from News array");
                } else {
                    console.log("New not found in News array");
                }
                this.snackbar2 = true;
                // Step 4: Refresh news data
                this.Get_data();

                this.dialog_3 = false;
            } catch (error) {
                console.error("Error deleting New:", error);
            }
        },

        // Action method to set news details for displaying in a dialog
        New_Information(New) {
            this.Title_Information = "";
            this.Description_Information = "";
            this.Image_Information = null;
            this.Title_Information = New.title;
            this.Id_Information = New.id;
            console.log(New.id);
            this.Description_Information = New.description;
            this.Image_Information = New.image;
            this.Time_Condition = New.time;
        },
        async onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                // Convert file to a URL that can be used as an image source
                this.image = URL.createObjectURL(file);
                console.log(this.image);
                // Step 1: Upload the image and get the download URL
                const imageUrl = await this.upload_Image(
                    this.Image_Information
                );
                this.Image_Information = imageUrl;
                return imageUrl;
            } else {
                this.image = null;
            }
        },
        // Method to update news details in Firestore
        async Update_News(NewId) {
            try {
                this.loading = true;
                const currentTime = Timestamp.now();
                const secrureDataStore = useSecureDataStore();
                const docRef = doc(db, "News", NewId);
                // Update the document in Firestore
                await updateDoc(docRef, {
                    title: secrureDataStore.encryptData(
                        this.Title_Information,
                        "12343a"
                    ),
                    description: secrureDataStore.encryptData(
                        this.Description_Information,
                        "12343a"
                    ),
                    time: currentTime,
                    image: secrureDataStore.encryptData(
                        this.Image_Information,
                        "12343a"
                    ), // Encrypted image URL
                });

                // Refresh news data
                this.Get_data();
                this.Title_Information = "";
                this.Description_Information = "";
                this.Image_Information = null;
                this.snackbar3 = true;
            } catch (error) {
                console.error("Error updating the News:", error);
            } finally {
                this.loading = false;
                this.dialog_1 = false;
            }
        },
    },
});
