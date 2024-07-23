"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import metricsPerson from "../assets/metricsPerson.png";
import { Metrics } from "@/components/metrics";
import wave from "../assets/wave.svg";
import ChartMetrics from "@/components/chart";

export default function Home() {
  const [metrics, setMetrics] = useState<any>({});

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
    return () => clearInterval(interval);
  }, [metrics]);

  return (
    <>
      <Navbar />
      <main className="flex flex-col align-center relative w-full">
        <h1 className="text-3xl text-indigo-600 text-center md:mb-5 font-bold tracking-tight text-gray-900 sm:text-3xl md:text-5xl p-6">
          Métricas da Máquina
        </h1>
        <div className="flex flex-wrap flex-row justify-evenly items-center w-full md:mt-5">
          <Image
            className="md:mr-5"
            width={600}
            alt="Personagem de métricas"
            src={metricsPerson}
          />
          <div className="flex flex-col">
            <Metrics data={metrics} />
            <ChartMetrics />
          </div>
        </div>
        <div className="w-full">
          <Image className="w-full" alt="Waves" src={wave} />
        </div>
      </main>
    </>
  );
}
