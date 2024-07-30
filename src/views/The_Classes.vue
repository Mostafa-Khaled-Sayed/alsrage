<template>
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
            <!-- الرموز والدوائر للرسم التوضيحي -->
        </svg>
        <div class="right">
            <div>
                <v-breadcrumbs>
                    <v-breadcrumbs-item @click="$router.push('/admin')" link>
                        الإشراف
                    </v-breadcrumbs-item>
                    <v-breadcrumbs-divider />
                    <v-breadcrumbs-item>الفصول الدراسية</v-breadcrumbs-item>
                </v-breadcrumbs>
            </div>
        </div>

        <v-container>
            <div
                class="feat"
                v-for="classroom in class_rooms"
                :key="classroom.id"
            >
                <div
                    v-if="
                        user.roles.includes(classroom.grade) ||
                        user.roles.includes('الكل')
                    "
                >
                    <div class="feat2">
                        <div class="title">
                            <div>{{ classroom.grade }}</div>
                            <!-- تحديث الزرار لاستخدام goToClassroom -->
                            <div
                                class="button"
                                @click="goToClassroom(classroom.grade)"
                            >
                                الطلاب
                            </div>
                        </div>
                        <div class="charts">
                            <div class="box">
                                <div>
                                    <canvas
                                        :id="'myChart_' + classroom.id"
                                    ></canvas>
                                </div>
                                <ul>
                                    <li class="li">
                                        <font-awesome-icon
                                            :icon="['fas', 'graduation-cap']"
                                        />
                                        <div>الطلاب</div>
                                        <div>
                                            <span>{{
                                                classroom.students
                                                    .total_students
                                            }}</span>
                                            طالب
                                        </div>
                                    </li>
                                    <li>
                                        <div>ذكر</div>
                                        <div>
                                            <span>{{
                                                classroom.students.male
                                            }}</span>
                                            طالب
                                        </div>
                                    </li>
                                    <li>
                                        <div>أنثى</div>
                                        <div>
                                            <span>{{
                                                classroom.students.female
                                            }}</span>
                                            طالبة
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div
                                class="box"
                                v-if="
                                    user.roles.includes(
                                        'الاطلاع على الحسابات'
                                    ) || user.roles.includes('الكل')
                                "
                            >
                                <div>
                                    <canvas
                                        :id="'myChart_1_' + classroom.id"
                                    ></canvas>
                                </div>
                                <ul>
                                    <li class="li">
                                        <font-awesome-icon
                                            :icon="['fas', 'money-bills']"
                                        />
                                        <div>المصروفات المستحقة</div>
                                        <div>
                                            <span>{{
                                                classroom.fees.due_fees
                                            }}</span>
                                            جنية
                                        </div>
                                    </li>
                                    <li>
                                        <div>المصروفات المدفوعة</div>
                                        <div>
                                            <span>{{
                                                classroom.fees.paid_fees
                                            }}</span>
                                            جنية
                                        </div>
                                    </li>
                                    <li>
                                        <div>المصروفات المتبقية</div>
                                        <div>
                                            <span>{{
                                                classroom.fees.remaining_fees
                                            }}</span>
                                            جنية
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
import { ref, watch, onMounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import Chart from "chart.js/auto";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBdk3sqIHjXvB2C-O-lvkRgMFpg8pemkno",
    authDomain: "alseraj--almoner.firebaseapp.com",
    projectId: "alseraj--almoner",
    storageBucket: "alseraj--almoner.appspot.com",
    messagingSenderId: "462211256149",
    appId: "1:462211256149:web:a03ace3c70b306620169dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
import { mapState } from "pinia";
import { useAuthStore } from "../store/userStore";
export default {
    name: "The_Classes",
    computed: {
        ...mapState(useAuthStore, ["user"]),
    },
    mounted() {
        this.spliceRoles();
    },
    methods: {
        spliceRoles() {
            // Remove "مشرف" from each role
            let splicedRoles = this.user.roles.map((role) =>
                role.replace("مشرف ", "")
            );
            this.user.roles = splicedRoles;
        },
    },
    setup() {
        const route = useRoute();
        const router = useRouter(); // استخدام useRouter هنا
        const classId = ref(route.params.id);
        const class_rooms = ref([]);
        const loading1 = ref(false);
        const sortDataByRanking = (data) => {
            return data.sort((a, b) => a.Ranking - b.Ranking);
        };

        watch(
            () => route.params.id,
            (newId) => {
                classId.value = newId;
            }
        );

        const getData = async () => {
            try {
                loading1.value = true;

                const querySnapshot = await getDocs(
                    collection(db, "class_rooms")
                );
                let fetchedData = querySnapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() };
                });

                // ترتيب البيانات حسب Ranking
                fetchedData = sortDataByRanking(fetchedData);
                class_rooms.value = fetchedData;

                nextTick(() => {
                    class_rooms.value.forEach((classroom) => {
                        createChart("myChart_" + classroom.id, [
                            classroom.students.male,
                            classroom.students.female,
                        ]);
                        createChart_1("myChart_1_" + classroom.id, [
                            classroom.fees.paid_fees,
                            classroom.fees.remaining_fees,
                        ]);
                    });
                });
                loading1.value = false;
            } catch (error) {
                console.error("Error fetching documents: ", error);
            }
        };

        const createChart = (id, data) => {
            const ctx = document.getElementById(id);
            if (ctx) {
                new Chart(ctx, {
                    type: "pie",
                    data: {
                        datasets: [
                            {
                                label: "الطلاب",
                                data: data,
                                backgroundColor: ["#336699", "#d8588c"],
                                hoverOffset: 4,
                            },
                        ],
                    },
                });
            }
        };

        const createChart_1 = (id, data) => {
            const ctx = document.getElementById(id);
            if (ctx) {
                new Chart(ctx, {
                    type: "doughnut",
                    data: {
                        datasets: [
                            {
                                label: "المصروفات",
                                data: data,
                                backgroundColor: ["#336699", "#d8588c"],
                                hoverOffset: 4,
                            },
                        ],
                    },
                });
            }
        };

        const goToClassroom = (id) => {
            router.push(`/class/${id}`);
        };

        onMounted(getData);

        return {
            classId,
            class_rooms,
            loading1,
            goToClassroom,
        };
    },
};
</script>
<style lang="scss" scoped>
.student-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.student-item:hover {
    background-color: #2196f333;
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
    display: flex;
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
.feat {
    width: 100%;
    .feat2 {
        padding: 20px;
        box-shadow: 0 0 10px #ddd;
        border-radius: 5px;
    }
    .title {
        position: relative;
        font-size: 20px;
        color: var(--main-color);
        font-weight: bold;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        & > div:last-child {
            background: var(--main-color);
            color: #fff;
            width: 100px;
            border-radius: 5px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            border: 1px solid var(--main-color);
            cursor: pointer;
            &:hover {
                background: var(--therd-color);
            }
        }
        &::before {
            content: "";
            position: absolute;
            bottom: -20px;
            left: 50%;
            height: 4px;
            width: 100%;
            background: var(--secound-color);
            transform: translateX(-50%);
        }
    }
    .charts {
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        gap: 10px;
        margin-top: 40px;
        .box {
            width: 48%;
            max-width: 100%;
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 10px #ddd;
            border-radius: 5px;
            padding: 10px;
            flex-direction: column;
            gap: 10px;
            justify-content: space-between;
            & > div {
                height: 100px;
            }
            ul {
                width: 100%;
                list-style: none;
                position: relative;
                margin-top: 20px;
                &::before {
                    content: "";
                    position: absolute;
                    top: -20px;
                    left: 50%;
                    height: 4px;
                    width: 100%;
                    background: var(--secound-color);
                    transform: translateX(-50%);
                }
                li {
                    position: relative;
                    margin-right: 20px;
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 7px;
                    gap: 10px;
                    & > div {
                        font-weight: bold;
                    }
                    & > div:last-child {
                        color: var(--therd-color);
                        font-size: 12px;
                        text-align: center;
                        span {
                            font-size: 16px;
                        }
                    }
                    span {
                        font-weight: bold;
                        color: var(--therd-color);
                        font-size: 16px;
                    }
                    svg {
                        position: absolute;
                        width: 15px;
                        height: 15px;
                        right: -20px;
                        top: 50%;
                        transform: translateY(-50%);
                        border-radius: 2px;
                        color: var(--main-color);
                    }

                    &:not(.li)::before {
                        content: "";
                        position: absolute;
                        width: 15px;
                        height: 15px;
                        right: -20px;
                        top: 50%;
                        transform: translateY(-50%);
                        border-radius: 2px;
                        background: var(--main-color);
                    }

                    &:last-of-type:not(.li) {
                        &::before {
                            background: var(--pink-color);
                        }
                    }
                }
            }
        }
    }
}
@media (max-width: 599px) {
    .feat .title {
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
        .button {
            width: 100% !important;
        }
    }
    .feat .charts {
        flex-direction: column;
        & .box {
            width: 100%;
        }
    }
}
@media (min-width: 600px) and (max-width: 768px) {
}
@media (min-width: 769px) {
    .v-container {
        flex-direction: row;
        align-items: stretch !important;
    }
}
.v-overlay__scrim {
    background: rgb(0 0 0 / 36%) !important;
}
</style>
