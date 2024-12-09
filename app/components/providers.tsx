import { type ReactNode } from "react";
import { DirectionProvider } from "@radix-ui/react-direction";
import { TooltipProvider } from "~/components/ui/tooltip";
import { TabsProvider } from "~/components/ui/tabs-provider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <DirectionProvider>
      <TabsProvider>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </TabsProvider>
    </DirectionProvider>
  );
}