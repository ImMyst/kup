import Footer from "@components/Footer";
import RowData from "@components/RowData";
import Topbar from "@components/Topbar";
import Winner from "@components/Winner";
import { TMatches, TMatchResults } from "@utils/types";
import emojiFlags from "emoji-flags";

export default async function Page() {
  const res = await fetch("https://worldcupjson.net/matches", {
    next: { revalidate: 60 },
  });
  const data: TMatches[] = await res.json();

  const matches: TMatchResults[] = data.map((match) => {
    return {
      id: match.id,
      status: match.status,
      date: match.datetime,
      stage: match.stage_name,
      firstTeam: {
        code: match.home_team.country,
        name: match.home_team.name,
        score: match.home_team.goals,
        winner: match.home_team.country === match.winner_code,
      },
      secondTeam: {
        code: match.away_team.country,
        name: match.away_team.name,
        score: match.away_team.goals,
        winner: match.away_team.country === match.winner_code,
      },
    };
  });

  const filteredMatches = matches.reverse();

  return (
    <div>
      <Topbar matches={filteredMatches} />
      <Winner>
        <div className="flex space-x-1">
          <span>{emojiFlags.AR.emoji}</span>
          <span>Argentina</span>
        </div>
      </Winner>
      {filteredMatches.map((match) => (
        <div key={match.id}>
          <RowData match={match} />
        </div>
      ))}
      <Footer />
    </div>
  );
}
