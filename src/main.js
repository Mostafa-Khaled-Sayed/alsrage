import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VTooltip from "v-tooltip";
import mitt from "mitt";
import Cookies from "vue-cookies"; // Import Cookies

// Initialize Pinia
const pinia = createPinia();

// Add FontAwesome icons
library.add(faCoffee, fas);

// Create Vuetify instance
const vuetify = createVuetify({
    components,
    directives,
});

// Create an event emitter
const Emitter = mitt();

// Create Vue app
const app = createApp(App);

// Configure the app with plugins and provide necessary instances
app.use(pinia)
    .use(store)
    .use(vuetify)
    .use(Cookies) // Add Cookies plugin
    .use(router)
    .use(VTooltip)
    .use(Toast, { position: "top-right", timeout: 3000 })
    .provide("Emitter", Emitter)
    .component("font-awesome-icon", FontAwesomeIcon);

// Detect if the app is running as PWA
if (window.matchMedia("(display-mode: standalone)").matches) {
    document.body.classList.add("pwa");
} else {
    document.body.classList.add("not-pwa");
}

app.mount("#app");
