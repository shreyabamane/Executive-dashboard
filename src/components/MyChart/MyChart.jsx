import React, { useEffect, useRef } from "react";
import { Chart, DoughnutController, ArcElement, Tooltip, Legend, Title } from "chart.js";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title);

const MyChart = ({ chartData }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const canvas = document.getElementById("myChart");
        const ctx = canvas.getContext("2d");

        // Destroy previous chart instance if exists
        if (chartRef.current) {
            chartRef.current.destroy();
        }

       chartRef.current = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
       });

       return () => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }
       }
    }, [chartData]);

    return (
        <div style={{ width: "100%", maxWidth: "600px" }}>
            <canvas id="myChart"></canvas>
        </div>
    );
};

export default MyChart;
