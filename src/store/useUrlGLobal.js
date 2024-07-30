// stores/urlStore.js
import { defineStore } from "pinia";

export const useUrlGlobal = defineStore("Url", {
    state: () => ({
        // URL: "https://alseraj--almoner.vercel.app/",
        URL: "http://localhost:3000/",
    }),
    actions: {
        setURL(newVal) {
            this.URL = newVal;
        },
    },
});
