<template>
    <!-- Main Container -->
    <div
        style="
            width: 100% !important; /* Full width */
            margin: auto; /* Centered horizontally */
            background: var(--secound-color); /* Background color */
            padding: 40px 0px; /* Padding top and bottom */
        "
    >
        <Offline_error>
            <template v-slot:default>
                <!-- Section Title -->
                <div class="use">
                    <div class="title">
                        <div class="right">معرض الصور</div>
                        <!-- Title in Arabic -->
                    </div>
                </div>
                <div class="pr-10 pb-5">
                    <v-btn-toggle
                        v-model="photos.photos_show"
                        variant="outlined"
                        style="
                            border: 2px solid var(--main-color);
                            color: var(--main-color);
                        "
                    >
                        <v-btn
                            value="all"
                            @click="photos.show_Data"
                            style="
                                font-size: 20px !important;
                                font-weight: 600 !important;
                            "
                        >
                            الكل
                        </v-btn>
                        <v-btn
                            value="trip"
                            @click="photos.show_Data"
                            style="
                                font-size: 20px !important;
                                font-weight: 600 !important;
                            "
                        >
                            رحلات
                        </v-btn>
                        <v-btn
                            value="news"
                            @click="photos.show_Data"
                            style="
                                font-size: 20px !important;
                                font-weight: 600 !important;
                            "
                        >
                            أخبار
                        </v-btn>
                        <v-btn
                            value="party"
                            @click="photos.show_Data"
                            style="
                                font-size: 20px !important;
                                font-weight: 600 !important;
                            "
                        >
                            حفلات
                        </v-btn>
                    </v-btn-toggle>
                </div>
                <!-- Cards Container -->
                <Empty_error v-if="empty === true" :text="text0" />
                <div
                    class="box d-flex align-center justify-space-around"
                    v-if="(!loading1, empty === false)"
                >
                    <!-- Photo Cards Loop -->
                    <v-card
                        class="card"
                        v-for="photo in Photos"
                        :key="photo.id"
                        width="500px"
                        max-width="25%"
                        @click.="photos.photo_Information(photo)"
                        @click="dialog_6 = true"
                    >
                        <v-img
                            v-if="photo.File_type == 'صورة'"
                            :src="photo.image"
                            height="200"
                            cover
                        ></v-img>
                        <video
                            v-if="photo.File_type == 'فيديو'"
                            width="210"
                            height="200"
                            controls
                        >
                            <source :src="photo.video" type="video/mp4" />

                            Your browser does not support the video tag.
                        </video>
                        <!-- Display each photo -->
                        <v-dialog v-model="dialog_6" width="90%">
                            <v-card width="100%" class="popup">
                                <div
                                    class="d-flex justify-space-between align-center title"
                                >
                                    <div style="color: var(--main-color)">
                                        الصور
                                    </div>
                                    <v-btn
                                        icon="mdi-close"
                                        @click="dialog_6 = false"
                                    ></v-btn>
                                </div>
                                <v-carousel
                                    :show-arrows="false"
                                    hide-delimiter-background
                                    color="var(--main-color)"
                                >
                                    <div>
                                        <v-carousel-item
                                            class="pa-5"
                                            v-if="
                                                photos.File_Information ==
                                                'صورة'
                                            "
                                            :src="photos.Photo_Information"
                                            height="400"
                                            cover
                                        ></v-carousel-item>
                                    </div>
                                    <div>
                                        <v-carousel-item
                                            class="pa-5 text-center"
                                            v-if="
                                                photos.File_Information ==
                                                'فيديو'
                                            "
                                            cover
                                        >
                                            <video height="400" controls>
                                                <source
                                                    :src="
                                                        photos.Video_Information
                                                    "
                                                    type="video/mp4"
                                                />

                                                Your browser does not support
                                                the video tag.
                                            </video></v-carousel-item
                                        >
                                    </div>
                                    <div
                                        v-for="photo in Photos"
                                        :key="photo.id"
                                    >
                                        <v-carousel-item
                                            v-if="photo.File_type == 'صورة'"
                                            class="pa-5"
                                            :src="photo.image"
                                            height="400"
                                            cover
                                        ></v-carousel-item>
                                        <v-carousel-item
                                            v-if="photo.File_type == 'فيديو'"
                                            class="pa-5 text-center"
                                            cover
                                        >
                                            <video controls height="400">
                                                <source
                                                    :src="photo.video"
                                                    type="video/mp4"
                                                />

                                                Your browser does not support
                                                the video tag.
                                            </video></v-carousel-item
                                        >
                                    </div>
                                </v-carousel></v-card
                            ></v-dialog
                        >
                    </v-card>
                </div>
            </template>
        </Offline_error>
    </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { usePhoto_Gallery } from "@/store/Photo_Gallery.js";
import Offline_error from "@/components/Offline_error.vue";
import Empty_error from "@/components/Empty_error.vue";
export default defineComponent({
    inject: ["Emitter"],
    components: {
        Empty_error,
        Offline_error,
    },
    setup() {
        // Access the Photo Gallery store
        const photos = usePhoto_Gallery();

        // Initialize or fetch data on component setup
        photos.Get_data(); // Retrieve initial set of photos
        // Destructure reactive references and methods from Photo Gallery store
        const {
            Photo,
            loading,
            text0,
            empty,
            Photos,
            dialog_6,
            Add_Photos,
            photos_show,
            Get_data,
            loading1,
            show_Data,
            File_type,
            image,
            photo_Information,
            Photo_Information,
        } = storeToRefs(photos);

        // Return the necessary reactive properties and methods
        return {
            Photo,
            photos_show,
            text0,
            empty,
            loading,
            Photos,
            dialog_6,
            Add_Photos,
            Get_data,
            loading1,
            show_Data,
            File_type,
            Photo_Information,
            photo_Information,
            image,
            photos,
        };
    },
});
</script>

<style lang="scss" scoped>
/* Styles for Main Container */
.box {
    flex-wrap: wrap !important; /* Wrap items inside container */
    gap: 10px !important; /* Gap between items */
}
.v-btn--variant-outlined {
    border: none;
}
.v-btn-group .v-btn:not(:last-child) {
    border-inline-end: solid;
}
.use {
    width: fit-content !important; /* Fit content width */
    margin: auto; /* Centered horizontally */
    .title {
        text-transform: uppercase; /* Uppercase title text */
        color: var(--main-color); /* Main color for title */
        margin: 0 auto 20px; /* Margin bottom for title */
        border: 2px solid var(--main-color); /* Border for title */
        padding: 10px 20px; /* Padding inside title */
        font-size: 30px; /* Font size of title */
        width: fit-content; /* Fit content width */
        position: relative; /* Positioning context */
        z-index: 1; /* Z-index for stacking */
        transition: 0.3s; /* Transition duration */
    }
    .title::before {
        content: ""; /* Empty content before pseudo-element */
        width: 12px; /* Width of before pseudo-element */
        height: 12px; /* Height of before pseudo-element */
        background-color: var(
            --main-color
        ); /* Main color for before pseudo-element */
        position: absolute; /* Absolute positioning */
        border-radius: 50%; /* Circular border radius */
        top: 50%; /* Position from top */
        right: -30px; /* Position from right */
        transform: translateY(-50%); /* Center vertically */
    }
    .title::after {
        content: ""; /* Empty content after pseudo-element */
        width: 12px; /* Width of after pseudo-element */
        height: 12px; /* Height of after pseudo-element */
        background-color: var(
            --main-color
        ); /* Main color for after pseudo-element */
        position: absolute; /* Absolute positioning */
        border-radius: 50%; /* Circular border radius */
        top: 50%; /* Position from top */
        left: -30px; /* Position from left */
        transform: translateY(-50%); /* Center vertically */
    }
    .title:hover::before {
        z-index: -1; /* Lower z-index on hover */
        animation: right-move 0.5s linear forwards; /* Animation for before pseudo-element */
    }
    .title:hover::after {
        z-index: -1; /* Lower z-index on hover */
        animation: left-move 0.5s linear forwards; /* Animation for after pseudo-element */
    }
    .title:hover {
        color: white; /* Color change on hover */
        border: 2px solid white; /* Border change on hover */
        transition-delay: 0.5s; /* Delay for transition */
    }
}

/* Styles for Photo Cards */
.card {
    border: 20px solid white; /* Border around each card */
    overflow: hidden; /* Hide overflow content */
    -webkit-box-shadow: 0 0 20px #ddd; /* Box shadow for webkit browsers */
    -moz-box-shadow: 0 0 20px #ddd; /* Box shadow for mozilla browsers */
    box-shadow: 0 0 20px #ddd; /* Box shadow */
    &::before {
        content: ""; /* Empty content before pseudo-element */
        position: absolute; /* Absolute positioning */
        top: 50%; /* Position from top */
        left: 50%; /* Position from left */
        transform: translate(
            -50%,
            -50%
        ); /* Center vertically and horizontally */
        background-color: rgb(
            255 255 255 / 20%
        ); /* Background color with opacity */
        width: 0; /* Initial width */
        height: 0; /* Initial height */
        opacity: 0; /* Initial opacity */
        z-index: 2; /* Z-index */
    }
    &:hover::before {
        animation: flashing 0.7s; /* Animation on hover */
    }
    .v-img {
        transition: 0.3s; /* Image transition duration */
    }
    &:hover .v-img {
        transform: rotate(5deg) scale(1.1); /* Image transformation on hover */
    }
}

/* Keyframe Animations */
@keyframes flashing {
    0%,
    40% {
        opacity: 1; /* Opacity keyframe */
    }
    100% {
        opacity: 0; /* Final opacity */
        width: 200%; /* Final width */
        height: 200%; /* Final height */
    }
}
@keyframes left-move {
    50% {
        left: 0; /* Left position at 50% keyframe */
        width: 12px; /* Width at 50% keyframe */
        height: 12px; /* Height at 50% keyframe */
    }
    100% {
        left: 0; /* Final left position */
        border-radius: 0; /* Final border radius */
        width: 50%; /* Final width */
        height: 100%; /* Final height */
    }
}
@keyframes right-move {
    50% {
        right: 0; /* Right position at 50% keyframe */
        width: 12px; /* Width at 50% keyframe */
        height: 12px; /* Height at 50% keyframe */
    }
    100% {
        right: 0; /* Final right position */
        border-radius: 0; /* Final border radius */
        width: 50%; /* Final width */
        height: 100%; /* Final height */
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
