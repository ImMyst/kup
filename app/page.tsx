import Image from "next/image";
import RowData from "./RowData";
import cn from "classnames";

export type TResults = {
  id: string;
  status: "in_progress" | "futur_scheduled" | "completed";
  firstTeam: {
    code: string;
    name: string;
    flag: string;
    score: number;
    winner: boolean;
  };
  secondTeam: {
    code: string;
    name: string;
    flag: string;
    score: number;
    winner: boolean;
  };
};

export default async function Page() {
  const res = await fetch("https://worldcupjson.net/matches");
  const data = await res.json();

  const matches: TResults[] = data.map(
    (match: {
      id: any;
      status: any;
      home_team: { name: any; goals: any; country: any };
      winner_code: any;
      away_team: { name: any; goals: any; country: any };
    }) => {
      return {
        id: match.id,
        status: match.status,
        firstTeam: {
          code: match.home_team.country,
          name: match.home_team.name,
          flag: "",
          score: match.home_team.goals,
          winner: match.home_team.country === match.winner_code,
        },
        secondTeam: {
          code: match.away_team.country,
          name: match.away_team.name,
          flag: "",
          score: match.away_team.goals,
          winner: match.away_team.country === match.winner_code,
        },
      };
    }
  );

  return (
    <div>
      <h1 className="text-3xl font-semibold">⚽️ Kup</h1>
      <h2 className="text-xl mt-4 font-semibold">Planning</h2>

      {matches
        .reverse()
        .filter((e) => e.firstTeam.name !== "To Be Determined")
        .map((match) => (
          <div key={match.id}>
            <RowData match={match} />
          </div>
        ))}
    </div>
  );
}
