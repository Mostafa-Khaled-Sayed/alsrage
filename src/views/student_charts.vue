<template>
    <div>
        <button @click="fetchStudent">sub</button>
    </div>
    <br />
    <div>
        <canvas id="myChart"></canvas>
    </div>
</template>

<script>
import { onMounted } from "vue";
import { useStudentStore } from "../store/useStudentChart.js"; // تأكد من أن المسار صحيح
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
    setup() {
        const studentStore = useStudentStore();

        const fetchStudent = () => {
            studentStore.getStudent("عربي");
        };

        onMounted(() => {
            const ctx = document.getElementById("myChart").getContext("2d");
            const labels = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
            ];
            const data = {
                labels: labels,
                datasets: [
                    {
                        label: "My First Dataset",
                        data: [65, 59, 80, 81, 56, 55, 40],
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(255, 159, 64, 0.2)",
                            "rgba(255, 205, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(201, 203, 207, 0.2)",
                        ],
                        borderColor: [
                            "rgb(255, 99, 132)",
                            "rgb(255, 159, 64)",
                            "rgb(255, 205, 86)",
                            "rgb(75, 192, 192)",
                            "rgb(54, 162, 235)",
                            "rgb(153, 102, 255)",
                            "rgb(201, 203, 207)",
                        ],
                        borderWidth: 1,
                    },
                ],
            };
            const config = {
                type: "bar",
                data: data,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            };
            new Chart(ctx, config);
        });

        return {
            fetchStudent,
            studentStore,
        };
    },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
