"use client";
import { useWidgetContext, WidgetType } from "@/contexts/WidgetContext";
import { Icon } from "@iconify/react";
import classNames from "classnames";
import React from "react";

const Widgets: React.FC = () => {
  const { widgetType, setWidgetType } = useWidgetContext();

  // Icons and corresponding widget types
  const widgetIcons: { type: WidgetType; icon: string }[] = [
    { type: "number", icon: "bx:hash" },
    { type: "line", icon: "bx:line-chart" },
    { type: "bar", icon: "bx:bar-chart-alt-2" },
    { type: "doughnut", icon: "bx:doughnut-chart" },
    { type: "pie", icon: "bx:pie-chart-alt-2" },
  ];

  return (
    <div className="widgets-container flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Widgets</h3>
      <div className="flex flex-wrap gap-4">
        {widgetIcons.map((widget) => {
          const isSelected = widget.type === widgetType;
          return (
            <button
              key={widget.type}
              onClick={() => setWidgetType(widget.type)}
              className={classNames(
                "cursor-pointer flex h-10 w-10 rounded-lg items-center justify-center  border",
                {
                  "ring-3 ring-blue-400/30 border-blue-400": isSelected,
                  "border-slate-300": !isSelected,
                }
              )}
            >
              <Icon
                icon={widget.icon}
                width={24}
                height={24}
                className={classNames({
                  "text-slate-600": !isSelected,
                  "text-blue-400": isSelected,
                })}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Widgets;
