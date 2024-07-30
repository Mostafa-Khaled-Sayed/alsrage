<template>
    <div class="profile-container">
        <!-- <div class="header" v-if="user">
            <h2 class="welcome-text">مرحبا {{ user.name }}</h2>
            <div class="action-buttons">
                <v-btn color="primary ml-2" small @click="Edit"
                    >تعديل البيانات</v-btn
                >
                <v-btn color="#555" small @click="My_Logout">تسجيل خروج</v-btn>
            </div>
        </div> -->
        <div class="visible">
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
                        <v-breadcrumbs-item>
                            <img
                                src="../assets/profile/user.png"
                                alt=""
                                class="pluse"
                            />
                            <div>الملف الشخصي</div>
                        </v-breadcrumbs-item>
                    </v-breadcrumbs>
                </div>
                <div class="left">
                    <img
                        src="../assets/profile/edit-info.png"
                        alt=""
                        class="pluse pluse_1"
                    />
                    <img
                        src="../assets/profile/logout.png"
                        alt=""
                        class="pluse pluse_1"
                    />
                </div>
            </div>
            <v-container class="box d-flex align-center justify-space-around">
                <div class="hello_text">
                    مرحبًا {{ user.name }}، نشكرك على ثقتك في معهد السراج المنير
                    الأزهري، نتطلع سويًا لتحقيق مستقبل مشرق لأبنائنا.
                </div>
                <!-- <div class="form">
                    <div>
                        <img
                            src="../assets/profile/email.png"
                            alt=""
                            class="pluse"
                        />
                        <input type="email" value="example@gmail.com" />
                    </div>
                    <div>
                        <img
                            src="../assets/profile/call.png"
                            alt=""
                            class="pluse"
                        />
                        <input type="text" value="01099877866" />
                    </div>
                </div> -->
                <div class="children">
                    <div class="title">
                        <img
                            src="../assets/profile/children.png"
                            alt=""
                            class="pluse"
                        />
                        <div>الأبناء</div>
                    </div>
                    <div class="body">
                        <div
                            class="box"
                            v-for="child in children"
                            :key="child.id"
                        >
                            <div class="head">
                                <div class="name">{{ child.name }}</div>
                                <img
                                    src="../assets/profile/information.png"
                                    alt=""
                                    class="pluse"
                                    @click="goToChildDetails(child.id)"
                                />
                            </div>
                            <div class="grad">{{ child.gradeLevel }}</div>
                            <div class="class">
                                <div>فصل</div>
                                <div>3/1</div>
                            </div>
                        </div>
                    </div>
                </div>
            </v-container>
        </div>
        <v-card class="profile-card">
            <!-- <v-toolbar color="info" dark flat>
                <v-toolbar-title class="text-center"
                    >الصفحه الشخصيه</v-toolbar-title
                >
            </v-toolbar> -->

            <!-- <v-card-text>
                <v-row>
                    <v-col cols="12" sm="4">
                        <v-card class="info-card" style="height: 100%">
                            <v-card-title class="info-card-title text-center">
                                بياناتك الشخصيه
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text class="info-card-text">
                                <div v-if="!editingMode">
                                    <strong>الاسم:</strong>
                                    <div>{{ parent.name }}</div>
                                    <strong>الايميل:</strong>
                                    <div>{{ parent.email }}</div>
                                    <strong>رقم الهاتف:</strong>
                                    <div>{{ parent.phoneNumber }}</div>
                                </div>
                                <div v-else>
                                    <v-text-field
                                        v-model="editedParent.name"
                                        label="الاسم"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="editedParent.email"
                                        label="الايميل"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="editedParent.phoneNumber"
                                        label="رقم الهاتف"
                                    ></v-text-field>
                                </div>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-btn
                                    v-if="!editingMode"
                                    color="primary"
                                    @click="startEditing"
                                    >تعديل</v-btn
                                >
                                <v-btn
                                    v-else
                                    color="primary"
                                    @click="saveChanges"
                                    >حفظ</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="8">
                        <v-card class="info-card" style="height: 100%">
                            <v-card-title class="info-card-title text-center">
                                الأولاد المسجلين
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-row
                                    v-for="child in children"
                                    :key="child.id"
                                    class="child-info mb-3"
                                >
                                    <v-col
                                        cols="12"
                                        sm="4"
                                        class="d-flex flex-column align-center"
                                    >
                                        <strong class="text-h6">الاسم:</strong>
                                        <div>{{ child.name }}</div>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="4"
                                        class="d-flex flex-column align-center"
                                    >
                                        <strong class="text-h6"
                                            >الصف الدراسي:</strong
                                        >
                                        <div>{{ child.gradeLevel }}</div>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="4"
                                        class="d-flex align-center justify-center"
                                    >
                                        <v-btn
                                            color="info"
                                            small
                                            @click="goToChildDetails(child.id)"
                                        >
                                            عرض التفاصيل
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text> -->
        </v-card>
    </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useAuthStore } from "../store/userStore";
import { usenotification } from "../store/notification.js";
export default {
    data: () => ({
        items: ["بياناتك الشخصيه", "اطفالى"],
        children: [
            {
                id: 1,
                name: "محمد محمود علي",
                gradeLevel: "مرحلة رياض الأطفال الأولي",
            },
        ],
        parent: {
            name: "على احمد عبدالله",
            email: "parent@gmail.com",
            phoneNumber: "0105245841",
        },
        editedParent: {},
        editingMode: false,
    }),
    computed: {
        ...mapState(useAuthStore, ["user"]),
    },
    mounted() {
        this.get_notifications("parent_notification");
        this.get_notifications("student_notification");
    },
    methods: {
        ...mapActions(usenotification, ["get_notifications"]),
        ...mapActions(useAuthStore, ["logout"]),
        Edit() {
            this.$router.push({ name: "Edit_profile" });
        },
        async My_Logout() {
            try {
                this.logout();
                this.$router.push({ name: "home" });
            } catch (error) {
                console.error("حدث خطأ أثناء تسجيل الخروج:", error.message);
            }
        },
        goToChildDetails(childId) {
            this.$router.push({
                name: "ChildDetails",
                params: { id: childId },
            });
        },
        startEditing() {
            // نسخ بيانات الوالد للتعديل
            this.editedParent = { ...this.parent };
            this.editingMode = true;
        },
        saveChanges() {
            // حفظ التعديلات وتحديث البيانات
            this.parent = { ...this.editedParent };
            this.editingMode = false;
        },
    },
};
</script>

<style lang="scss" scoped>
* {
    direction: rtl;
}

.admin-card {
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
    align-items: center;
    .v-breadcrumbs-item:first-child {
        color: var(--main-color);
        cursor: pointer;
        font-size: 24px;
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .v-breadcrumbs {
        padding: 16px 0;
    }
}
.left {
    display: flex;
    align-items: center;
    gap: 15px;
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
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    max-width: 33%;
    & > div {
        width: 100%;

        position: relative;
    }
    .Top {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 250px;
        .v-img {
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
        }
        svg {
            position: absolute;
            top: 8px;
            left: 8px;
            width: 15px;
            height: 15px;
            padding: 6px;
            border-radius: 50%;
            cursor: pointer;
            color: #fff;
            z-index: 100000000000;
            background: var(--main-color);
            &:first-child {
                left: 40px;
            }
        }
    }
    .Bottom {
        padding: 10px;
        .title {
            font-size: 20px;
            color: var(--main-color);
            font-weight: bold;
            margin: 5px 0;
        }
        .time {
            display: flex;
            align-items: center;
            gap: 5px;
            color: var(--therd-color);
            font-weight: bold;
            margin-bottom: 20px;
            position: relative;
            font-size: 14px;
            &::before {
                content: "";
                position: absolute;
                bottom: -10px;
                left: 0;
                width: 100%;
                height: 4px;
                background: var(--secound-color);
            }
        }
        .description {
            font-weight: bold;
            color: var(--therd-color);
        }
    }
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
.hello_text {
    font-size: 20px;
    color: var(--therd-color);
    font-weight: bold;
}
.form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    div {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    img.pluse {
        width: 30px !important;
    }
    img.pluse.pluse_1 {
        width: 30px !important;
    }
}
.children {
    width: 100%;
    .title {
        width: 100%;
        background: var(--secound-color);
        padding: 10px;
        border-radius: 5px;
        color: var(--main-color);
        font-size: 22px;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .body {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
        margin-top: 20px;

        .box {
            box-shadow: 0 0 10px #ddd;
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 10px;
            border-radius: 5px;
            position: relative;
            gap: 5px;
            .head {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: var(--secound-color);
                padding: 10px;
                border-radius: 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                margin-top: 10px;
                img {
                    width: 35px;
                }
                .name {
                    font-size: 18px;
                    font-weight: bold;
                    color: var(--main-color);
                }
            }
            .grad {
                color: var(--therd-color);
                font-weight: bold;
                font-size: 15px;
                background: var(--secound-color);
                padding: 10px;
                border-radius: 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                margin-top: 10px;
            }
            .class {
                display: flex;
                align-items: center;
                gap: 5px;
                color: var(--pink-color);
                font-weight: bold;
                background: var(--secound-color);
                padding: 10px;
                border-radius: 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                margin-top: 10px;
            }
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
        justify-content: flex-start;
    }
}

img.pluse {
    width: 40px;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
}
img.pluse.pluse_1 {
    width: 30px;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
}
.visible {
    opacity: 0;
    animation: fadeIn 1s ease-in-out forwards;
    margin-top: 20px;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
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
</style>
