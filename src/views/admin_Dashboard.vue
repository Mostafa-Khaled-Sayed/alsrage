<template>
    <v-card>
        <div class="d-flex justify-space-between" v-if="user">
            <h5 class="text-right ma-4">أهلا {{ user.name }}</h5>
            <div>
                <v-btn class="ma-2" size="small" @click="Edit()">
                    تعديل البيانات
                </v-btn>
                <v-btn class="ma-2" size="small" @click="My_Logout()">
                    تسجيل خروج
                </v-btn>
            </div>
        </div>

        <v-toolbar color="primary" title="بياناتك"></v-toolbar>

        <div class="d-flex flex-row">
            <v-tabs v-model="tab" color="primary" direction="vertical">
                <v-tab prepend-icon="mdi-account" value="first-tab">
                    تعديل بياناتك
                </v-tab>
                <v-tab prepend-icon="mdi-lock" value="second-tab">
                    نتائج
                </v-tab>
                <v-tab prepend-icon="mdi-access-point" value="third-tab">
                    إحصائيات
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tab-item value="first-tab"> </v-tab-item>

                <v-tab-item value="second-tab">
                    <v-card flat>
                        <v-card-text></v-card-text>
                    </v-card>
                </v-tab-item>

                <v-tab-item value="third-tab">
                    <v-card flat>
                        <v-card-text> </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </div>
    </v-card>
</template>

<script>
import { mapState } from "pinia";
import { useAuthStore } from "../store/userStore";
export default {
    data: () => ({
        tab: "first-tab",
        showTests: false,
    }),
    async created() {},
    computed: {
        ...mapState(useAuthStore, ["user"]),
    },
    methods: {},
};
</script>

<style scoped>
.v-card {
    margin: 20px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
