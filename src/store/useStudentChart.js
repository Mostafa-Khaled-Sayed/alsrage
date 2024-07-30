import { Query, collection, getDocs, where } from "firebase/firestore";
import { defineStore } from "pinia";
import { db } from "../Firebase.js"; // تأكد من أن المسار صحيح
import Cookies from "js-cookie";

export const useStudentStore = defineStore("student", {
    actions: {
        async getStudent(subject) {
            try {
                const userCookies = Cookies.get("user");
                if (!userCookies) return;
                console.log("userCookies=.......>>", userCookies);
                const studentCollection = collection(db, "students");
                const q = Query(
                    studentCollection,
                    where("National_id", "==", userCookies.National_id)
                );

                // Execute the query
                const querySnapshot = await getDocs(q);

                // Iterate through the results
                // querySnapshot.forEach((doc) => {
                //     console.log(doc.id, " => ", doc.data());
                //     console.log("Query started");
                // });

                // Client-side filtering
                const filteredDocs = querySnapshot.docs.filter((doc) => {
                    const monthly = doc.data().Results?.["1"]?.Monthly;
                    if (monthly) {
                        for (const monthKey in monthly) {
                            const degrees = monthly[monthKey]?.Degrees;
                            if (degrees) {
                                for (const degreeKey in degrees) {
                                    if (
                                        degrees[degreeKey].Subject_Name ===
                                        subject
                                    ) {
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                    return false;
                });

                filteredDocs.forEach((doc) => {
                    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                });

                console.log("Query ended");
            } catch (error) {
                console.error("Error fetching documents: ", error);
            }
        },
    },
});
