"use client";

import { HoverCard, Stack, Title } from "@mantine/core";
import { IconPin, IconPinFilled } from "@tabler/icons-react";
import React, { useMemo } from "react";
import Map, { MapLayerMouseEvent, Marker } from "react-map-gl/maplibre";
import Script from "next/script";
import "@/public/css/maplibre.css";
import { HoverCardTrigger } from "@/components/ui/hover-card";

export const MapsComponents = () => {
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
        <HoverCard>
          <Marker
            longitude={106.71145327501563}
            latitude={-6.297110557389146}
            color="#f3f3f3"
          >
            <HoverCard.Target>
              <IconPinFilled className="text-red-500" scale={3} />
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <p>Test hover</p>
            </HoverCard.Dropdown>
          </Marker>
        </HoverCard>
      </Map>
      <Script src="https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.js" />
    </>
  );
};
