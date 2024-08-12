import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";

import { FaTemperatureArrowUp } from "react-icons/fa6";
import { FaTemperatureHalf } from "react-icons/fa6";
import { FaTemperatureArrowDown } from "react-icons/fa6";
import { CgPerformance } from "react-icons/cg";
import useMetrics from "@/hooks/useMetrics";

export const Metrics = () => {
  const today = new Date(Date.now()).toLocaleString().split(",")[0];

  const { metrics, metricsData, calcPerformance } = useMetrics();

  return (
    <div>
      {metricsData && metricsData.main ? (
        <div key={metricsData.id}>
          <h3 className="text-2xl text-center text-violet-700 font-semibold">
            Minhas métricas
          </h3>
          <h3 className="text-xl text-center my-3">
            Data de consulta: {today}
          </h3>
          <h1 className="flex text-xl my-3">
            <FaTemperatureHalf className="text-orange-500	mt-1 mr-1" />
            Temperatura Atual: {Math.round(metricsData.main.temp - 273)}
            °C
          </h1>
          <h1 className="flex text-xl my-3">
            <FaTemperatureArrowUp className="text-red-500	mt-1 mr-1" />
            Temperatura Máxima: {Math.round(metricsData.main.temp_max - 273)}
            °C
          </h1>
          <h1 className="flex text-xl my-3">
            <FaTemperatureArrowDown className="text-blue-600 mt-1 mr-1" />
            Temperatura Minima: {Math.round(metricsData.main.temp_min - 273)}
            °C
          </h1>
          <h1 className="flex text-xl my-3">
            <CgPerformance className="text-blue-600 mt-1 mr-1" />
            Desempenho da máquina:{" "}
            {calcPerformance(Math.round(metricsData.main.temp - 273))}
          </h1>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
};
