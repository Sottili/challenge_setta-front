import { useEffect, useState, useCallback } from "react";
import axios, { AxiosResponse } from "axios";

import { IWeatherData } from "@/interfaces/IWeather";

interface OutputsUseMetrics {
  metrics: any[];
  metricsData: IWeatherData | null;
  calcPerformance(temp: number): number;
  dataChart: IDataChart[];
}

interface IDataChart {
  id: number;
  temperatura: number;
  eficiencia: number;
  data: number;
}

export default function useMetrics(): OutputsUseMetrics {
  const [metrics, setMetrics] = useState<any>({});
  const [metricsData, setMetricsData] = useState<IWeatherData | null>(null);
  const [dataChart, setDataChart] = useState<IDataChart[]>([]);

  function calcPerformance(temp: number) {
    if (temp >= 28) {
      return 100;
    } else if (temp <= 24) {
      return 75;
    } else {
      return 75 + (temp - 24) * (25 / 4);
    }
  }

  const sendMetrics = useCallback(async () => {
    if (metricsData && metricsData.main) {
      const dataDB = {
        temp: metricsData ? Math.round(metricsData.main.temp - 273) : 0,
        perfor: metricsData
          ? calcPerformance(Math.round(metricsData.main.temp - 273))
          : 0,
      };
      axios
        .post("http://localhost:8000/metricas/post-metrics", {
          temp: dataDB.temp,
          perfor: dataDB.perfor,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [metricsData]);

  const getMetrics = async () => {
    const response = await axios
      .get(`http://localhost:8000/metricas/get-metrics`)
      .then((response) => {
        setDataChart(response.data);
      });
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=-23.619337&lon=-46.756927&appid=ad6ca15c166c1b274133bd35e4357e62`
        )
        .then(async (response: AxiosResponse) => {
          setMetrics(response.data);
        });
    }, 30000);

    if (Object.keys(metrics).length == 0) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=-23.619337&lon=-46.756927&appid=ad6ca15c166c1b274133bd35e4357e62`
        )
        .then((response: AxiosResponse) => {
          setMetrics(response.data);
        });
    }

    setMetricsData(metrics);
    sendMetrics();
    getMetrics();
    return () => clearInterval(interval);
  }, [metrics]);

  return { metrics, metricsData, calcPerformance, dataChart };
}
