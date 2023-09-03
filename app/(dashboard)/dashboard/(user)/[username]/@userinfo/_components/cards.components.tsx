"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Disclosure } from "@/types/interfaces";
import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { ListChecks, PenLine } from "lucide-react";
import Map, { Marker } from "react-map-gl/maplibre";
import Script from "next/script";
import "@/public/css/maplibre.css";

import { useGeolocated } from "react-geolocated";
import { useEffect, useState } from "react";

export const UserCards = ({ userData }: any) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <UserAttendanceModal opened={opened} close={close} />
      <Card>
        <CardHeader>
          <CardTitle>Halo, {userData.name}</CardTitle>
          <CardDescription>
            Jangan lupa untuk mengisi laporan harian beserta lokasi open tabel
            saat ini dibawah!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button onClick={open}>
            <PenLine className="mr-2 h-4 w-4" /> Check-In Open Table
          </Button>
          <Button>
            <ListChecks className="mr-2 h-4 w-4" /> Buat Laporan Harian
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

const UserAttendanceModal = ({ opened, close }: Disclosure) => {
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    })
    console.log("🚀 ~ file: cards.components.tsx:51 ~ UserAttendanceModal ~ location:", location)

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
            }),
            (error: any) => {
                console.error("Error getting location:", error)
            }
        } else {
            console.error("Geolocation is not supported by this browser")
        }
    }

    useEffect(() => {
        // Get the user's location when the modal is opened
        if (opened) {
          getLocation();
        }
      }, [opened]);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Absen Open Table">
        <Map
          mapStyle="https://4flsvk-8080.csb.app/styles/basic-preview/style.json"
          style={{ width: "100%", height: "20vh" }}
          attributionControl={false}
          initialViewState={{
            latitude: -6.277454481086592,
            longitude: 106.66200115221575,
            zoom: 10,
          }}
        >
            <Marker longitude={location.longitude} latitude={location.latitude}></Marker>
        </Map>

            <Button onClick={getLocation}>Ambil Lokasi Terkini</Button>
      </Modal>
      <Script src="https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.js" />
    </>
  );
};
