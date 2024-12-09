import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useSearchParams } from "@remix-run/react";
import { TabsProvider } from "~/components/ui/tabs-provider";

export function SegmentTabs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "all";

  const handleTabChange = (value: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set("tab", value);
      return newParams;
    }, { replace: true });
  };

  return (
    <TabsProvider>
      <Tabs defaultValue={currentTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="all">All Segments</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
          <TabsTrigger value="dynamic">Dynamic</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          {/* Content is rendered by the parent component */}
        </TabsContent>
        <TabsContent value="manual">
          {/* Content is rendered by the parent component */}
        </TabsContent>
        <TabsContent value="dynamic">
          {/* Content is rendered by the parent component */}
        </TabsContent>
        <TabsContent value="templates">
          {/* Content is rendered by the parent component */}
        </TabsContent>
      </Tabs>
    </TabsProvider>
  );
}