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
                            <v-breadcrumbs-item
                                >التقديم على الوظائف</v-breadcrumbs-item
                            >
                        </v-breadcrumbs>
                    </div>
                    <div class="left">
                        <v-menu>
                            <template v-slot:activator="{ props }">
                                <span
                                    v-if="jobs.counter.counter !== 0"
                                    style="
                                        width: 15px;
                                        background-color: #e23636;
                                        color: white;
                                        border-radius: 50% 50%;
                                        text-align: center;
                                        display: inline-block;
                                        position: relative;
                                        top: -20px;
                                        left: -20px;
                                        transform: translate(50%, 50%);
                                        font-size: 12px;
                                    "
                                >
                                    {{ jobs.counter.counter }}
                                </span>
                                <span>
                                    <v-icon
                                        class="icon"
                                        v-bind="props"
                                        @click="jobs.Update_counter"
                                        >mdi-bell-outline</v-icon
                                    >
                                </span>
                            </template>
                            <v-list>
                                <v-list-item v-if="empty0 === true">
                                    <v-list-item-title>
                                        <Empty_error :text="text2" />
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item
                                    v-for="notification in notifications"
                                    :key="notification.id"
                                    @click="
                                        jobs.delete_notifications(
                                            notification.id
                                        )
                                    "
                                >
                                    <v-list-item-title
                                        v-if="empty0 === false"
                                        >{{
                                            notification.text
                                        }}</v-list-item-title
                                    >
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <font-awesome-icon
                            @click="dialog = true"
                            :icon="['fas', 'plus']"
                        />
                    </div>
                </div>

                <v-dialog v-model="dialog" width="90%">
                    <v-card width="100%" class="popup">
                        <div
                            class="d-flex justify-space-between align-center title"
                        >
                            <div style="color: var(--main-color)">
                                إضافة وظيفة
                            </div>
                            <v-btn
                                icon="mdi-close"
                                @click="dialog = false"
                            ></v-btn>
                        </div>
                        <form
                            ref="form"
                            @submit.prevent="jobs.Add_Jobs"
                            class="ma-auto mt-4"
                        >
                            <v-text-field
                                v-model="Job.title"
                                :rules="[
                                    (v) => !!v || 'الرجاء إدخال عنوان الوظيفة',
                                ]"
                                type="text"
                                label="عنوان"
                                variant="outlined"
                                required
                            ></v-text-field>
                            <div class="card">
                                <v-textarea
                                    v-model="Job.description"
                                    :rules="[
                                        (v) => !!v || 'الرجاء إدخال وصف قصير',
                                        (v) =>
                                            (v && v.length <= 150) ||
                                            'يجب أن يكون الوصف 150 حرفًا كحد أقصى',
                                    ]"
                                    label="وصف قصير"
                                    :counter="150"
                                    variant="outlined"
                                    required
                                    rows="4"
                                    no-resize
                                    :minlength="10"
                                    :maxlength="150"
                                ></v-textarea>
                            </div>
                            <v-btn
                                type="submit"
                                :loading="loading"
                                :disabled="loading"
                                class="d-flex align-center mb-4"
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
                                نشر
                            </v-btn>
                        </form>
                    </v-card></v-dialog
                >
                <v-dialog v-model="dialog_1" width="90%">
                    <v-card width="100%" class="popup">
                        <div
                            class="d-flex justify-space-between align-center title"
                        >
                            <div style="color: var(--main-color)">
                                تعديل الوظيفة
                            </div>
                            <v-btn
                                icon="mdi-close"
                                @click="dialog_1 = false"
                            ></v-btn>
                        </div>
                        <form
                            ref="form"
                            @submit.prevent="
                                jobs.Update_Jobs(jobs.Id_Information)
                            "
                            class="ma-auto mt-4"
                        >
                            <v-text-field
                                v-model="jobs.Title_Information"
                                :rules="[
                                    (v) => !!v || 'الرجاء إدخال عنوان الوظيفة',
                                ]"
                                type="text"
                                label="عنوان"
                                variant="outlined"
                                required
                            ></v-text-field>
                            <br />

                            <div class="card">
                                <v-textarea
                                    v-model="jobs.Description_Information"
                                    :rules="[
                                        (v) => !!v || 'الرجاء إدخال وصف قصير',
                                        (v) =>
                                            (v && v.length <= 150) ||
                                            'يجب أن يكون الوصف 150 حرفًا كحد أقصى',
                                    ]"
                                    label="وصف قصير"
                                    :counter="150"
                                    required
                                    rows="4"
                                    no-resize
                                    variant="outlined"
                                    :minlength="10"
                                    :maxlength="150"
                                ></v-textarea>
                            </div>
                            <v-btn
                                type="submit"
                                :loading="loading"
                                :disabled="loading"
                                class="d-flex align-center mb-4"
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
                <Empty_error v-if="empty2 === true" :text="text0" />
                <v-container
                    style="direction: ltr !important"
                    v-if="(!loading1, empty2 === false)"
                >
                    <div class="feat" v-for="Job in Jobs" :key="Job.id">
                        <div>
                            <div class="header">
                                <div class="small_container">
                                    <div class="title">{{ Job.title }}</div>
                                    <div>
                                        <font-awesome-icon
                                            @click="jobs.Job_Information(Job)"
                                            :icon="['fas', 'edit']"
                                            @click.="dialog_1 = true"
                                        />
                                        <font-awesome-icon
                                            @click="jobs.Job_Information(Job)"
                                            @click.="jobs.dialog_3 = true"
                                            :icon="['fas', 'trash']"
                                        />
                                    </div>
                                </div>
                                <div class="time">
                                    <font-awesome-icon
                                        :icon="['fas', 'clock']"
                                    />
                                    <div>
                                        {{ Job.time.toDate().toLocaleString() }}
                                    </div>
                                </div>
                            </div>
                            <div class="body">
                                <div class="title">متطلبات العمل</div>
                                <ul>
                                    <li>{{ Job.description }}</li>
                                </ul>
                            </div>
                        </div>
                        <div
                            class="footer"
                            @click="
                                (jobs.dialog_4 = true),
                                    jobs.Job_Information(Job),
                                    jobs.Get_applies(Job.applies)
                            "
                        >
                            ({{ Job.applies.length || 0 }}) طلبات التقديم
                        </div>
                        <!-- Dialog for Job Applications -->
                        <v-dialog v-model="jobs.dialog_4" width="90%">
                            <v-card width="100%" class="popup">
                                <div
                                    class="d-flex justify-space-between align-center title"
                                >
                                    <div style="color: var(--main-color)">
                                        طلبات التقديم
                                    </div>
                                    <v-btn
                                        icon="mdi-close"
                                        @click="jobs.dialog_4 = false"
                                    ></v-btn>
                                </div>
                                <!-- Loop through Job Applications -->
                                <div
                                    v-if="loading3"
                                    style="height: 200px !important"
                                >
                                    <svg
                                        style="
                                            position: absolute;
                                            top: 50%;
                                            left: 50%;
                                            transform: translate(-50%, -50%);
                                            width: 150px;
                                        "
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
                                            <stop
                                                offset="0"
                                                stop-color="#336699"
                                            ></stop>
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
                                </div>
                                <Empty_error
                                    v-if="(loading3 === false, empty1 === true)"
                                    :text="text1"
                                />
                                <v-container
                                    v-if="
                                        (empty1 === false, loading3 === false)
                                    "
                                    style="
                                        direction: ltr !important;
                                        width: 96% !important;
                                        max-width: 96% !important;
                                    "
                                    class="box d-flex align-center justify-space-around"
                                >
                                    <div
                                        class="feat"
                                        v-for="Apply in apply"
                                        :key="Apply.id"
                                    >
                                        <div class="header">
                                            <div class="small_container">
                                                <div class="title">
                                                    {{ Apply.name }}
                                                </div>
                                                <div>
                                                    <font-awesome-icon
                                                        icon="fas fa-trash"
                                                        @click="
                                                            (jobs.dialog_9 = true),
                                                                jobs.Job_Information(
                                                                    Job
                                                                ),
                                                                jobs.Apply_Information(
                                                                    Apply
                                                                )
                                                        "
                                                    />
                                                </div>
                                            </div>
                                            <div class="time">
                                                <font-awesome-icon
                                                    icon="fas fa-envelope"
                                                />
                                                <div>{{ Apply.email }}</div>
                                            </div>
                                            <div class="time">
                                                <font-awesome-icon
                                                    icon="fas fa-clock"
                                                />
                                                {{
                                                    Apply.time
                                                        .toDate()
                                                        .toLocaleString()
                                                }}
                                            </div>
                                            <div class="time">
                                                <font-awesome-icon
                                                    icon="fas fa-phone"
                                                />
                                                {{ Apply.phone }}
                                            </div>
                                        </div>
                                        <div class="body">
                                            <div class="phone">
                                                وصف قصير:<br />
                                                {{ Apply.description }}
                                            </div>
                                        </div>
                                        <a class="footer" :href="Apply.CV"
                                            >CV</a
                                        >
                                    </div>
                                </v-container>
                            </v-card></v-dialog
                        >
                    </div>
                </v-container>
            </template>
        </Offline_error>
    </div>
    <v-dialog v-model="dialog_3" width="90%">
        <v-card width="100%" class="popup">
            <div class="d-flex justify-space-between align-center title">
                <div style="color: var(--main-color)">تأكيد الحذف!</div>
                <v-btn icon="mdi-close" @click="dialog_3 = false"></v-btn>
            </div>

            <p
                style="
                    padding: 20px;
                    color: var(--therd-color);
                    font-weight: bold;
                "
            >
                هل أنت متأكد من حذفك لهذه الوظيفة؟
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
                        @click="jobs.delete_Job(Id_Information)"
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
    ><v-dialog v-model="dialog_9" width="90%">
        <v-card width="100%" class="popup">
            <div class="d-flex justify-space-between align-center title">
                <div style="color: var(--main-color)">تأكيد الحذف!</div>
                <v-btn icon="mdi-close" @click="dialog_9 = false"></v-btn>
            </div>

            <p
                style="
                    padding: 20px;
                    color: var(--therd-color);
                    font-weight: bold;
                "
            >
                هل أنت متأكد من حذفك لهذه الطلب؟
            </p>
            <v-card-text>
                <div class="d-flex align-center">
                    <v-btn
                        type="submit"
                        color="var(--main-color)"
                        :loading="loading"
                        :disabled="loading"
                        @click="dialog_9 = false"
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
                            jobs.Delete_Apply(
                                id_Information,
                                Id_Information,
                                CV_Information
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
    <confirm_message
        v-if="snackbar === true"
        :text="text10"
        v-model="snackbar"
    />
    <confirm_message
        v-if="snackbar2 === true"
        :text="text11"
        v-model="snackbar2"
    />
    <confirm_message
        v-if="snackbar3 === true"
        :text="text12"
        v-model="snackbar3"
    />
</template>

<script>
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { useJobs } from "@/store/job.js";
import Offline_error from "@/components/Offline_error.vue";
import Empty_error from "@/components/Empty_error.vue";
import confirm_message from "@/components/confirm_message.vue";
export default defineComponent({
    inject: ["Emitter"],
    components: {
        Empty_error,
        confirm_message,
        Offline_error,
    },
    setup() {
        const jobs = useJobs();
        jobs.Get_data();
        jobs.Get_Apply_data();
        jobs.Get_notifications_data();
        jobs.counter_display();
        // Destructure reactive references and methods from Jobs store
        const {
            Job,
            Jobs,
            dialog_3,
            loading3,
            dialog_9,
            text10,
            text11,
            text12,
            snackbar3,
            snackbar,
            snackbar2,
            text0,
            text1,
            text2,
            empty1,
            empty0,
            empty2,
            Delete_Apply,
            CV_Information,
            Apply_Information,
            id_Information,
            Id_Information,
            applies,
            Apply,
            loading,
            Get_Apply_data,
            Add_Apply,
            Add_Jobs,
            dialog,
            dialog_1,
            delete_Job,
            Get_data,
            notifications,
            text,
            Update_counter,
            Job_Information,
            progress,
            Get_applies,
            loading1,
            apply,
            counter_display,
            counter,
            delete_notifications,
            Get_notifications_data,
        } = storeToRefs(jobs);

        // Return the necessary reactive properties and methods
        return {
            Job,
            dialog_3,
            loading3,
            loading1,
            text10,
            text11,
            text12,
            snackbar3,
            snackbar,
            snackbar2,
            CV_Information,
            id_Information,
            Id_Information,
            dialog_9,
            loading,
            text0,
            text1,
            text2,
            empty1,
            empty0,
            empty2,
            Apply_Information,
            Delete_Apply,
            applies,
            counter_display,
            Update_counter,
            delete_notifications,
            Get_notifications_data,
            Apply,
            counter,
            notifications,
            text,
            Get_applies,
            Get_Apply_data,
            Add_Apply,
            Add_Jobs,
            delete_Job,
            Job_Information,
            Get_data,
            Jobs,
            jobs,
            apply,
            dialog,
            dialog_1,
            progress,
        };
    },
});
</script>
<style lang="scss" scoped>
form {
    width: 96.5%;
    margin: auto;
}
.bg-error {
    --v-theme-overlay-multiplier: var(--v-theme-error-overlay-multiplier);
    background-color: rgb(var(--v-theme-error)) !important;
    color: rgb(var(--v-theme-on-error)) !important;
    display: none;
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
    }
    .v-breadcrumbs {
        padding: 16px 0;
    }
}
.left {
    svg {
        cursor: pointer;
        &:hover {
            color: var(--therd-color);
        }
    }
}
.v-container {
    margin: 20px auto !important;
    flex-wrap: wrap;
    padding: 0;
    justify-content: flex-start !important;
    flex-direction: column;
    gap: 40px;
    width: 90%;
    display: flex;
}

.feat {
    width: 100%;
    box-shadow: 0 0 10px #ddd;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
    justify-content: space-between;
    .header {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        position: relative;
        svg {
            cursor: pointer;
            color: var(--main-color);
            &:hover {
                color: var(--therd-color);
            }
        }

        &::before {
            content: "";
            position: absolute;
            bottom: -5px;
            left: 50%;
            height: 4px;
            width: calc(100% - 20px);
            background: var(--secound-color);
            transform: translateX(-50%);
        }
        .small_container {
            display: flex;
            align-items: center;
            justify-content: space-between;

            & > div {
                font-size: 20px;
                font-weight: bold;
                color: var(--main-color);
                display: flex;
                align-items: center;
                gap: 10px;
                color: var(--main-color);
            }
        }
        .time {
            display: flex;
            align-items: center;
            gap: 5px;
            color: var(--therd-color);
            font-weight: bold;
            font-size: 14px;
        }
    }
    .body {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        .title {
            font-size: 18px;
            font-weight: bold;
            color: var(--therd-color);
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
        .phone {
            color: var(--therd-color);
            font-weight: bold;
            font-size: 16px;
        }
    }
    .footer {
        background: var(--main-color);
        color: #fff;
        padding: 10px;
        border-radius: 5px;
        text-align: center;
        font-weight: bold;
        cursor: pointer;
        &:hover {
            background: var(--therd-color);
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

    .feat {
        width: 32%;
    }
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
