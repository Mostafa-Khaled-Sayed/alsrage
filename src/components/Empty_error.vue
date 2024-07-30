<template>
    <!-- Display a row with a message when there is no data -->
    <v-row>
        <v-col>
            <div class="m-auto text-center pa-auto mt-2">
                <p
                    style="
                        color: var(--main-color);
                        background-color: var(--secound-color);
                        font-size: 20px;
                        font-weight: bold;
                        width: 90%;
                        padding: 10px;
                        border-redius: 5px;
                        margin: auto;
                        text-align: center;
                    "
                >
                    {{ text }}
                </p>
            </div>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props: ["text"],
    data() {
        return {};
    },
};
</script>
