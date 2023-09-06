import React from "react";
import { MapsComponents } from "./OpenTableMaps";
import { cookies } from "next/headers";

async function getCookieData() {
  const cookieData = cookies().toString()
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData)
    }, 1000)
  )
}

async function getAttendanceData() {
  const cookies = await getCookieData()
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/opentable/api/attendance`,
    {
      //@ts-ignore chill buddy
      headers: {
        Cookie: cookies,
      },
      cache: "no-store"
    }
  );

  if (res.ok) {
    return res.json();
  }
  console.error("Error fetching attendances");
}

async function OpenTablePage() {
  const attendanceData = await getAttendanceData();
  return (
    <div>
      <MapsComponents attendanceData={attendanceData}/>
    </div>
  );
}

export default OpenTablePage;
