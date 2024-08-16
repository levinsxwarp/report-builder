"use client";
import { useMetricsContext } from "@/contexts/MetricsContext";
import { useWidgetContext } from "@/contexts/WidgetContext";
import { Metric } from "@/shared/metrics";
import { Icon } from "@iconify/react";
import classNames from "classnames";
import { FC } from "react";
import { useDrag } from "react-dnd";

interface MetricItemProps {
  metric: Metric;
}

const MetricItem: FC<MetricItemProps> = ({ metric }) => {
  const { widgetType } = useWidgetContext();
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "report",
      item: { metric, widgetType },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [widgetType]
  );

  // Attach drag ref to the DOM node for drag-and-drop functionality
  const dragRef = (node: HTMLElement | null) => {
    if (node) {
      drag(node);
    }
  };

  return (
    <div
      ref={dragRef}
      className={classNames(
        "flex items-center px-4 py-3 cursor-move bg-white rounded-lg border border-slate-200 hover:shadow-blue-200/50 hover:shadow-md transition-shadow",
        { "opacity-35": isDragging }
      )}
    >
      <Icon
        icon="bx:grid-vertical"
        width={32}
        height={32}
        className="text-slate-400 mr-4"
      />
      <div className="flex-1 flex flex-col gap-y-1">
        <h4 className="text-base font-semibold text-slate-600">
          {metric.name}
        </h4>
        <p className="text-sm text-slate-600/80">{metric.description}</p>
      </div>
    </div>
  );
};

const MetricsList: FC = () => {
  const { metrics, loading, error } = useMetricsContext();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="metrics-list-container h-full overflow-hidden flex flex-col gap-y-4">
      <h3 className="text-lg font-semibold">Metrics</h3>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-y-auto flex flex-col gap-y-3 pb-2 px-1">
          {metrics.map((metric) => (
            <MetricItem key={metric.id} metric={metric} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MetricsList;
