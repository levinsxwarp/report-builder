import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
import { useEffect, useRef } from "react";

// Register all necessary Chart.js components globally
Chart.register(...registerables);

type ChartComponentProps = {
  type: "line" | "bar" | "pie" | "doughnut"; // Chart type
  data: ChartData; // Data to be displayed in the chart
  options?: ChartOptions; // Optional configuration for the chart
};

const ChartComponent: React.FC<ChartComponentProps> = ({
  type,
  data,
  options,
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      // Disable animations by default, but allow override via props
      const updatedOptions: ChartOptions = {
        ...options,
        animation: {
          duration: 0, // Set animation duration to 0 to disable animation
          ...(options?.animation ?? {}), // Allow overriding via props
        },
      };

      // Create a new chart instance with the provided type, data, and options
      chartInstanceRef.current = new Chart(chartRef.current, {
        type,
        data,
        options: updatedOptions,
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [type, data, options]); // Re-run effect when chart type, data, or options change

  return <canvas ref={chartRef} className="w-full h-full" />;
};

export default ChartComponent;
