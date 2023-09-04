"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "@/public/css/maplibre.css";
import { Disclosure } from "@/types/interfaces";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Camera, ListChecks, PenLine, Repeat } from "lucide-react";
import Script from "next/script";
import Map, { Marker } from "react-map-gl/maplibre";

import { base64ToBlob } from "@/lib/basetoblob";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { supabase } from "@/lib/supabase";


export const UserCards = ({ userData }: any) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <UserAttendanceModal opened={opened} close={close} userData={userData} />
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

interface IUserAttendanceModal extends Disclosure {
  userData: {};
}

const UserAttendanceModal = ({
  opened,
  close,
  userData,
}: IUserAttendanceModal) => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [address, setAddress] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  console.log("🚀 ~ file: cards.components.tsx:59 ~ userData:", userData)
  const [disableSubmit, setDisableSubmit] = useState(false);


  const handleSubmit = async () => {
    if (imageFile) {
      try {
        const { data, error } = await supabase.storage.from('selfie').upload(imageFile.name, imageFile)
        console.log("🚀 ~ file: cards.components.tsx:74 ~ handleSubmit ~ data:", data)
      } catch (error) {
        
      }
      // Perform the image upload here, e.g., using Supabase or another API
      // You can use the `imageFile` state to access the selected image file
      // Make sure to handle the upload logic and state updates accordingly
      console.log("Uploading image:", imageFile);

      // After successful upload, you can reset the state if needed
      setImageFile(null);
    }
  };

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
        <SelfieComponent setImageFile={setImageFile} onRetake={() => setDisableSubmit(true)} setDisableSubmit={setDisableSubmit}/>
        {imageFile && (
          <div className="mt-5">
            <Button onClick={handleSubmit} disabled={disableSubmit}>Submit</Button>
          </div>
        )}
      </Modal>
      <Script src="https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.js" />
    </>
  );
};

const SelfieComponent = ({
  setImageFile,
  onRetake,
  setDisableSubmit
}: {
  setImageFile: (file: File | null) => void;
  onRetake: () => void,
  setDisableSubmit: (value: boolean) => void;
}) => {
  const webcamRef = useRef<Webcam | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [cameraEnabled, setCameraEnabled] = useState(true);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const blob = base64ToBlob(imageSrc);
      const currentDate = new Date();
      const file = new File(
        [blob],
        `selfie_${currentDate.toISOString()}.jpeg`,
        {
          type: "image/jpeg",
        }
      );
      setImageFile(file);
      setImgSrc(imageSrc);
      setCameraEnabled(false);
      setDisableSubmit(false)
    }
  }, [webcamRef, setImgSrc, setImageFile, setDisableSubmit]);

  return (
    <div className="relative">
      {cameraEnabled ? (
        <Webcam
          ref={(ref) => {
            webcamRef.current = ref;
          }}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: "user",
          }}
        />
      ) : null}
      {cameraEnabled && (
        <Button onClick={capture} className="absolute top-1 right-1 shadow-md">
          <Camera className="mr-4 w-4 h-4" />
          Capture
        </Button>
      )}
      {imgSrc && (
        <div className="relative">
          <img src={imgSrc} alt="Captured" />
          {/* Add a button to allow retaking a photo if needed */}
          <div className="flex gap-2 mt-5 shadow-md">
            <Button
              className="absolute top-1 right-1"
              onClick={() => {
                setImgSrc(null);
                setCameraEnabled(true);
                onRetake();
              }}
            >
              <Repeat className="mr-4 w-4 h-4" />
              Ambil Ulang
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
