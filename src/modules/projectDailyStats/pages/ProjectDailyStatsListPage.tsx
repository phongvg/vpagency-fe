import FinalUrlDailyStatsTab from "@/modules/projectDailyStats/components/FinalUrlDailyStatsTab";
import ProjectDailyStatsTab from "@/modules/projectDailyStats/components/ProjectDailyStatsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useState } from "react";

const TABS = [
  { value: "project", label: "Tổng quan dự án" },
  { value: "final-url", label: "Tổng quan URL" },
];

export default function ProjectDailyStatsListPage() {
  const [tabValue, setTabValue] = useState<string>(TABS[0].value);

  return (
    <Tabs value={tabValue} onValueChange={setTabValue}>
      <TabsList className='bg-card/50 backdrop-blur-sm rounded-lg'>
        {TABS.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className='data-[state=active]:shadow-lg transition-all duration-300 '>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={TABS[0].value}>
        <ProjectDailyStatsTab />
      </TabsContent>

      <TabsContent value={TABS[1].value}>
        <FinalUrlDailyStatsTab />
      </TabsContent>
    </Tabs>
  );
}
