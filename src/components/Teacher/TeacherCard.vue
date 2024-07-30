<!-- TeacherCard.vue -->
<template>
    <v-container
        class="box d-flex align-center justify-space-around"
        width="90%"
        v-if="!loading1"
    >
        <div class="feat" v-for="user in users" :key="user.id">
            <v-dialog v-model="dialog_3" width="90%">
                <v-card width="100%" class="popup">
                    <div
                        class="d-flex justify-space-between align-center title"
                    >
                        <div style="color: var(--main-color)">تأكيد الحذف!</div>
                        <v-btn
                            icon="mdi-close"
                            @click="dialog_3 = false"
                        ></v-btn>
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
                                type="submit"
                                color="var(--main-color)"
                                :loading="loading"
                                :disabled="loading"
                                @click="dialog_3 = false"
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
                                type="submit"
                                color="var(--pink-color)"
                                :loading="loading"
                                :disabled="loading"
                                @click="
                                    teacher.delete_user(teacher.Id_Information)
                                "
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
                </v-card></v-dialog
            >
            <div>
                <div class="head">
                    <div>
                        <div class="name">{{ user.name }}</div>
                    </div>
                    <div>
                        <font-awesome-icon
                            :icon="['fas', 'user-pen']"
                            @click="teacher.user_Information(user)"
                            @click.="dialog_1 = true"
                        />
                        <font-awesome-icon
                            :icon="['fas', 'trash']"
                            @click="teacher.user_Information(user)"
                            @click.="dialog_3 = true"
                        />
                    </div>
                </div>
                <div class="body">
                    <div>الصلاحيات</div>
                    <ul v-for="index in user.roles" :key="index">
                        <li>{{ index }}</li>
                    </ul>
                </div>
            </div>
            <div class="footer">
                <v-dialog max-width="500">
                    <template v-slot:activator="{ props: activatorProps }">
                        <div class="show_password" v-bind="activatorProps">
                            <font-awesome-icon :icon="['fas', 'lock-open']" />
                            <div>عرض كلمة المرور</div>
                        </div>
                    </template>

                    <template v-slot:default="{ isActive }">
                        <v-card>
                            <div class="head">
                                <div>كلمة مرور</div>
                                <font-awesome-icon
                                    :icon="['fas', 'xmark']"
                                    @click="isActive.value = false"
                                />
                            </div>
                            <div class="body">
                                <div id="password">{{ user.password }}</div>
                                <div>
                                    <div>
                                        <font-awesome-icon
                                            :icon="['fas', 'copy']"
                                            @click="Snackbar_Function"
                                            @click.prevent="
                                                isActive.value = false
                                            "
                                        />
                                    </div>
                                </div>
                            </div>
                        </v-card>
                    </template>
                </v-dialog>
            </div>
        </div>
    </v-container>
</template>

<script>
export default {
    props: {
        user: Object,
        showEditDialog: Function,
        showDeleteDialog: Function,
        copyPassword: Function,
    },
};
</script>

<style scoped>
/* Styles specific to TeacherCard */
</style>
