<template>
    <div class="main_header">
        <nav>
            <div>
                <router-link class="a" to="/">الرئيسية</router-link>
            </div>
            <div>
                <router-link
                    class="a"
                    to="/admin"
                    v-if="user.userType === 'admin'"
                    >لوحة الاشراف</router-link
                >
            </div>
            <div>
                <router-link
                    class="a"
                    to="/Parent_Dashboard"
                    v-if="user.userType === 'parent'"
                    >الملف الشخصي</router-link
                >
            </div>
            <div>
                <router-link
                    class="a"
                    v-if="user.National_id !== '' || user.id !== ''"
                    @click="logout"
                    to="/UserLogin"
                    >تسجيل خروج</router-link
                >
                <router-link class="a" v-else to="/UserLogin"
                    >تسجيل دخول</router-link
                >
            </div>
            <v-spacer></v-spacer>
            <pwa_btn />
        </nav>
    </div>

    <router-view />
</template>

<script>
import { useAuthStore } from "./store/userStore";
import { mapActions, mapState } from "pinia";
import pwa_btn from "./components/pwa_btn.vue";
export default {
    components: {
        pwa_btn,
    },
    setup() {
        const authStore = useAuthStore();
        authStore.get_Cookies();
        return {
            ...mapActions(useAuthStore, ["get_Cookies"]),
        };
    },

    computed: {
        ...mapState(useAuthStore, ["user"]),
    },
    methods: {
        ...mapActions(useAuthStore, ["logout"]),
    },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap");
* {
    direction: rtl !important;
    letter-spacing: 0 !important;
    transition-timing-function: 0.3s;
}
body {
    direction: rtl;
    font-family: "Cairo", sans-serif;
    font-variation-settings: "slnt" 0;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
}
:root {
    --main-color: #336699;
    --secound-color: #eee;
    --therd-color: #7a7a7a;
    --pink-color: #d8588c;
}
.main_header {
    padding: 20px;
    background-color: white;
    -webkit-box-shadow: 0 0 10px #ddd;
    -moz-box-shadow: 0 0 10px #ddd;
    box-shadow: 0 0 10px #ddd;
    nav {
        display: flex;
        align-items: center;
        gap: 20px;
        flex-flow: wrap;
        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 72px;
            position: relative;
            overflow: hidden;
            font-size: 18px;
            transition: 0.3s;
            &:hover {
                opacity: 1;
                z-index: 100;
                top: calc(100% + 1px);
            }
        }
        .a {
            text-decoration: none;
        }
        .container::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 4px;
            background-color: var(--main-color);
            top: 0;
            left: -100%;
            transition: 0.3s;
        }
    }
}
body.pwa .main_header {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 11;
    left: 0;
}
.v-overlay__scrim {
    background: rgb(0 0 0 / 36%) !important;
}

.v-container,
.container {
    width: 90% !important;
    max-width: 90% !important;
    margin: 0 auto;
    & > div {
        flex-grow: 1;
    }
}

a {
    color: var(--main-color);
    font-weight: bold;
}
</style>
