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
      colors: ["#ffffff"],
    },
    title: {
      text: "5hr Price Movements ",
      align: "left",
      style: {
        color: "#ffffff",
      }
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
        style: {
          color: "#ffffff",
        },
      },
      labels: {
        style: {
          colors: "#ffffff",
        }
      }

    },
    xaxis: {
      type: "datetime",
      categories: dates,
      labels: {
        style: {
          colors: "#ffffff",
        }
      }
    },
    tooltip: {
      shared: false,
    },
  };

  return (
    <div>
      <Chart aria-label="graphics-doc" options={options} series={series} type="area" height={height} />
    </div>
  );
}
