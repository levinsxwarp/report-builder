"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

// Available widget types for the application
export type WidgetType = "pie" | "bar" | "line" | "number" | "doughnut";

interface WidgetContextType {
  widgetType: WidgetType;
  setWidgetType: React.Dispatch<React.SetStateAction<WidgetType>>;
}

const WidgetContext = createContext<WidgetContextType | undefined>(undefined);

// Custom hook to access the widget context, ensures context is used within the provider
export const useWidgetContext = (): WidgetContextType => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error(
      "useWidgetContext must be used within a WidgetContextProvider"
    );
  }
  return context;
};

interface WidgetContextProviderProps {
  children: ReactNode;
}

// Context provider component to manage and provide widget type state
export const WidgetContextProvider: React.FC<WidgetContextProviderProps> = ({
  children,
}) => {
  const [widgetType, setWidgetType] = useState<WidgetType>("pie");

  return (
    <WidgetContext.Provider value={{ widgetType, setWidgetType }}>
      {children}
    </WidgetContext.Provider>
  );
};
