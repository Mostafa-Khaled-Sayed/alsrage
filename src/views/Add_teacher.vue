<template>
    <div class="visible">
        <Offline_error>
            <template v-slot:default>
                <svg
                    style="
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 245px;
                    "
                    v-if="loading1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 200 200"
                >
                    <radialGradient
                        id="a12"
                        cx=".66"
                        fx=".66"
                        cy=".3125"
                        fy=".3125"
                        gradientTransform="scale(1.5)"
                    >
                        <stop offset="0" stop-color="#336699"></stop>
                        <stop
                            offset=".3"
                            stop-color="#336699"
                            stop-opacity=".9"
                        ></stop>
                        <stop
                            offset=".6"
                            stop-color="#336699"
                            stop-opacity=".6"
                        ></stop>
                        <stop
                            offset=".8"
                            stop-color="#336699"
                            stop-opacity=".3"
                        ></stop>
                        <stop
                            offset="1"
                            stop-color="#336699"
                            stop-opacity="0"
                        ></stop>
                    </radialGradient>
                    <circle
                        transform-origin="center"
                        fill="none"
                        stroke="url(#a12)"
                        stroke-width="15"
                        stroke-linecap="round"
                        stroke-dasharray="200 1000"
                        stroke-dashoffset="0"
                        cx="100"
                        cy="100"
                        r="70"
                    >
                        <animateTransform
                            type="rotate"
                            attributeName="transform"
                            calcMode="spline"
                            dur="2"
                            values="360;0"
                            keyTimes="0;1"
                            keySplines="0 0 1 1"
                            repeatCount="indefinite"
                        ></animateTransform>
                    </circle>
                    <circle
                        transform-origin="center"
                        fill="none"
                        opacity=".2"
                        stroke="#336699"
                        stroke-width="15"
                        stroke-linecap="round"
                        cx="100"
                        cy="100"
                        r="70"
                    ></circle>
                </svg>
                <div class="right">
                    <div>
                        <v-breadcrumbs>
                            <v-breadcrumbs-item
                                @click="$router.push('/admin')"
                                link
                            >
                                الإشراف
                            </v-breadcrumbs-item>
                            <v-breadcrumbs-divider />
                            <v-breadcrumbs-item>
                                إدارة المدرسين
                            </v-breadcrumbs-item>
                        </v-breadcrumbs>
                    </div>
                    <div class="left">
                        <img
                            src="../assets/add_admin/followers.png"
                            alt=""
                            @click="teacher.dialog = true"
                            class="pluse"
                        />
                    </div>
                </div>
                <v-dialog v-model="teacher.dialog" width="90%">
                    <v-card width="100%" class="popup">
                        <div
                            class="d-flex justify-space-between align-center title"
                        >
                            <div style="color: var(--main-color)">
                                إضافة مشرف
                            </div>
                            <v-btn
                                icon="mdi-close"
                                @click="teacher.dialog = false"
                            ></v-btn>
                        </div>
                        <form
                            ref="form"
                            @submit.prevent="teacher.add_teacher"
                            class="ma-auto"
                        >
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
                                        /.+@.+\..+/.test(v) ||
                                        'البريد الإلكتروني غير صالح',
                                ]"
                                type="email"
                                label="بريد الكتروني"
                                variant="outlined"
                                required
                            ></v-text-field>

                            <v-select
                                style="width: 100%"
                                v-model="user.roles"
                                :items="teacher.role"
                                :rules="[
                                    (v) =>
                                        (!!v && v.length > 0) ||
                                        'أختر نوع الصلاحية',
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
                                :type="
                                    teacher.show_Password ? 'text' : 'password'
                                "
                                label="كلمة مرور"
                                variant="outlined"
                                required
                                :append-inner-icon="
                                    teacher.show_Password
                                        ? 'mdi-eye'
                                        : 'mdi-eye-off'
                                "
                                @click:append-inner="
                                    teacher.toggle_Show_Password
                                "
                            ></v-text-field>
                            <v-btn
                                class="d-flex align-center mt-4"
                                type="submit"
                                :loading="loading"
                                :disabled="loading"
                                style="
                                    width: 100%;
                                    padding: 20px;
                                    letter-spacing: normal;
                                    font-weight: bold;
                                    font-size: 19px;
                                    background: var(--main-color);
                                    color: #fff;
                                "
                            >
                                إضافة
                            </v-btn>
                        </form>
                    </v-card></v-dialog
                >

                <v-dialog v-model="teacher.dialog_1" width="90%">
                    <v-card width="100%" class="popup">
                        <div
                            class="d-flex justify-space-between align-center title"
                        >
                            <div style="color: var(--main-color)">
                                تعديل بينات المشرف
                            </div>
                            <v-btn
                                icon="mdi-close"
                                @click="teacher.dialog_1 = false"
                            ></v-btn>
                        </div>
                        <form
                            ref="form"
                            @submit.prevent="
                                teacher.Update_teacher(teacher.Id_Information)
                            "
                            class="ma-auto"
                        >
                            <v-text-field
                                v-model="teacher.name_Information"
                                type="text"
                                label=" الاسم"
                                :rules="[(v) => !!v || 'الاسم مطلوب']"
                                variant="outlined"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="teacher.email_Information"
                                type="email"
                                label="بريد الكتروني"
                                variant="outlined"
                                :rules="[
                                    (v) => !!v || 'البريد الإلكتروني مطلوب',
                                    (v) =>
                                        /.+@.+\..+/.test(v) ||
                                        'البريد الإلكتروني غير صالح',
                                ]"
                                required
                            ></v-text-field>
                            <v-select
                                style="width: 100%"
                                v-model="teacher.roles_Information"
                                :items="teacher.role"
                                :rules="[
                                    (v) =>
                                        (!!v && v.length > 0) ||
                                        'أختر نوع الصلاحية',
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
                                class="d-flex align-center mt-4"
                                style="
                                    width: 100%;
                                    padding: 20px;
                                    letter-spacing: normal;
                                    font-weight: bold;
                                    font-size: 19px;
                                    background: var(--main-color);
                                    color: #fff;
                                "
                            >
                                تعديل
                            </v-btn>
                        </form>
                    </v-card></v-dialog
                >
                <Empty_error v-if="empty === true" :text="text0" />
                <v-container
                    class="box d-flex align-center justify-space-around"
                    width="90%"
                    v-if="(!loading1, empty === false)"
                >
                    <div class="feat" v-for="user in users" :key="user.id">
                        <v-dialog v-model="dialog_3" width="90%">
                            <v-card width="100%" class="popup">
                                <div
                                    class="d-flex justify-space-between align-center title"
                                >
                                    <div style="color: var(--main-color)">
                                        تأكيد الحذف!
                                    </div>
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
                                                teacher.delete_user(
                                                    teacher.Id_Information
                                                )
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
                                <template
                                    v-slot:activator="{ props: activatorProps }"
                                >
                                    <div
                                        class="show_password"
                                        v-bind="activatorProps"
                                    >
                                        <font-awesome-icon
                                            :icon="['fas', 'lock-open']"
                                        />
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
                                            <div id="password">
                                                {{ user.password }}
                                            </div>
                                            <div>
                                                <div>
                                                    <font-awesome-icon
                                                        :icon="['fas', 'copy']"
                                                        @click="
                                                            Snackbar_Function
                                                        "
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
        </Offline_error>
    </div>
    <v-snackbar v-model="snackbar1" timeout="3000">
        {{ text }}

        <template v-slot:actions>
            <v-btn
                color="var(--main-color)"
                variant="text"
                @click="snackbar1 = false"
            >
                إغلاق
            </v-btn>
        </template>
    </v-snackbar>
    <confirm_message
        v-if="snackbar === true"
        :text="text10"
        :snackbar1="snackbar"
    />
    <confirm_message
        v-if="snackbar2 === true"
        :text="text11"
        :snackbar1="snackbar2"
    />
    <confirm_message
        v-if="snackbar3 === true"
        :text="text12"
        :snackbar1="snackbar3"
    />
</template>

<script scoped>
import { storeToRefs } from "pinia";
// import { defineComponent } from "vue";
import { useteacher } from "@/store/teacher.js";
import Offline_error from "@/components/Offline_error.vue";
import Empty_error from "@/components/Empty_error.vue";
import confirm_message from "@/components/confirm_message.vue";
export default {
    inject: ["Emitter"],
    components: {
        confirm_message,
        Empty_error,
        Offline_error,
    },
    setup() {
        const teacher = useteacher();
        teacher.Get_data();
        teacher.generate_Random_Password();
        const {
            user,
            add_teacher,
            toggle_Show_Password,
            dialog,
            dialog_3,
            delete_user,
            Get_data,
            users,
            role,
            show_Password,
            dialog_1,
            text10,
            text11,
            text12,
            snackbar3,
            snackbar,
            snackbar2,
            empty,
            text0,
            loading1,
            loading,
            Update_teacher,
            copy_Password,
            generate_Random_Password,
            user_Information,
        } = storeToRefs(teacher);
        // Return the necessary reactive properties and methods
        return {
            teacher,
            loading,
            loading1,
            dialog_3,
            text10,
            text11,
            text12,
            snackbar3,
            snackbar,
            snackbar2,
            empty,
            text0,
            generate_Random_Password,
            user,
            toggle_Show_Password,
            role,
            copy_Password,
            show_Password,
            Update_teacher,
            delete_user,
            Get_data,
            user_Information,
            users,
            add_teacher,
            dialog,
            dialog_1,
        };
    },

    data: () => ({
        snackbar1: false,
        text: `تم نسخ كلمة المرور`,
    }),
    methods: {
        Snackbar_Function() {
            const passwordElement = document.getElementById("password");
            const password =
                passwordElement.innerText || passwordElement.textContent;

            // استخدام واجهة برمجة تطبيقات الحافظة لنسخ النص
            navigator.clipboard
                .writeText(password)
                .then(() => {
                    console.log("تم نسخ كلمة المرور بنجاح!");
                    this.snackbar1 = true;
                })
                .catch((err) => {
                    console.error("فشل في نسخ كلمة المرور: ", err);
                });
        },
    },
};
</script>
<style lang="scss" scoped>
form {
    padding: 20px;
    width: 100%;
}
.popup .title {
    padding: 20px 20px 0 !important;
    font-size: 23px;
    font-weight: bold;
    color: var(--main-color);
    position: relative;
    margin-bottom: 15px;
    &::before {
        content: "";
        position: absolute;
        bottom: -15px;
        height: 3px;
        width: calc(100% - 40px);
        background: var(--secound-color);
        left: 50%;
        transform: translateX(-50%);
    }
}
.v-btn--icon.v-btn--density-default {
    color: var(--main-color);
    width: auto;
    height: auto;
    box-shadow: none;
    &:hover {
        background: #fff;
    }
}
.box {
    flex-wrap: wrap;
    gap: 10px;
}
.job {
    width: 25% !important;
    margin-bottom: 10px;
    .title {
        background: var(--main-color);
        padding: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 5px;
        color: white;
        font-weight: bold;
        font-size: 20px;
        & > div {
            display: flex;
            align-items: center;
            gap: 10px;
            &.left {
                svg {
                    color: var(--main-color);
                    cursor: pointer;
                    transition: 0.3s;
                    background: #fff;
                    padding: 10px;
                    border-radius: 5px;
                    &:hover {
                        color: var(--therd-color);
                    }
                }
            }
        }
    }
}

.teacher-card {
    padding: 68px;
    background-color: #2196f333;
}
.right {
    width: 90% !important;
    margin: auto;
    font-weight: bold;
    font-size: 20px;
    border-bottom: 5px solid var(--secound-color);
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: end;
    .v-breadcrumbs-item:first-child {
        color: var(--main-color);
        cursor: pointer;
        font-size: 24px;
    }
    .v-breadcrumbs {
        padding: 16px 0;
    }
}
.v-container {
    margin: 20px auto !important;
    flex-wrap: wrap;
    padding: 0;
    justify-content: flex-start !important;
    flex-direction: column;
    gap: 40px;
}
.card {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    font-size: 20px;
    color: var(--main-color);
    font-weight: bold;
    padding: 20px;
    text-align: center;
    width: 100%;
}
.feat {
    width: 100%;
    box-shadow: 0 0 10px #ddd;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        margin-bottom: 15px;
        &::before {
            content: "";
            position: absolute;
            bottom: -15px;
            height: 3px;
            width: 100%;
            background: var(--secound-color);
        }
        & > div {
            display: flex;
            align-items: center;
            gap: 5px;
            .number {
                background: var(--main-color);
                color: #fff;
                border-radius: 5px;
                font-weight: bold;
                font-size: 18px;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .name {
                font-size: 20px;
                color: var(--main-color);
                font-weight: bold;
            }
            svg {
                color: var(--main-color);
                font-size: 20px;
                cursor: pointer;

                &:hover {
                    color: var(--therd-color);
                }
            }
        }
    }
    .body {
        & > div {
            font-weight: bold;
            font-size: 19px;
            color: var(--therd-color);
            margin: 20px 0 5px;
        }
        ul {
            color: var(--therd-color);
            font-weight: bold;
            font-size: 16px;
            li {
                list-style-type: square;
                list-style-position: inside;
            }
        }
    }
    .footer {
        .show_password {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            background: var(--main-color);
            width: 100%;
            padding: 10px;
            color: #fff;
            border-radius: 5px;
            cursor: pointer;
            &:hover {
                background-color: var(--therd-color);
            }
        }
    }
}
.v-card.v-theme--light.v-card--density-default.v-card--variant-elevated {
    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 10px 0;
        font-size: 23px;
        color: var(--main-color);
        font-weight: bold;
        position: relative;
        margin-bottom: 20px;
        svg {
            cursor: pointer;
            padding: 10px;
        }
        &::before {
            content: "";
            position: absolute;
            bottom: -10px;
            left: 50%;
            height: 4px;
            width: 95%;
            background: var(--secound-color);
            transform: translateX(-50%);
        }
    }
    .body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        color: var(--therd-color);
        background: var(--secound-color);
        margin: 0 10px 10px;
        border-radius: 5px;
        svg {
            color: var(--main-color);
            font-size: 18px;
            cursor: pointer;
        }
    }
}
@media (max-width: 599px) {
}
@media (min-width: 600px) and (max-width: 768px) {
}
@media (min-width: 769px) {
    .v-container {
        flex-direction: row;
        gap: 15px;
        align-items: stretch !important;
    }
    .card {
        width: 32%;
    }
    .feat {
        width: 32%;
        justify-content: space-between;
    }
}
img {
    width: 50px;
}
img.pluse {
    width: 40px;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
}
.visible {
    opacity: 0;
    animation: fadeIn 1s ease-in-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
