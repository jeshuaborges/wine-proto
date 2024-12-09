import { createContext, useContext, useState, type ReactNode } from "react";

interface TabsContextValue {
  value?: string;
  onChange?: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

interface TabsProviderProps {
  children: ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function TabsProvider({ children, defaultValue, value, onValueChange }: TabsProviderProps) {
  const [localValue, setLocalValue] = useState(defaultValue);

  const contextValue = {
    value: value ?? localValue,
    onChange: onValueChange ?? setLocalValue,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      {children}
    </TabsContext.Provider>
  );
}

export function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabsContext must be used within a TabsProvider");
  }
  return context;
}