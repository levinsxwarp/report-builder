import React, { useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ReportCols, useReportsContext } from "@/contexts/ReportsContext";
import classNames from "classnames";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ReportWidget from "./ReportWidget";
import { Icon } from "@iconify/react";

const ResponsiveGridLayout = WidthProvider(Responsive);

const ReportPanel: React.FC = () => {
  const {
    dropRef,
    isOver,
    widgets,
    layouts,
    onLayoutChange,
    onBreakpointChange,
    currentBreakpoint,
    removeWidget,
    gridContainerRef,
  } = useReportsContext();

  const reportRef = useRef<HTMLDivElement>(null);

  // Function to download the report as a PDF
  const downloadPDF = () => {
    if (reportRef.current) {
      html2canvas(reportRef.current, { scale: 2 }).then((canvas) => {
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        const imgData = canvas.toDataURL("image/png");

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("report.pdf");
      });
    }
  };

  // Function to export the report data to a CSV file
  const exportToCSV = () => {
    const headers = widgets.map((widget) => widget.name).join(",");

    const rows = widgets
      .map((widget) => {
        if (Array.isArray(widget.data)) {
          return widget.data.join(",");
        } else if (
          typeof widget.data === "object" &&
          "datasets" in widget.data
        ) {
          const datasets = widget.data.datasets
            .map((dataset) => dataset.data)
            .flat();
          return datasets.join(",");
        }
        return "";
      })
      .join("\n");

    const csvData = `${headers}\n${rows}`;

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "report.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <div className="fixed top-3 left-10 flex items-center gap-x-4">
        <button
          onClick={downloadPDF}
          className="bg-blue-600 gap-x-2 text-white px-4 py-1 text-md rounded-lg flex items-center hover:bg-blue-700 transition-colors shadow-lg"
        >
          <Icon icon="bx:download" className="w-5 h-5" />
          Download PDF
        </button>
        <button
          onClick={exportToCSV}
          className="bg-green-600 gap-x-2 text-white px-4 py-1 text-md rounded-lg flex items-center hover:bg-green-700 transition-colors shadow-lg"
        >
          <Icon icon="bx:download" className="w-5 h-5" />
          Download CSV
        </button>
      </div>
      <div className="w-full p-10 mt-5">
        <div
          className="bg-white shadow-xl shadow-slate-400/30 rounded-xl flex flex-col print-only"
          ref={reportRef}
        >
          <div className="flex items-center justify-between p-10 shrink-0">
            <div
              className="text-2xl font-medium"
              contentEditable
              suppressContentEditableWarning
            >
              Company Name
            </div>
            <div contentEditable suppressContentEditableWarning>
              Report Name
            </div>
          </div>
          <div className="flex-1 pb-10 px-10">
            <div
              className={classNames("m-2 border border-dashed rounded", {
                "ring-3 ring-blue-400/30 border-blue-400": isOver,
                "border-gray-300": !isOver,
              })}
              ref={(node) => {
                dropRef(node);
                gridContainerRef.current = node;
              }}
            >
              <ResponsiveGridLayout
                className="layout"
                layouts={layouts}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={ReportCols}
                rowHeight={30}
                onLayoutChange={onLayoutChange}
                onBreakpointChange={onBreakpointChange}
                measureBeforeMount={false}
                useCSSTransforms={true}
                compactType={null}
                preventCollision={true}
                style={{ minHeight: "100%" }}
              >
                {widgets.map((widget) => {
                  const gridData = layouts[currentBreakpoint]?.find(
                    (layout) => layout.i === widget.id
                  );
                  return (
                    <div
                      key={widget.id}
                      data-grid={gridData}
                      className="relative p-5 pt-10 border border-gray-300 rounded-xl bg-white group"
                    >
                      <ReportWidget
                        type={widget.type}
                        data={widget.data}
                        title={widget.name}
                        options={{ responsive: true }}
                        onRemove={() => removeWidget(widget.id)}
                      />
                    </div>
                  );
                })}
              </ResponsiveGridLayout>
              {!widgets.length && (
                <div className="text-xl text-slate-600 py-16 text-center">
                  Drop the Metrics here to add to report
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportPanel;
