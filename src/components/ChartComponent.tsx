import React, { useEffect, useRef } from "react";
import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
import isEqual from "@/utils/isEqual";

// Register all necessary Chart.js components globally
Chart.register(...registerables);

type ChartComponentProps = {
  type: "line" | "bar" | "pie" | "doughnut"; // Chart type
  data: ChartData; // Data to be displayed in the chart
  options?: ChartOptions; // Optional configuration for the chart
};

const ChartComponent: React.FC<ChartComponentProps> = React.memo(
  ({ type, data, options }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    useEffect(() => {
      console.log("====>useEffect");
      if (chartRef.current) {
        if (chartInstanceRef.current && chartInstanceRef.current.canvas) {
          const updatedOptions: ChartOptions = {
            ...options,
            animation: {
              duration: 0, // Set animation duration to 0 to disable animation
              ...(options?.animation ?? {}), // Allow overriding via props
            },
          };
          chartInstanceRef.current.config.data = data;
          chartInstanceRef.current.config.options = updatedOptions;
          chartInstanceRef.current.update();
        } else {
          // Create a new chart instance with the provided type, data, and options
          chartInstanceRef.current = new Chart(chartRef.current, {
            type,
            data,
            options,
          });
        }
      }
    }, [type, data, options]);

    useEffect(() => {
      return () => {
        if (chartInstanceRef.current) {
          console.log("====>destroy");
          chartInstanceRef.current.destroy();
        }
      };
    }, []);

    return <canvas ref={chartRef} className="w-full h-full" />;
  },
  (prevProps, nextProps) => {
    return (
      prevProps.type === nextProps.type &&
      isEqual(prevProps.data, nextProps.data) &&
      isEqual(prevProps.options, nextProps.options)
    );
  }
);

ChartComponent.displayName = "ChartComponent";

export default ChartComponent;
