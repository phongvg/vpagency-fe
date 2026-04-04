import FinalUrlDailyStats from "@/modules/projectDailyStats/components/FinalUrlDailyStats";
import FinalUrlSummary from "@/modules/projectDailyStats/components/FinalUrlSummary";

export default function FinalUrlDailyStatsTab() {
  return (
    <div className='space-y-4'>
      <FinalUrlSummary />
      <FinalUrlDailyStats />
    </div>
  );
}
