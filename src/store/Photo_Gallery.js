import { defineStore, mapActions } from "pinia";
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    orderBy,
    query,
    Timestamp,
} from "@firebase/firestore";
import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";

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
import { usenotification } from "../store/notification.js";
import axios from "axios";
// Define Pinia store for managing photo gallery
export const usePhoto_Gallery = defineStore("Photo_Gallery", {
    state: () => ({
        dialog: false,
        dialog_3: false,
        dialog_4: false,
        dialog_6: false,
        photos_show: "",
        File_Name: "",
        type: "رحلات",
        types: "صورة",
        Photos: [],
        All_photos: [],
        trip: [],
        party: [],
        news: [],
        all: [],
        image: null,
        video: null,
        tab: "all",
        progress: 0,
        Photo_Information: "",
        Id_Information: "",
        Types: ["رحلات", "حفلات", "أخبار"],
        Photo: {
            File_type: "",
            image: null,
            video: null,
        },
        random: 0,
        loading: false,
        loading1: false,
        empty: false,
        text0: "لا يوجد صور",
        empty1: false,
        text1: "لا يوجد صور رحلات",
        empty2: false,
        text2: "لا يوجد صور أخبار",
        empty3: false,
        text3: "لا يوجد صور حفلات",
        snackbar: false,
        snackbar2: false,
        text10: " تم الاضافة بنجاح",
        text11: " تم الحذف بنجاح",
    }),
    actions: {
        ...mapActions(usenotification, ["send_Notification"]),
        // Action method to handle setting File_Name based on type
        handletypes() {
            if (this.type === "رحلات") {
                this.File_Name = "trip/";
            } else if (this.type === "حفلات") {
                this.File_Name = "party/";
            } else if (this.type === "أخبار") {
                this.File_Name = "news/";
            }
        },

        // Action method to upload an image to Firebase Storage
        async upload_Image(file) {
            if (!file) {
                console.error("No file selected");
                return;
            }
            console.log("start");
            // Create a FormData object to hold the file data
            const formData = new FormData();
            formData.append("file", file); // Append the file with the key 'file'

            try {
                console.log("wait");

                const response = await axios.post(
                    "http://localhost:3000/upload",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                console.log(
                    "File uploaded successfully:",
                    response.data.message
                );
                return response.data.message;
            } catch (error) {
                console.error("Error uploading file:", error);
            }
            console.log("end");
        },

        // Action method to add a photo to Firestore
        async Add_Photos() {
            try {
                this.loading = true;
                if (this.Photo.image) {
                    // Step 1: Upload the image and get the download URL
                    const imageUrl = await this.upload_Image(this.Photo.image);
                    // Get current local time
                    const currentTime = Timestamp.now();

                    // Step 2: Add a document to the "Photos" collection in Firestore
                    const docRef = await addDoc(collection(db, "Photos"), {
                        time: currentTime,

                        image: imageUrl,
                        type: this.type,
                        File_type: this.types,
                    });

                    // Step 3: Update the newly added document with its own ID
                    await updateDoc(docRef, {
                        id: docRef.id,
                    });

                    console.log("Document written with ID: ", docRef.id);
                    this.Photo = {
                        File_type: "",
                        image: null,
                        video: null,
                    };
                    this.send_Notification(
                        "اشعار صور",
                        "تم إضافة صورة جديدة",
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
                    // Step 4: Refresh photo data
                    this.Get_data();
                    this.snackbar = true;
                    this.loading = false;
                    this.dialog = false;
                } else {
                    console.error("No file selected.");
                    this.loading = false;
                }
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },
        // Action method to add a photo to Firestore
        async Add_Video() {
            try {
                this.loading = true;
                if (this.Photo.video) {
                    // Step 1: Upload the image and get the download URL
                    const videoUrl = await this.upload_Image(this.Photo.video);
                    // Get current local time
                    const currentTime = Timestamp.now();

                    // Step 2: Add a document to the "Photos" collection in Firestore
                    const docRef = await addDoc(collection(db, "Photos"), {
                        video: videoUrl,
                        time: currentTime,
                        type: this.type,
                        File_type: this.types,
                    });

                    // Step 3: Update the newly added document with its own ID
                    await updateDoc(docRef, {
                        id: docRef.id,
                    });

                    console.log("Document written with ID: ", docRef.id);
                    this.Photo = {
                        File_type: "",
                        image: null,
                        video: null,
                    };
                    // Step 4: Refresh photo data
                    this.send_Notification(
                        "اشعار فيديو",
                        "تم إضافة فيديو جديد",
                        "public_notification"
                    );
                    this.Get_data();
                    this.snackbar = true;
                    this.loading = false;
                    this.dialog = false;
                } else {
                    console.error("No file selected.");
                    this.loading = false;
                }
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },
        // Action method to retrieve all photos from Firestore
        async Get_data() {
            try {
                this.loading1 = true;
                this.Photos = [];
                const querySnapshot = await getDocs(
                    query(collection(db, "Photos"), orderBy("time", "desc"))
                );
                querySnapshot.forEach((doc) => {
                    this.Photos.push(doc.data());
                });
                console.log("this.Photos", this.Photos);
                if (this.Photos.length === 0) {
                    this.empty = true;
                } else {
                    this.empty = false;
                }
                this.loading1 = false;
                // Update type-specific data arrays
                this.Type_Data();
            } catch (error) {
                console.error("Error retrieving data:", error);
            }
        },

        // Action method to retrieve limited photos from Firestore (first 3)
        async Get_splice() {
            try {
                this.loading1 = true;
                this.Photos = [];
                const querySnapshot = await getDocs(collection(db, "Photos"));
                querySnapshot.forEach((doc) => {
                    this.Photos.push(doc.data());
                });
                this.Photos = this.Photos.slice(0, 3);
                console.log("this.Photos", this.Photos);
                if (this.Photos.length === 0) {
                    this.empty = true;
                } else {
                    this.empty = false;
                }
                this.loading1 = false;
                // Update type-specific data arrays
                this.Type_Data();
            } catch (error) {
                console.error("Error retrieving data:", error);
            }
        },

        // Action method to delete a photo from Firebase Storage
        async delete_photo(image) {
            const storage = getStorage();

            // Create a reference to the file to delete
            const desertRef = ref(storage, image);

            // Delete the file
            deleteObject(desertRef);
        },

        // Action method to delete a photo from Firestore
        async delete_Photo(PhotoId, image) {
            try {
                // Log before attempting to delete
                console.log("Deleting Photo from Firestore:", PhotoId);

                // Step 1: Delete the document from Firestore
                await deleteDoc(doc(db, "Photos", PhotoId));

                // Step 2: Delete the corresponding image from Firebase Storage
                this.delete_photo(image);

                // Log after successful deletion
                console.log(
                    "Photo deleted from Firestore successfully:",
                    PhotoId
                );

                // Step 3: Find the index of the deleted Photo in the Photos array
                const index = this.Photos.findIndex(
                    (Photo) => Photo.id === PhotoId
                );

                // If the Photo is found in the Photos array, remove it
                if (index !== -1) {
                    this.Photos.splice(index, 1);
                    console.log("Photo deleted successfully from Photos array");
                } else {
                    console.log("Photo not found in Photos array");
                }
                this.snackbar2 = true;
                // Step 4: Refresh photo data
                this.Get_data();

                this.dialog_3 = false;
                this.dialog_4 = false;
            } catch (error) {
                console.error("Error deleting Photo:", error);
            }
        },
        show_Data() {
            if (this.photos_show === "trip" || this.tab === "trip") {
                this.Photos = this.trip;
                if (this.Photos.length === 0) {
                    this.empty1 = true;
                } else {
                    this.empty1 = false;
                }
            } else if (this.photos_show === "party" || this.tab === "party") {
                this.Photos = this.party;
                if (this.Photos.length === 0) {
                    this.empty3 = true;
                } else {
                    this.empty3 = false;
                }
            } else if (this.photos_show === "news" || this.tab === "news") {
                this.Photos = this.news;
                if (this.Photos.length === 0) {
                    this.empty2 = true;
                } else {
                    this.empty2 = false;
                }
            } else {
                this.Photos = this.all;
            }
        },
        // Action method to categorize photos into respective arrays based on type
        Type_Data() {
            this.trip = [];
            this.party = [];
            this.news = [];
            this.Photos.forEach((Photo) => {
                this.all.push(Photo);
                if (Photo.type === "رحلات") {
                    this.trip.push(Photo);
                } else if (Photo.type === "حفلات") {
                    this.party.push(Photo);
                } else if (Photo.type === "أخبار") {
                    this.news.push(Photo);
                }
            });
        },

        // Action method to handle file change event and set image preview
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                // Convert file to a URL that can be used as an image source
                this.image = URL.createObjectURL(file);
            } else {
                this.image = null;
            }
        },
        // Action method to handle file change event and set image preview
        on_Video_Change(event) {
            const file = event.target.files[0];
            if (file) {
                // Convert file to a URL that can be used as an image source
                this.video = URL.createObjectURL(file);
            } else {
                this.video = null;
            }
        },
        // Store Photo information
        photo_Information(Photo) {
            this.Photo_Information = null;
            this.Video_Information = "";
            this.File_Information = "";
            this.Id_Information = "";
            this.Photo_Information = Photo.image;
            this.Video_Information = Photo.video;
            this.File_Information = Photo.File_type;
            this.Id_Information = Photo.id;
            console.log(Photo.id);
        },
    },
});
