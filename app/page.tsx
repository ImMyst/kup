import emojiFlags from "emoji-flags";
import { TMatches, TMatchResults, TTeams } from "../types/types";
import { uniqMap } from "../utils/getUniqueListBy";
import RowData from "./RowData";
import Tag from "./Tag";

export default async function Page() {
  const res = await fetch("https://worldcupjson.net/matches", {
    next: { revalidate: 60 },
  });
  const data: TMatches[] = await res.json();

  const matches: TMatchResults[] = data.map((match) => {
    return {
      id: match.id,
      status: match.status,
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

  const getTeams = (): TTeams[] => {
    const teams: TTeams[] = matches.map((team) => ({
      name: team.firstTeam.name,
      code: team.firstTeam.code,
      status: team.status,
    }));

    return uniqMap(teams, "code")
      .filter((team: TTeams) => team.status !== "future_unscheduled")
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  return (
    <div>
      <div className="sticky top-0 z-50 bg-white/80 pt-10 backdrop-blur-sm">
        <h1 className="text-3xl font-semibold">⚽️ Kup</h1>
        <div className="mb-2 overflow-hidden">
          <h2 className="text-xl mt-4 mb-2 font-semibold">Planning</h2>
          <p className="mt-2 mb-2 font-semibold text-gray-700">Teams</p>
          <div className="flex space-x-2 overflow-auto touch-auto pb-4 flex-nowrap">
            {getTeams().map((team) => (
              <Tag key={team.code}>
                {emojiFlags.data.find((country) => country.name === team.name)
                  ?.emoji ?? "🏳️"}
                &nbsp;
                {team.code}
              </Tag>
            ))}
          </div>
        </div>
      </div>
      {matches
        .reverse()
        .filter((team) => team.status !== "future_unscheduled")
        .map((match) => (
          <div key={match.id}>
            <RowData match={match} />
          </div>
        ))}
    </div>
  );
}
