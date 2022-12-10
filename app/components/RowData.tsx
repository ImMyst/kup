import cn from "classnames";
import emojiFlags from "emoji-flags";
import { TMatchResults } from "@utils/types";

type TProps = {
  match: TMatchResults;
};

export default function RowData({ match }: TProps) {
  return (
    <div className="flex relative items-center border-b flex-wrap border-gray-200 justify-between px-8 py-2">
      {match.status === "in_progress" && (
        <span className="absolute left-5 top-3 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      )}
      <p
        className={cn("ml-4", {
          "line-through text-gray-600/70":
            !match.firstTeam.winner && match.status === "completed",
          "font-bold": match.firstTeam.winner && match.status === "completed",
        })}
      >
        {emojiFlags.data.find(
          (country) => country.name === match.firstTeam.name
        )?.emoji ?? "🏳️"}
        &nbsp;
        {match.firstTeam.code}
      </p>
      <div className="flex flex-col space-y-1 items-center text-center mx-auto">
        <p className="text-gray-700">
          <span
            className={cn("text-gray-700", {
              "font-bold text-black":
                match.firstTeam.winner && match.status === "completed",
            })}
          >
            {match.firstTeam.score}
          </span>
          &nbsp; - &nbsp;
          <span
            className={cn("text-gray-700", {
              "font-bold text-black":
                match.secondTeam.winner && match.status === "completed",
            })}
          >
            {match.secondTeam.score}
          </span>
        </p>
        {match.status !== "completed" && match.status !== "in_progress" && (
          <p className="flex items-center text-xs text-gray-500">
            {new Date(match.date).toLocaleString().replace(", ", " ")}
          </p>
        )}
      </div>
      <p
        className={cn("mr-4", {
          "line-through text-gray-600/70":
            !match.secondTeam.winner && match.status === "completed",
          "font-bold": match.secondTeam.winner && match.status === "completed",
        })}
      >
        {match.secondTeam.code}
        &nbsp;
        {emojiFlags.data.find(
          (country) => country.name === match.secondTeam.name
        )?.emoji ?? "🏳️"}
      </p>
    </div>
  );
}
