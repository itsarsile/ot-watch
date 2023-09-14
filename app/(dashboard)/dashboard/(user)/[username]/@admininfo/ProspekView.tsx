"use client";
import {
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

import useSWR from "swr";

import { Bar } from "react-chartjs-2";
import { fetcher } from "@/lib/fetcher";

ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

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
        label: "Prospek",
        data: prospekData,
        backgroundColor: "#DAD4B5",
      },
      {
        label: "Dealing",
        data: dealingData,
        backgroundColor: "#A73121",
      },
    ],
  };
  return (
    <div>
      <Bar
        options={{
          color: "#ffff",
          borderColor: "#ffff",
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        }}
        data={data}
      />
    </div>
  );
}
