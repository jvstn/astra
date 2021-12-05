import React, { ReactElement } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
interface Props {
  name: string;
  dates: string[];
  values: number[];
  height?: number;
}

export default function LineGraph({ name, dates, values, height = 350 }: Props): ReactElement {
  const series = [
    {
      name,
      data: values,
    },
  ];
  const options: ApexOptions = {
    chart: {
      type: "area",
      stacked: false,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: "5hr Price Movements ",
      align: "left",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      title: {
        text: "Price",
      },
    },
    xaxis: {
      type: "datetime",
      categories: dates,
    },
    tooltip: {
      shared: true,
      
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="area" height={height} />
    </div>
  );
}
