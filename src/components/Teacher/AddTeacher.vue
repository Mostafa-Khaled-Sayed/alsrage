<template>
    <v-dialog
        v-model="localDialog"
        width="90%"
        @input="$emit('update:dialogAdded', $event)"
    >
        <v-card width="100%" class="popup">
            <div class="d-flex justify-space-between align-center title">
                <div>إضافة مشرف</div>
                <v-btn icon="mdi-close" @click="closeDialog"></v-btn>
            </div>
            <form @submit.prevent="submitForm" class="ma-auto">
                <v-text-field
                    v-model="user.name"
                    :rules="[(v) => !!v || 'الاسم مطلوب']"
                    type="text"
                    label="الاسم"
                    variant="outlined"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="user.email"
                    :rules="[
                        (v) => !!v || 'البريد الإلكتروني مطلوب',
                        (v) =>
                            /.+@.+\..+/.test(v) || 'البريد الإلكتروني غير صالح',
                    ]"
                    type="email"
                    label="بريد الكتروني"
                    variant="outlined"
                    required
                ></v-text-field>

                <v-select
                    style="width: 100%"
                    v-model="user.roles"
                    :items="roles"
                    :rules="[
                        (v) => (!!v && v.length > 0) || 'أختر نوع الصلاحية',
                    ]"
                    label="أختر نوع الصلاحية"
                    variant="outlined"
                    multiple
                    required
                ></v-select>

                <v-text-field
                    v-model="user.password"
                    :rules="[
                        (v) => !!v || 'كلمة المرور مطلوبة',
                        (v) =>
                            (v && v.length >= 6) ||
                            'يجب أن تكون كلمة المرور 6 أحرف على الأقل',
                    ]"
                    :type="showPassword ? 'text' : 'password'"
                    label="كلمة مرور"
                    variant="outlined"
                    required
                    :append-inner-icon="
                        showPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    @click:append-inner="toggleShowPassword"
                ></v-text-field>

                <v-btn
                    class="submit-btn d-flex align-center mt-4"
                    type="submit"
                    :loading="loading"
                    :disabled="loading"
                >
                    إضافة
                </v-btn>
            </form>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ["dialogAdded"],
    data() {
        return {
            localDialog: false,
            user: {
                name: "",
                email: "",
                roles: [],
                password: "",
            },
            roles: [], // Define default roles here or fetch them as needed
            showPassword: false,
            loading: false,
        };
    },
    methods: {
        closeDialog() {
            this.$emit("update:dialogAdded", false);
            // Resetting form fields manually
            this.user = {
                name: "",
                email: "",
                roles: [],
                password: "",
            };
        },
        toggleShowPassword() {
            this.showPassword = !this.showPassword;
        },
        submitForm() {
            // Handle form submission
            this.$emit("add-teacher", this.user); // Example of emitting the user data to the parent component
            this.closeDialog();
        },
    },
    watch: {
        dialogAdded(newVal) {
            this.localDialog = newVal; // Sync prop changes with local state
        },
        localDialog(newVal) {
            this.$emit("update:dialogAdded", newVal); // Emit changes to parent
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
