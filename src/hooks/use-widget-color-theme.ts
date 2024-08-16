import { ChartData } from "chart.js";
import { useEffect, useMemo, useRef, useState } from "react";

// Predefined color palette for widgets
const COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#FFCD56",
  "#4CAF50",
  "#F44336",
  "#9C27B0",
];

/**
 * Returns an array of colors for the given length, cycling through the predefined COLORS.
 */
const getColorArray = (length: number): string[] => {
  return Array.from({ length }, (_, i) => COLORS[i % COLORS.length]);
};

type Color = string;

/**
 * Custom hook to manage and provide color themes for widgets.
 * Supports both single-value and dataset-based widgets.
 */
const useWidgetColorTheme = (data: ChartData | number) => {
  const [widgetColors, setWidgetColors] = useState<Color | Color[]>();
  const isInitialized = useRef<boolean>(false);

  const widgetColorsWithOpacity = useMemo(() => {
    if (typeof widgetColors === "string") {
      return `${widgetColors}08`; // Single color with light opacity
    }
    return widgetColors?.map((color) => `${color}80`); // Array of colors with opacity
  }, [widgetColors]);

  const handleColorChange = (color: string, index?: number) => {
    if (Array.isArray(widgetColors) && typeof index === "number") {
      const updatedColors = [...widgetColors];
      updatedColors[index] = color;
      setWidgetColors(updatedColors);
    } else {
      setWidgetColors(color);
    }
  };

  useEffect(() => {
    if (isInitialized.current) return;

    if (typeof data === "number") {
      setWidgetColors("#2089ff"); // Default color for single value widgets
    } else {
      const { labels } = data as ChartData;
      const colorsSet = getColorArray(labels?.length ?? 1);
      setWidgetColors(colorsSet);
    }
    isInitialized.current = true;
  }, [data]);

  return {
    widgetColors,
    widgetColorsWithOpacity,
    handleColorChange,
  };
};

export default useWidgetColorTheme;
