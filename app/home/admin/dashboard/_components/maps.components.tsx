"use client";

import { Stack, Title } from "@mantine/core";
import { IconPinFilled } from "@tabler/icons-react";
import Map, { MapLayerMouseEvent, Marker } from "react-map-gl/maplibre";

export const MapsComponents = () => {
  const handleClick = (event: MapLayerMouseEvent) => {
    let lngLat = event.lngLat;
    console.log(
      "🚀 ~ file: maps.components.tsx:9 ~ handleClick ~ lngLat:",
      lngLat
    );
  };
  return (
    <Stack>
      <Title order={4}>Lokasi Open Table</Title>
      <div>
        <Map
          doubleClickZoom={false}
          onDblClick={handleClick}
          initialViewState={{
            latitude: -6.277454481086592,
            longitude: 106.66200115221575,
            zoom: 10,
          }}
          mapStyle="https://4flsvk-8080.csb.app/styles/basic-preview/style.json"
          style={{ width: "100%", height: "50rem" }}
        >
        </Map>
      </div>
    </Stack>
  );
};
