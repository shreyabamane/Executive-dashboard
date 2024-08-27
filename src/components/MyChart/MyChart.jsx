import React, { useEffect } from "react";
import { Chart, DoughnutController, ArcElement, Tooltip, Legend, Title } from "chart.js";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title);

const MyChart = () => {
  useEffect(() => {
    const canvas = document.getElementById("myChart");
    const ctx = canvas.getContext("2d");

    // Destroy previous chart instance if exists
    if (canvas.chartInstance) {
      canvas.chartInstance.destroy();
    }

    const xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
    const yValues = [55, 49, 44, 24, 15];
    const barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145"];

    const newChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: xValues,
        datasets: [
          {
            backgroundColor: barColors,
            data: yValues,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "World Wide Wine Production 2018",
          },
        },
      },
    });

    // Store the chart instance on the canvas element
    canvas.chartInstance = newChart;

    // Cleanup function to destroy the chart instance when the component unmounts
    return () => {
      if (canvas.chartInstance) {
        canvas.chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: "600px" }}>
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default MyChart;
