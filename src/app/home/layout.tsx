"use client";
// import modules
import React, { Suspense } from "react";
import DashboardLayoutContent from "@/components/Layout";

interface DashboardLayoutPageProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutPageProps> = (props) => {
  return (
    <Suspense fallback={<div></div>}>
      <DashboardLayoutContent>{props.children}</DashboardLayoutContent>
    </Suspense>
  );
};

export default DashboardLayout;
