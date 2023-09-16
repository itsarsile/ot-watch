import React from "react";
import ProspekView from "./ProspekView";
import VisitorNeedsView from "./VisitorNeedsView";
import ReportList from "../@userinfo/ReportList";

export const dynamic = 'force-dynamic'

function AdminInfoPage() {
  return (
    <div className="grid lg:grid-cols-6 gap-5">
      <div className="lg:col-span-3">
        <ProspekView />
      </div>
      <div className="lg:col-span-3">
        <VisitorNeedsView />
      </div>
      {/* <div className="lg:col-span-6">
        <ReportList />
      </div> */}
    </div>
  );
}

export default AdminInfoPage;
