"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { MetricsContextProvider } from "@/contexts/MetricsContext";
import { ReportsContextProvider } from "@/contexts/ReportsContext";
import { WidgetContextProvider } from "@/contexts/WidgetContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Lazy load components
const MetricsList = dynamic(() => import("@/components/MetricsList"), {
  suspense: true,
});
const ReportPanel = dynamic(() => import("@/components/ReportPanel"), {
  suspense: true,
});
const Widgets = dynamic(() => import("@/components/Widgets"), {
  suspense: true,
});

const Home: React.FC = () => {
  return (
    <WidgetContextProvider>
      <MetricsContextProvider>
        <DndProvider backend={HTML5Backend}>
          <div className="h-screen flex">
            {/* Report builder area */}
            <div className="flex-1 bg-blue-50 overflow-y-auto pb-12">
              <ReportsContextProvider>
                <Suspense fallback={<div>Loading Report Panel...</div>}>
                  <ReportPanel />
                </Suspense>
              </ReportsContextProvider>
            </div>
            {/* Sidebar for widgets and metrics */}
            <div className="shadow-slate-400/50 shrink-0 w-[500px] shadow-lg px-7 py-10 overflow-hidden flex-col flex h-full gap-y-7">
              <Suspense fallback={<div>Loading Widgets...</div>}>
                <Widgets />
              </Suspense>
              <Suspense fallback={<div>Loading Metrics List...</div>}>
                <MetricsList />
              </Suspense>
            </div>
          </div>
        </DndProvider>
      </MetricsContextProvider>
    </WidgetContextProvider>
  );
};

export default Home;
