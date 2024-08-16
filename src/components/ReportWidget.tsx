import { Icon } from "@iconify/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ChartComponent from "./ChartComponent";
import { ChartData, ChartOptions } from "chart.js";
import { WidgetType } from "@/contexts/WidgetContext";
import useWidgetColorTheme from "@/hooks/use-widget-color-theme";
import ColorsForm from "./ColorsForm";
import {
  useClick,
  useFloating,
  useInteractions,
  flip,
  autoPlacement,
} from "@floating-ui/react";

interface ReportWidgetProps {
  type: WidgetType;
  data: ChartData | number;
  options?: ChartOptions;
  title: string;
  onRemove: () => void;
}

const ReportWidget: React.FC<ReportWidgetProps> = ({
  type,
  data,
  options,
  title,
  onRemove,
}) => {
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Floating UI configuration for the color picker popover
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      autoPlacement({ allowedPlacements: ["top-end", "bottom-end"] }),
      flip({ fallbackPlacements: ["right-end"] }),
    ],
  });
  const click = useClick(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click]);

  const {
    widgetColors: backgroundColor,
    widgetColorsWithOpacity: backgroundColorWithOpacity,
    handleColorChange,
  } = useWidgetColorTheme(data);

  // Memoized widget data to ensure that color changes are applied efficiently
  const widgetData: { data: ChartData | number; color?: string } =
    useMemo(() => {
      if (typeof data === "number") {
        return { data, color: backgroundColor as string };
      }

      const updatedData = { ...data };
      if (type === "pie" || type === "doughnut") {
        updatedData.datasets = updatedData.datasets.map((dataset) => ({
          ...dataset,
          backgroundColor,
        }));
      } else {
        updatedData.datasets = updatedData.datasets.map((dataset) => ({
          ...dataset,
          backgroundColor: backgroundColorWithOpacity,
          hoverBackgroundColor: backgroundColor,
          borderColor: backgroundColor,
        }));
      }
      return { data: updatedData };
    }, [backgroundColor, backgroundColorWithOpacity, type, data]);

  // Render the appropriate content based on the widget type
  const renderChart = () => {
    if (!data) {
      return <div>No data available</div>;
    }

    if (type === "number") {
      return (
        <div
          className="text-6xl font-semibold"
          style={{ color: widgetData.color }}
        >
          {widgetData.data as number}
        </div>
      );
    }

    return (
      <ChartComponent
        type={type}
        data={widgetData.data as ChartData}
        options={options ?? { responsive: true }}
      />
    );
  };

  // Ensure the widget scrolls into view when first rendered
  useEffect(() => {
    if (widgetRef.current && !hasScrolled) {
      widgetRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      setHasScrolled(true);
    }
  }, [hasScrolled]);

  // Handle outside click to close the color picker popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const referenceElement = refs.reference.current as HTMLElement | null;
      const floatingElement = refs.floating.current as HTMLElement | null;

      if (
        floatingElement &&
        !floatingElement.contains(event.target as Node) &&
        referenceElement &&
        !referenceElement.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, refs.floating, refs.reference]);

  return (
    <div
      className="widget w-full h-full flex items-center justify-center"
      ref={widgetRef}
    >
      <h3 className="text-lg leading-6 text-slate-600 font-semibold absolute top-0 left-0 pl-6 pt-3">
        {title}
      </h3>
      <div
        className="flex items-center gap-x-2 absolute top-2 right-2"
        onMouseDown={(event) => event.stopPropagation()}
        onTouchStart={(event) => event.stopPropagation()}
      >
        {/* Edit color icon */}
        <span
          className="inline-block h-fit"
          ref={refs.setReference}
          {...getReferenceProps()}
        >
          <Icon
            icon="bx:edit"
            width={20}
            height={20}
            className="text-white bg-blue-500 rounded-md p-1 box-content cursor-pointer opacity-0 group-hover:opacity-100"
          />
        </span>
        {/* Delete widget icon */}
        <Icon
          icon="bx:trash"
          width={20}
          height={20}
          className="text-white bg-red-500 rounded-md p-1 box-content cursor-pointer opacity-0 group-hover:opacity-100"
          onMouseDown={(event) => event.stopPropagation()}
          onTouchStart={(event) => event.stopPropagation()}
          onClick={onRemove}
        />
      </div>
      {isOpen && backgroundColor && (
        <div
          className="bg-white p-3 shadow-drop-down rounded-md"
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <ColorsForm
            colors={backgroundColor}
            labels={
              typeof data === "number"
                ? title
                : ((data as ChartData).labels as string[])
            }
            onChange={handleColorChange}
          />
        </div>
      )}
      {renderChart()}
    </div>
  );
};

export default ReportWidget;
