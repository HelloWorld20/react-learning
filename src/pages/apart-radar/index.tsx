import React, { useState, useEffect, useRef } from "react";
import { EChartOption, ECharts, init } from "echarts";

import datas from "./data/index";

import "./index.css";

type keyOfApartScore = keyof ApartScoreOption;

export default () => {
  const chartEl = useRef<HTMLDivElement | null>(null);
  const instance = useRef<ECharts | null>(null);

  const getOption = (): EChartOption => {
    // const data
    // const indicator: any[] = [];
    const series = datas.map((data) => {
      return {
        value: Object.keys(data.score).map((key: any) => data.score[key].data),
        name: data.name,
      };
    });
    const legend = series.map((serie) => serie.name);
    return {
      // title: {
      //   text: "已看小区评价",
      // },
      tooltip: {},
      legend: {
        data: legend,
      },
      radar: {
        indicator: [
          { name: "交通（transport）", max: 100 },
          { name: "环境（enviranment）", max: 100 },
          { name: "学区（education）", max: 100 },
          { name: "质量（house）", max: 100 },
          { name: "房龄（age）", max: 100 },
          { name: "户型（style）", max: 100 },
          { name: "升值空间（appreciation）", max: 100 },
          { name: "配套设施（equipment）", max: 100 },
          { name: "性价比（prise）", max: 100 },
        ],
      },
      series: [
        {
          name: "预算 vs 开销（Budget vs spending）",
          type: "radar",
          //   areaStyle: {},
          // areaStyle: {normal: {}},
          data: series,
        },
      ],
    };
  };

  useEffect(() => {
    if (chartEl.current) {
      instance.current = init(chartEl.current);

      instance.current.setOption(getOption());
    }
  }, []);

  return (
    <div className="apart-radar">
      <div
        className="container"
        ref={(el) => {
          chartEl.current = el;
        }}
      ></div>
    </div>
  );
};
