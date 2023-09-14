import React from "react";
import ProspekView from "./ProspekView";
import UserAttendancesView from "./UserAttendancesView";
function AdminInfoPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <div className="w-1/2">
        <ProspekView />
      </div>
      <div className="w-1/2">
        <UserAttendancesView />
      </div>
    </div>
  );
}

export default AdminInfoPage;
