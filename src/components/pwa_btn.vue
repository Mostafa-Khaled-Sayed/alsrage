<template>
    <div>
        <v-btn v-if="showInstallButton" @click="installPWA" class="install-btn">
            Install App
        </v-btn>
    </div>
</template>

<script>
export default {
    data() {
        return {
            deferredPrompt: null,
            showInstallButton: false,
        };
    },
    mounted() {
        window.addEventListener("beforeinstallprompt", (event) => {
            // Prevent the mini-infobar from appearing on mobile
            event.preventDefault();
            // Save the event for later
            this.deferredPrompt = event;
            // Show the install button
            this.showInstallButton = true;
        });
    },
    methods: {
        installPWA() {
            if (this.deferredPrompt) {
                // Show the install prompt
                this.deferredPrompt.prompt();
                // Wait for the user to respond to the prompt
                this.deferredPrompt.userChoice.then((result) => {
                    if (result.outcome === "accepted") {
                        console.log("User accepted the A2HS prompt");
                    } else {
                        console.log("User dismissed the A2HS prompt");
                    }
                    this.deferredPrompt = null;
                    this.showInstallButton = false;
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.install-btn {
    background-color: var(--main-color);
    color: #fff;
    font-weight: bold;
}
</style>
