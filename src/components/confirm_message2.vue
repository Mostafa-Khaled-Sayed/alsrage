<template>
    <v-snackbar v-model="snackbarVisible">
        {{ text }}

        <template v-slot:actions>
            <v-btn
                color="var(--main-color)"
                variant="text"
                @click="closeSnackbar"
            >
                إغلاق
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    props: ["text", "snackbar"],
    data() {
        return {
            snackbarVisible: this.snackbar,
        };
    },
    watch: {
        snackbar(newVal) {
            this.snackbarVisible = newVal;
        },
    },
    methods: {
        closeSnackbar() {
            this.snackbarVisible = false;
            this.$emit("close-snackbar");
        },
    },
};
</script>
