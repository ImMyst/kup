import emojiFlags from "emoji-flags";
import { uniqMap } from "@utils/uniqMap";
import { TMatchResults, TTeams } from "@utils/types";
import Tag from "@components/Tag";

type TProps = {
  matches: TMatchResults[];
};

export default function Topbar({ matches }: TProps) {
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
    <div className="sticky md:pl-0 px-6 top-0 z-50 bg-white/80 pt-10 backdrop-blur-sm">
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
  );
}
