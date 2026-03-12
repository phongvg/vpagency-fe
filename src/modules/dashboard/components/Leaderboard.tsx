import LeaderboardPodium from "@/modules/dashboard/components/LeaderboardPodium";

export default function Leaderboard() {
  return (
    <div className='flex justify-center items-center gap-10 pt-10 pb-5'>
      <LeaderboardPodium
        rank={2}
        user={{
          id: "698b62fa64fce4c719c45124",
          username: "linhtets",
          telegramId: "5876078880",
          email: "1@gmail.com",
          firstName: "John",
          lastName: "Doe",
          avatar: "https://github.com/maxleiter.png",
          roles: ["USER"],
          status: "ACTIVE",
          createdAt: new Date("2026-02-10T16:55:22.086Z"),
          updatedAt: new Date("2026-02-10T17:09:26.646Z"),
        }}
        points={80}
      />
      <LeaderboardPodium
        rank={1}
        user={{
          id: "698b62fa64fce4c719c45124",
          username: "linhtets",
          telegramId: "5876078880",
          email: "1@gmail.com",
          firstName: "Alice",
          lastName: "Smith",
          avatar: "https://github.com/shadcn.png",
          roles: ["USER"],
          status: "ACTIVE",
          createdAt: new Date("2026-02-10T16:55:22.086Z"),
          updatedAt: new Date("2026-02-10T17:09:26.646Z"),
        }}
        points={100}
      />
      <LeaderboardPodium
        rank={3}
        user={{
          id: "698b62fa64fce4c719c45124",
          username: "linhtets",
          telegramId: "5876078880",
          email: "1@gmail.com",
          firstName: "Bob",
          lastName: "Johnson",
          avatar: "https://github.com/pranathip.png",
          roles: ["USER"],
          status: "ACTIVE",
          createdAt: new Date("2026-02-10T16:55:22.086Z"),
          updatedAt: new Date("2026-02-10T17:09:26.646Z"),
        }}
        points={70}
      />
    </div>
  );
}
