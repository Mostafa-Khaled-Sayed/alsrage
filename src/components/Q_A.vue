<template>
    <div
        style="
            width: 100% !important;
            margin: auto;
            padding: 40px 0px;
            background: var(--secound-color);
        "
    >
        <div class="use">
            <div class="title">
                <div class="right">الأسئلة الشائعة</div>
            </div>
        </div>
        <v-infinite-scroll
            :onLoad="load"
            width="95%"
            height="100%"
            style="margin: auto"
        >
            <template v-for="i in faq" :key="i">
                <v-expansion-panels style="margin-bottom: 10px">
                    <v-expansion-panel
                        style="
                            color: var(--main-color);
                            font-weight: bold;
                            font-size: 20px;
                            padding: 10px;
                        "
                        :title="i.question"
                        :text="i.answer"
                    >
                    </v-expansion-panel>
                </v-expansion-panels>
            </template>
            <template v-slot:loading> </template>
        </v-infinite-scroll>
    </div>
</template>
<script>
export default {
    data() {
        return {
            load: "Done",
            faq: [
                {
                    question:
                        "ما هي الفئات العمرية التي يستقبلها معهد السراج المنير الأزهري؟",
                    answer: "يستقبل معهد السراج المنير الأزهري الطلاب من الحضانة حتى الصف الثالث الثانوي، مما يوفر تجربة تعليمية متكاملة تبدأ من مرحلة الطفولة المبكرة حتى نهاية التعليم الثانوي.",
                },
                {
                    question: "ما هو نظام التدريس المتبع في المعهد؟",
                    answer: "يتبع معهد السراج المنير الأزهري نظام تدريس متكامل يجمع بين التعليم التقليدي والحديث. يتم التركيز على العلوم الشرعية واللغة العربية، بالإضافة إلى المواد الأكاديمية الأخرى مثل الرياضيات والعلوم والتكنولوجيا. يتم تقديم التعليم بطريقة تفاعلية تهدف إلى تنمية قدرات الطلاب الفكرية والاجتماعية.",
                },
                {
                    question: "كيف يتم تقييم الطلاب في المعهد؟",
                    answer: "يتم تقييم الطلاب في معهد السراج المنير الأزهري من خلال مجموعة من الاختبارات الدورية والنهائية، بالإضافة إلى الأنشطة الصفية والمشاريع العملية. يتم تقديم تقارير دورية لأولياء الأمور حول أداء الطلاب وتقدمهم الأكاديمي.",
                },
                {
                    question:
                        "ما هي الخطوات اللازمة للتقديم في معهد السراج المنير الأزهري؟",
                    answer: "يمكن التقديم في معهد السراج المنير الأزهري عن طريق زيارة مكتب القبول والتسجيل في المعهد. يجب ملء استمارة التقديم وتقديم المستندات المطلوبة مثل شهادة الميلاد وشهادات التعليم السابقة. كما يمكن إجراء مقابلة شخصية مع الطالب وولي الأمر كجزء من عملية القبول.",
                },
                {
                    question:
                        "هل يقدم المعهد برامج دعم للطلاب الذين يحتاجون إلى مساعدة إضافية؟",
                    answer: "نعم، يقدم معهد السراج المنير الأزهري برامج دعم متنوعة للطلاب الذين يحتاجون إلى مساعدة إضافية. تشمل هذه البرامج جلسات تعليمية فردية، ودروس تقوية في المواد الأساسية، بالإضافة إلى دعم نفسي واجتماعي لضمان تحقيق الطلاب لأقصى إمكانياتهم.",
                },
            ],
        };
    },
};
</script>
<style lang="scss" scoped>
.use {
    width: fit-content !important;
    margin: auto;
    .title {
        text-transform: uppercase;
        color: var(--main-color);
        margin: 0 auto 80px;
        border: 2px solid var(--main-color);
        padding: 10px 20px;
        font-size: 30px;
        width: fit-content;
        position: relative;
        z-index: 1;
        transition: 0.3s;
    }
    .title::before {
        content: "";
        width: 12px;
        height: 12px;
        background-color: var(--main-color);
        position: absolute;
        border-radius: 50%;
        top: 50%;
        right: -30px;
        transform: translateY(-50%);
    }
    .title::after {
        content: "";
        width: 12px;
        height: 12px;
        background-color: var(--main-color);
        position: absolute;
        border-radius: 50%;
        top: 50%;
        left: -30px;
        transform: translateY(-50%);
    }
    .title:hover::before {
        z-index: -1;
        animation: right-move 0.5s linear forwards;
    }
    .title:hover::after {
        z-index: -1;
        animation: left-move 0.5s linear forwards;
    }
    .title:hover {
        color: white;
        border: 2px solid white;
        transition-delay: 0.5s;
    }
}
@keyframes left-move {
    50% {
        left: 0;
        width: 12px;
        height: 12px;
    }
    100% {
        left: 0;
        border-radius: 0;
        width: 50%;
        height: 100%;
    }
}
@keyframes right-move {
    50% {
        right: 0;
        width: 12px;
        height: 12px;
    }
    100% {
        right: 0;
        border-radius: 0;
        width: 50%;
        height: 100%;
    }
}
.v-infinite-scroll--vertical {
    overflow: hidden;
}
</style>
