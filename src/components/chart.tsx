import { useState, useEffect, useRef } from "react";
import axios, { AxiosResponse } from "axios";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  BarElement
);

import { Bar } from "react-chartjs-2";

interface IDataChart {
  id: number;
  temperatura: number;
  eficiencia: number;
  data: number;
}

const ChartMetrics = () => {
  const [dataChart, setDataChart] = useState<IDataChart[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/metricas/get-metrics`
        );
        setDataChart(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  console.log(dataChart);

  return (
    <>
      {dataChart.length > 0 ? (
        <div style={{ width: "600px", height: "400px" }}>
          <Bar
            data={{
              labels: [
                "Desempenho da máquina em todo período - Atualizado a cada 30s",
              ],
              datasets: [
                {
                  label: "Temperatura",
                  data: dataChart.map((item) => item.temperatura),
                  backgroundColor: "rgb(93, 250, 65)",
                },
                {
                  label: "Eficiencia",
                  data: dataChart.map((item) => item.eficiencia),
                  backgroundColor: "rgb(250, 77, 65)",
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
              },
            }}
          />
        </div>
      ) : (
        "Loading"
      )}
    </>
  );
};

export default ChartMetrics;
