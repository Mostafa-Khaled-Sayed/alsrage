<template>
    <div>
        <h1>تعديل بياناتك</h1>
        <h1>{{ user.email }}</h1>
    </div>
</template>
<script>
import { mapState } from "pinia";
import { useAuthStore } from "../store/userStore";

export default {
    data: () => ({
        tab: "first-tab",
    }),
    computed: {
        ...mapState(useAuthStore, ["user"]),
    },
};
</script>
<style lang="scss" scoped></style>
