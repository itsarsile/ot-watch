"use client";

import { Divider, HoverCard, Stack, Title } from "@mantine/core";
import { IconPin, IconPinFilled } from "@tabler/icons-react";
import React, { forwardRef, useMemo } from "react";
import Map, { MapLayerMouseEvent, Marker } from "react-map-gl/maplibre";
import Script from "next/script";
import "@/public/css/maplibre.css";
import { HoverCardTrigger } from "@/components/ui/hover-card";
import { Phone } from "lucide-react";

export const MapsComponents = ({ attendanceData }: any) => {
  console.log(
    "🚀 ~ file: OpenTableMaps.tsx:12 ~ MapsComponents ~ attendanceData:",
    attendanceData
  );

  const attendancesMarkerPin = attendanceData.todayAttendances.map(
    (attendance: any) => (
      <HoverCard key={attendance.username} width={300} withArrow closeDelay={300}>
        <Marker
          longitude={attendance.longitude}
          latitude={attendance.latitude}
          scale={15}
        >
          <HoverCard.Target>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              version="1.1"
            >
              <g transform="translate(0 -1028.4)">
                <path
                  d="m12 0c-4.4183 2.3685e-15 -8 3.5817-8 8 0 1.421 0.3816 2.75 1.0312 3.906 0.1079 0.192 0.221 0.381 0.3438 0.563l6.625 11.531 6.625-11.531c0.102-0.151 0.19-0.311 0.281-0.469l0.063-0.094c0.649-1.156 1.031-2.485 1.031-3.906 0-4.4183-3.582-8-8-8zm0 4c2.209 0 4 1.7909 4 4 0 2.209-1.791 4-4 4-2.2091 0-4-1.791-4-4 0-2.2091 1.7909-4 4-4z"
                  transform="translate(0 1028.4)"
                  fill="#e74c3c"
                />
                <path
                  d="m12 3c-2.7614 0-5 2.2386-5 5 0 2.761 2.2386 5 5 5 2.761 0 5-2.239 5-5 0-2.7614-2.239-5-5-5zm0 2c1.657 0 3 1.3431 3 3s-1.343 3-3 3-3-1.3431-3-3 1.343-3 3-3z"
                  transform="translate(0 1028.4)"
                  fill="#c0392b"
                />
              </g>
            </svg>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <div className="flex flex-col justify-center items-center text-center">
            <p className="font-bold">{attendance.profilekcontact} - {attendance.profilename}</p>
            <p className="flex my-2">Nomor HP - {attendance.profilephonenumber}</p>
            <Divider my={5}/>
            <p>{attendance.otLocation}</p>
            <Divider my={5}/>
            <div className="flex">{attendance.latitude}, {attendance.longitude}</div>
            <Divider my={5}/>
            <img src={attendance.photo} width="100" height="50" alt="selfie"/>
            </div>
          </HoverCard.Dropdown>
        </Marker>
      </HoverCard>
    )
  );

  const handleClick = (event: MapLayerMouseEvent) => {
    let lngLat = event.lngLat;
    console.log(
      "🚀 ~ file: maps.components.tsx:9 ~ handleClick ~ lngLat:",
      lngLat
    );
  };

  return (
    <>
      <Map
        doubleClickZoom={false}
        onDblClick={handleClick}
        initialViewState={{
          latitude: -6.277454481086592,
          longitude: 106.66200115221575,
          zoom: 10,
        }}
        mapStyle="https://4flsvk-8080.csb.app/styles/basic-preview/style.json"
        style={{ width: "100%", height: "80vh" }}
        attributionControl={false}
      >
        {attendancesMarkerPin}
      </Map>
      <Script src="https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.js" />
    </>
  );
};
