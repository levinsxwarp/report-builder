import React from "react";

interface ColorsFormProps {
  colors: string | string[];
  labels: string | string[];
  onChange: (color: string, index?: number) => void;
}

const ColorsForm: React.FC<ColorsFormProps> = ({
  colors,
  labels,
  onChange,
}) => {
  /**
   * Prevents the event from propagating to parent elements. To avoid grid positioning while do actions
   */
  const stopPropagation = (event: React.MouseEvent | React.TouchEvent) => {
    event.stopPropagation();
  };

  const renderColorInput = (label: string, color: string, index?: number) => (
    <div
      className="flex items-center justify-between text-sm font-semibold py-2 px-1"
      key={index}
    >
      <span>{label}</span>
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value, index)}
        className="w-10 h-7 p-[1px] border border-gray-300 rounded-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
    </div>
  );

  return (
    <div
      className="w-80 min-h-fit max-h-96 overflow-y-auto"
      onMouseDown={stopPropagation}
      onTouchStart={stopPropagation}
    >
      {typeof labels === "string"
        ? renderColorInput(labels, colors as string)
        : (labels as string[]).map((label, index) =>
            renderColorInput(label, (colors as string[])[index], index)
          )}
    </div>
  );
};

export default ColorsForm;
