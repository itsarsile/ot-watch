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
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
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
  });
  const [address, setAddress] = useState("");

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        convertLatLongToAddress(
          position.coords.latitude,
          position.coords.longitude
        );
      }),
        (error: any) => {
          console.error("Error getting location:", error);
        };
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  }, []);

  const convertLatLongToAddress = async (
    latitude: number,
    longitude: number
  ) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEO_API_KEY;
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.results.length > 0) {
        setAddress(data.results[0].formatted_address);
      } else {
        setAddress("Address not found");
      }
    } catch (error) {
      console.error("Error converting lat/long to address:", error);
      setAddress("Address not found");
    }
  };

  useEffect(() => {
    if (opened) {
      getLocation();
    }
  }, [opened, getLocation]);

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
          <Marker
            longitude={location.longitude}
            latitude={location.latitude}
          ></Marker>
        </Map>
        <Card className="bg-transparent border-white my-5">
          <CardHeader>
            <CardTitle className="text-lg">Lokasi Open Table</CardTitle>
          </CardHeader>
          <CardContent>{address}</CardContent>
        </Card>
        <SelfieComponent />
      </Modal>
      <Script src="https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.js" />
    </>
  );
};

const SelfieComponent = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [cameraEnabled, setCameraEnabled] = useState(true);

  console.log(
    "🚀 ~ file: cards.components.tsx:141 ~ SelfieComponent ~ imgSrc:",
    imgSrc
  );

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
        setImgSrc(imageSrc)
        setCameraEnabled(false);
    }
  }, [webcamRef, setImgSrc]);

  return (
    <div>
      {cameraEnabled ? (
        <Webcam ref={(ref) => { webcamRef.current = ref}} screenshotFormat="image/jpeg" videoConstraints={{
            facingMode: "user"
        }}/>
      ) : null}
      {cameraEnabled && <Button onClick={capture} className="mt-5">Capture</Button>}
      {imgSrc && (
        <div>
          <img src={imgSrc} alt="Captured" />
          {/* Add a button to allow retaking a photo if needed */}
          <div className="flex gap-2 mt-5">
            <Button
              onClick={() => {
                setImgSrc(null);
                setCameraEnabled(true);
              }}
            >
              Retake
            </Button>
            <Button>Upload</Button>
          </div>
        </div>
      )}
    </div>
  );
};
