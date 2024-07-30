import { defineStore } from "pinia";

export const useDialogStore = defineStore("dialog", {
    state: () => ({
        dialog_addstudent: false,
        dialog_searchstudent: false,
        dialog: false,
        showDialog: false,
    }),
    actions: {
        showAddStudentDialog() {
            this.dialog_addstudent = true;
        },
        hideAddStudentDialog() {
            this.dialog_addstudent = false;
        },
        showSearchStudentDialog() {
            this.dialog_searchstudent = true;
        },
        hideSearchStudentDialog() {
            this.dialog_searchstudent = false;
        },
        toggleDialog(value) {
            this.showDialog = value;
        },
    },
    getters: {
        isDialogVisible: (state) => state.showDialog,
    },
});
