import React, { useState, useEffect, useRef } from "react";
import { EChartOption, ECharts, init } from "echarts";
import { Table } from "antd";

import datas from "./data/index";

import "antd/dist/antd.css";
import "./index.css";

export default () => {
  const [tableData, setTabelData] = useState<any[]>([]);
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

      instance.current.on("legendselected", (e: any) => {
        console.log("e)", e);
        // handleSelectChange()
      });

      initTable();
    }
  }, []);

  const initTable = () => {
    const res: any[] = datas.map((data) => ({
      name: data.name,
      zone: `${data.zone}/${data.district}`,
      prise: data.prise,
      advantage: data.advantage,
      disadvatage: data.disadvatage,
    }));
    setTabelData(res);
  };

  const handleSelectChange = (selected: string[]) => {
    console.log("selected", selected);
  };

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "行政区",
      dataIndex: "zone",
      key: "zone",
    },
    {
      title: "均价",
      dataIndex: "prise",
      key: "prise",
    },
    {
      title: "优点",
      dataIndex: "advantage",
      key: "advantage",
    },
    {
      title: "缺点",
      dataIndex: "disadvatage",
      key: "disadvatage",
    },
  ];

  return (
    <div className="apart-radar">
      <div
        className="container"
        ref={(el) => {
          chartEl.current = el;
        }}
      ></div>
      <Table dataSource={tableData} columns={columns} />;
    </div>
  );
};
