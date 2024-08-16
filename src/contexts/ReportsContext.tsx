import { ChartData } from "chart.js";
import React, {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import { useDrop } from "react-dnd";
import { WidgetType } from "./WidgetContext";
import { Metric } from "@/shared/metrics";

interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  static?: boolean;
}

interface ReportWidget {
  id: string;
  type: WidgetType;
  data: ChartData | number;
  name: string;
}

interface ReportsContextProps {
  widgets: ReportWidget[];
  layouts: Record<string, LayoutItem[]>;
  removeWidget: (id: string) => void;
  onLayoutChange: (
    layout: LayoutItem[],
    allLayouts: Record<string, LayoutItem[]>
  ) => void;
  dropRef: (node: HTMLElement | null) => void;
  canDrop: boolean;
  isOver: boolean;
  onBreakpointChange: (breakpoint: string) => void;
  currentBreakpoint: string;
  gridContainerRef: React.MutableRefObject<HTMLElement | null>;
}

const ReportsContext = createContext<ReportsContextProps | undefined>(
  undefined
);

export const ReportsContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [widgets, setWidgets] = useState<ReportWidget[]>([]);
  const [layouts, setLayouts] = useState<Record<string, LayoutItem[]>>({
    lg: [],
  });
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("lg");
  const gridContainerRef = useRef<HTMLElement | null>(null);

  /**
   * Finds an available position for a new widget within the grid layout.
   */
  const findAvailablePosition = (
    layout: LayoutItem[],
    widgetSize: { h: number; w: number }
  ): { x: number; y: number } => {
    const gridHeight = Math.max(...layout.map((item) => item.y + item.h));
    const colCount = ReportCols[currentBreakpoint];

    for (let y = 0; y <= gridHeight; y++) {
      for (let x = 0; x <= colCount - widgetSize.w; x++) {
        const fits = layout.every((item) => {
          const noOverlap =
            x + widgetSize.w <= item.x || // No overlap to the left
            x >= item.x + item.w || // No overlap to the right
            y + widgetSize.h <= item.y || // No overlap above
            y >= item.y + item.h; // No overlap below
          return noOverlap;
        });

        if (fits) {
          return { x, y };
        }
      }
    }

    // If no available position is found, place it at the end
    return { x: 0, y: gridHeight };
  };

  /**
   * Adds a new widget to the report and updates the layout.
   */
  const addWidget = (newWidget: ReportWidget) => {
    setWidgets((prevWidgets) => [...prevWidgets, newWidget]);
    setLayouts((prevLayouts) => {
      const widgetSize = determineWidgetSize(newWidget.type);
      const currentLayout = prevLayouts[currentBreakpoint] || [];
      const position = findAvailablePosition(currentLayout, widgetSize);

      return {
        ...prevLayouts,
        [currentBreakpoint]: [
          ...currentLayout,
          {
            i: newWidget.id,
            x: position.x,
            y: position.y,
            ...widgetSize,
          },
        ],
      };
    });
  };

  /**
   * Removes a widget from the report by its ID.
   */
  const removeWidget = (id: string) => {
    setWidgets((prevWidgets) =>
      prevWidgets.filter((widget) => widget.id !== id)
    );
    setLayouts((prevLayouts) => {
      const updatedLayouts = { ...prevLayouts };
      updatedLayouts[currentBreakpoint] = updatedLayouts[
        currentBreakpoint
      ]?.filter((layout) => layout.i !== id);
      return updatedLayouts;
    });
  };

  /**
   * Handles the layout change event.
   */
  const onLayoutChange = (
    layout: LayoutItem[],
    allLayouts: Record<string, LayoutItem[]>
  ) => {
    setLayouts((prevLayouts) => ({
      ...prevLayouts,
      ...allLayouts,
    }));
  };

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "report",
    drop: (item: { metric: Metric; widgetType: WidgetType }) => {
      addWidget({
        id: Date.now().toString(),
        data: prepareChartData(item.metric, item.widgetType),
        type: item.widgetType,
        name: item.metric.name,
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  /**
   * Handles the breakpoint change event.
   */
  const onBreakpointChange = (breakpoint: string) => {
    setCurrentBreakpoint(breakpoint);
  };

  /**
   * Attaches the drop target to a DOM node.
   */
  const dropRef = (node: HTMLElement | null) => {
    if (node) {
      drop(node);
    }
  };

  return (
    <ReportsContext.Provider
      value={{
        widgets,
        layouts,
        removeWidget,
        onLayoutChange,
        dropRef,
        canDrop,
        isOver,
        onBreakpointChange,
        currentBreakpoint,
        gridContainerRef,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

/**
 * Custom hook to use the ReportsContext.
 * Throws an error if used outside of the ReportsContextProvider.
 */
export const useReportsContext = () => {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error(
      "useReportsContext must be used within a ReportsContextProvider"
    );
  }
  return context;
};

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

const getColorArray = (length: number) => {
  const colorArray = [];
  for (let i = 0; i < length; i++) {
    colorArray.push(COLORS[i % COLORS.length]);
  }
  return colorArray;
};

/**
 * Prepares chart data based on the metric and widget type.
 */
const prepareChartData = (
  metric: Metric,
  widgetType: WidgetType
): ChartData | number => {
  switch (widgetType) {
    case "number":
      return metric.value;
    case "pie":
    case "doughnut": {
      const { breakdown } = metric.chartData;
      return {
        labels: breakdown?.map((item) => item.label),
        datasets: [
          {
            label: metric.name,
            data: breakdown?.map((item) => item.value),
          },
        ],
      };
    }
    case "bar":
    case "line": {
      const { timeseries } = metric.chartData;
      return {
        labels: timeseries?.map((item) => item.time),
        datasets: [
          {
            label: metric.name,
            data: timeseries?.map((item) => item.value),
            fill: false,
          },
        ],
      };
    }
    default:
      return metric.value;
  }
};

/**
 * Determines the initial size of the widget based on its type.
 */
const determineWidgetSize = (widgetType: WidgetType) => {
  switch (widgetType) {
    case "line":
    case "bar":
      return { h: 8, w: 12 };
    case "doughnut":
    case "pie":
      return { h: 12, w: 12 };
    default:
      return { h: 6, w: 6 };
  }
};

export const ReportCols: Record<string, number> = {
  lg: 28,
  md: 24,
  sm: 12,
  xs: 8,
  xxs: 4,
};
