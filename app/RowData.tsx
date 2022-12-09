import type { TResults } from "./page";
import cn from "classnames";

type TProps = {
  match: TResults;
};

export default function RowData({ match }: TProps) {
  return (
    <div className="flex relative border-b flex-wrap border-gray-200 justify-between px-8 py-2">
      {match.status === "in_progress" && (
        <span className="absolute left-3 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      )}
      <p
        className={cn("ml-4", {
          "line-through text-gray-600":
            !match.firstTeam.winner && match.status === "completed",
          "font-bold": match.firstTeam.winner && match.status === "completed",
        })}
      >
        {match.firstTeam.code}
      </p>
      <div className="text-center">
        <p className="text-gray-700">
          <span
            className={cn("text-gray-700", {
              "font-bold text-black":
                match.firstTeam.winner && match.status === "completed",
            })}
          >
            {match.firstTeam.score}
          </span>
          -
          <span
            className={cn("text-gray-700", {
              "font-bold text-black":
                match.secondTeam.winner && match.status === "completed",
            })}
          >
            {match.secondTeam.score}
          </span>
        </p>
      </div>
      <p
        className={cn("mr-4", {
          "line-through text-gray-600":
            !match.secondTeam.winner && match.status === "completed",
          "font-bold": match.secondTeam.winner && match.status === "completed",
        })}
      >
        {match.secondTeam.code}
      </p>
    </div>
  );
}
