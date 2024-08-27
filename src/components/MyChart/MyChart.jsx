import React, { useEffect, useRef } from "react";
import { Chart, DoughnutController, ArcElement, Tooltip, Legend, Title } from "chart.js";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title);

const MyChart = ({ chartData }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const canvas = chartRef.current;
        const ctx = canvas.getContext("2d");

        // Destroy previous chart instance if exists
        if (ctx.chartInstance) {
            ctx.chartInstance.destroy();
        }

       const newChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
       });

       ctx.chartInstance = newChart;

       return () => {
        if (ctx.chartInstance) {
            ctx.chartInstance.destroy();
        }
       }
    }, [chartData]);

    return (
        <div style={{ width: "100%", maxWidth: "600px" }}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default MyChart;
