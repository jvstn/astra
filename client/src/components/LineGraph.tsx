import React, { ReactElement } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
interface Props {
  name: string;
  dates: string[];
  values: number[];
}

export default function LineGraph({ name, dates, values }: Props): ReactElement {
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
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
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
      <Chart options={options} series={series} type="area" height={350} />
    </div>
  );
}
