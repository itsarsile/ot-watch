"use client";
import {
    Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetcher } from "@/lib/fetcher";
import {
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import useSWR from "swr";

ChartJS.register(CategoryScale, Legend, Tooltip, LinearScale, BarElement);


export default function VisitorNeedsView() {
  const {
    data: needs,
    isLoading,
    error,
  } = useSWR("/api/dashboard/admin/needs", fetcher);

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

  const labels = needs?.map((item: any) => formatDate(item.tgl_laporan));
  const keluhanData = needs?.map((item: any) => item.keluhan_pelanggan);
  const daftarData = needs?.map((item: any) => item.daftar_indihome);
  const pembelianOrbit = needs?.map((item: any) => item.pembelian_orbit);
  const tanyaProduk = needs?.map((item: any) => item.tanya_seputar_produk);
  const data: ChartData<"bar"> = {
    labels: labels,
    datasets: [
      {
        label: "Keluhan Pelanggan",
        data: keluhanData,
        backgroundColor: "#053B50",
      },
      {
        label: "Daftar IndiHome",
        data: daftarData,
        backgroundColor: "#176B87",
      },
      {
        label: "Pembelian Orbit",
        data: pembelianOrbit,
        backgroundColor: "#64CCC5",
      },
      {
        label: "Tanya Produk",
        data: tanyaProduk,
        backgroundColor: "#EEEEEE",
      },
    ],
  };
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
        },
      },
    },
    color: "black",
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Kebutuhan Pelanggan</CardTitle>
          <CardDescription>
            Grafik kebutuhan pelanggan datang ke open table selama 30 terakhir
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Bar data={data} options={options} />
        </CardContent>
      </Card>
    </div>
  );
}
