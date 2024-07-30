<template>
    <v-dialog
        v-model="dialog"
        width="90%"
        @input="$emit('update:dialog', $event)"
    >
        <v-card width="100%" class="popup">
            <div class="d-flex justify-space-between align-center title">
                <div>تعديل بيانات المشرف</div>
                <v-btn icon="mdi-close" @click="closeDialog"></v-btn>
            </div>
            <form ref="form" @submit.prevent="updateTeacher" class="ma-auto">
                <v-text-field
                    v-model="teacher.name"
                    type="text"
                    label="الاسم"
                    :rules="[(v) => !!v || 'الاسم مطلوب']"
                    variant="outlined"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="teacher.email"
                    type="email"
                    label="بريد الكتروني"
                    variant="outlined"
                    :rules="[
                        (v) => !!v || 'البريد الإلكتروني مطلوب',
                        (v) =>
                            /.+@.+\..+/.test(v) || 'البريد الإلكتروني غير صالح',
                    ]"
                    required
                ></v-text-field>

                <v-select
                    style="width: 100%"
                    v-model="teacher.roles"
                    :items="roles"
                    :rules="[
                        (v) => (!!v && v.length > 0) || 'أختر نوع الصلاحية',
                    ]"
                    label="أختر نوع الصلاحية"
                    variant="outlined"
                    multiple
                    required
                ></v-select>

                <v-btn
                    type="submit"
                    :loading="loading"
                    :disabled="loading"
                    class="submit-btn d-flex align-center mt-4"
                >
                    تعديل
                </v-btn>
            </form>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        dialog_1: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            dialog: this.dialog_1,
            teacher: {
                name: "",
                email: "",
                roles: [],
                Id: null,
            },
            roles: [], // Default roles or fetch as needed
            loading: false,
        };
    },
    watch: {
        dialog_1(val) {
            this.dialog = val;
        },
        dialog(val) {
            this.$emit("update:dialog_1", val);
        },
    },
    methods: {
        closeDialog() {
            this.dialog = false;
            this.$refs.form.reset();
        },
        updateTeacher() {
            // Call the function to update teacher
            this.$emit("update-teacher", this.teacher); // Emit the updated teacher object
            this.closeDialog();
        },
    },
};
</script>

<style scoped>
.popup {
    width: 100%;
}

.title {
    color: var(--main-color);
}

.submit-btn {
    width: 100%;
    padding: 20px;
    letter-spacing: normal;
    font-weight: bold;
    font-size: 19px;
    background: var(--main-color);
    color: #fff;
}
</style>
