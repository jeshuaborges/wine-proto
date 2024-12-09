import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { SegmentCustomers } from "./segment-customers";
import { SegmentHistory } from "./segment-history";
import { TabsProvider } from "~/components/ui/tabs-provider";

export function SegmentTabsNav() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tab = searchParams.get("tab") || "customers";

  const handleTabChange = (value: string) => {
    navigate(`?tab=${value}`, { replace: true });
  };

  return (
    <TabsProvider>
      <Tabs defaultValue={tab} onValueChange={handleTabChange}>
        <TabsList className="w-full">
          <TabsTrigger value="customers" className="flex-1">
            Customers
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1">
            History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="customers">
          <SegmentCustomers />
        </TabsContent>
        <TabsContent value="history">
          <SegmentHistory />
        </TabsContent>
      </Tabs>
    </TabsProvider>
  );
}