import { Metadata } from "next";
import { MapsComponents } from "./OpenTableMaps";

export const metadata: Metadata = {
  title: 'Lokasi Open Table - OT Watch'
} 

async function OpenTablePage() {
  return (
    <div>
    <MapsComponents />
    </div>
  );
}

export default OpenTablePage;
