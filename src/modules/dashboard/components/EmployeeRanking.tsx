import Leaderboard from "@/modules/dashboard/components/Leaderboard";
import LeaderboardList from "@/modules/dashboard/components/LeaderboardList";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card";

export default function EmployeeRanking() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bảng xếp hạng nhân viên</CardTitle>
      </CardHeader>

      <CardContent className='normal-case'>
        <Leaderboard />
        <LeaderboardList />
      </CardContent>
    </Card>
  );
}
