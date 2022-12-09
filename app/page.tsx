import emojiFlags from "emoji-flags";
import { getUniqueListBy } from "../utils/getUniqueListBy";
import RowData from "./RowData";
import Tag from "./Tag";

type TStatus = "in_progress" | "futur_scheduled" | "completed";
type TTeam = {
  code: string;
  name: string;
  score: number;
  winner: boolean;
};

export type TResults = {
  id: number;
  status: TStatus;
  firstTeam: TTeam;
  secondTeam: TTeam;
};

export default async function Page() {
  const res = await fetch("https://worldcupjson.net/matches", {
    next: { revalidate: 60 },
  });
  const data = await res.json();

  const matches: TResults[] = data.map(
    (match: {
      id: number;
      status: TStatus;
      home_team: { name: string; goals: number; country: string };
      winner_code: string;
      away_team: { name: string; goals: number; country: string };
    }) => {
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
    }
  );

  const getTeams = () => {
    const teams = matches.map((team) => ({
      name: team.firstTeam.name,
      code: team.firstTeam.code,
    }));

    return [
      ...getUniqueListBy(teams, "code").filter(
        (team) => team.name !== "To Be Determined"
      ),
    ];
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
        .filter((team) => team.firstTeam.name !== "To Be Determined")
        .map((match) => (
          <div key={match.id}>
            <RowData match={match} />
          </div>
        ))}
    </div>
  );
}
