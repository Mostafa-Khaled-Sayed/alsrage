<template>
    <div class="admin-container visible">
        <div class="right">
            <v-breadcrumbs>
                <v-breadcrumbs-item @click="$router.push('/admin')" link>
                    الإشراف
                </v-breadcrumbs-item>
            </v-breadcrumbs>
        </div>
        <v-container class="d-flex justify-space-evenly mb-4 mt-16">
            <v-card class="card" link @click="goToClasses">
                <img src="../assets/admin/e-learning.png" alt="" />
                <div>الفصول الدراسية</div>
            </v-card>
            <v-card
                class="card"
                v-if="
                    user.roles.includes('تعديل ونشر الصور') ||
                    user.roles.includes('الكل')
                "
                link
                @click="$router.push('/Top_Board')"
            >
                <img src="../assets/admin/certificate.png" alt="" />
                <div>لوحة الشرف</div>
            </v-card>
            <v-card
                class="card"
                v-if="
                    user.roles.includes(' الاطلاع على تقديم الوظائف') ||
                    user.roles.includes('الكل')
                "
                link
                @click="$router.push('/Add_job')"
            >
                <img src="../assets/admin/job-application.png" alt="" />
                <div>التقديم على الوظائف</div>
            </v-card>
            <v-card
                class="card"
                v-if="
                    user.roles.includes('حذف واضافة مشرفين') ||
                    user.roles.includes('الكل')
                "
                link
                @click="$router.push('/Add_admin')"
            >
                <img src="../assets/admin/developers (1).png" alt="" />
                <div>إدارة المشرفين</div>
            </v-card>
            <v-card class="card" link @click="$router.push('/Add_teacher')">
                <img src="../assets/admin/management.png" alt="" />
                <div>إدارة المدرسين</div>
            </v-card>
            <v-card
                v-if="
                    user.roles.includes('تعديل ونشر الأخبار') ||
                    user.roles.includes('الكل')
                "
                class="card"
                link
                @click="$router.push('/Add_News')"
            >
                <img src="../assets/admin/newspaper.png" alt="newspaper" />
                <div>الأخبار</div>
            </v-card>
            <v-card
                v-if="
                    user.roles.includes('تعديل ونشر الصور') ||
                    user.roles.includes('الكل')
                "
                class="card"
                link
                @click="$router.push('/Photo_Gallery')"
            >
                <img src="../assets/admin/picture.png" alt="picture" />
                <div>معرض الصور</div>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import { mapState } from "pinia";
import { useAuthStore } from "../store/userStore";
export default {
    name: "TheAdministrator",
    methods: {
        goToClasses() {
            this.$router.push({ name: "Class" });
        },
    },
    computed: {
        ...mapState(useAuthStore, ["user"]),
    },
};
</script>

<style lang="scss" scoped>
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
    justify-content: space-between !important;
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
@media (max-width: 599px) {
}
@media (min-width: 600px) and (max-width: 768px) {
}
@media (min-width: 769px) {
    .v-container {
        flex-direction: row;
        gap: 15px;
    }
    .card {
        width: 32%;
    }
}
img {
    width: 50px;
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
