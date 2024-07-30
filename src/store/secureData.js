import { defineStore } from "pinia";
import CryptoJS from "crypto-js"; // Ensure CryptoJS is imported

export const useSecureDataStore = defineStore("secureData", {
    // Provide a store ID
    actions: {
        encryptData(data, secretKey) {
            return CryptoJS.AES.encrypt(data, secretKey).toString();
        },

        decryptData(encryptedData, secretKey) {
            const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
            return bytes.toString(CryptoJS.enc.Utf8);
        },
    },
});
