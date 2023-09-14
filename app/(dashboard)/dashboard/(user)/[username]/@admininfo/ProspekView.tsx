"use client";
import {
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  CoreChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

import useSWR from "swr";

import { Bar } from "react-chartjs-2";
import { fetcher } from "@/lib/fetcher";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const options: ChartOptions<"bar"> = {
  scales: {
    x: {   
      stacked: true,
      grid: {
        color: "rgba(165,216,255, 0.5)",
      },
    },
    y: {
      stacked: true,
      grid: {
        color: "#a5d8ff",
      },
      ticks: {
        precision: 0,
      }
    },
  },
  color: "#fff",
  elements: {
    bar:{
      backgroundColor: (context) => {
        if (context.dataset.label === 'Prospek') {
          return "#b1cfff"
        } else if (context.dataset.label === 'Dealing') {
          return "#1a71ff"
        }
      }
    } 
  }
};

export default function ProspekView() {
  const {
    data: prospek,
    isLoading,
    error,
  } = useSWR("/api/dashboard/admin", fetcher);
  if (error) return <div>Error...</div>;
  if (isLoading) return <div>Loading...</div>;

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const labels = prospek.response.map((item: any) =>
    formatDate(item.tgl_laporan)
  );

  const prospekData = prospek.response.map((item: any) => item.prospek);

  const dealingData = prospek.response.map((item: any) => item.dealing);

  const data: ChartData<"bar"> = {
    labels: labels,
    datasets: [
      {
        label: "Dealing",
        data: dealingData,
        borderRadius: 5,
      },
      {
        label: "Prospek",
        data: prospekData,
        borderRadius: 5,

      },

    ],
  };
  
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Jenis Dealing</CardTitle>
          <CardDescription>
            Prospek atau dealing dalam 30 hari terakhir
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Bar options={options} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}