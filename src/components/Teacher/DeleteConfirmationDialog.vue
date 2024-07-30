<!-- DeleteConfirmationDialog.vue -->
<template>
    <v-dialog v-model="dialog_3" width="90%">
        <v-card width="100%" class="popup">
            <div class="d-flex justify-space-between align-center title">
                <div style="color: var(--main-color)">تأكيد الحذف!</div>
                <v-btn icon="mdi-close" @click="closeDialog"></v-btn>
            </div>
            <p
                style="
                    padding: 20px;
                    color: var(--therd-color);
                    font-weight: bold;
                "
            >
                هل أنت متأكد من حذفك لهذا المشرف؟
            </p>
            <v-card-text>
                <div class="d-flex align-center">
                    <v-btn
                        color="var(--main-color)"
                        :loading="loading"
                        :disabled="loading"
                        @click="closeDialog"
                        style="
                            color: #fff;
                            font-weight: bold;
                            width: 48%;
                            height: 45px;
                        "
                    >
                        إلغاء
                    </v-btn>
                    <v-spacer />
                    <v-btn
                        color="var(--pink-color)"
                        :loading="loading"
                        :disabled="loading"
                        @click="confirmDelete"
                        style="
                            color: #fff;
                            font-weight: bold;
                            width: 48%;
                            height: 45px;
                        "
                    >
                        تأكيد
                    </v-btn>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        dialog_3: {
            type: Boolean,
            required: true,
        },
        confirmDelete: {
            type: Function,
            required: true,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        closeDialog: {
            type: Function,
            required: true,
        },
    },
};
</script>

<style scoped>
/* Styles specific to DeleteConfirmationDialog */
</style>
