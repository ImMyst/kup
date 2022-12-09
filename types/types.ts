export type TMatches = {
  id: number;
  venue: string;
  location: string;
  status: TStatus;
  attendance: string;
  stage_name: string;
  home_team_country: string;
  away_team_country: string;
  datetime: string;
  winner: string;
  winner_code: string;
  home_team: THomeTeam;
  away_team: TAwayTeam;
  last_checked_at: string;
  last_changed_at: string;
};

export type THomeTeam = {
  country: string;
  name: string;
  goals: number;
  penalties: number;
};

export type TAwayTeam = {
  country: string;
  name: string;
  goals: number;
  penalties: number;
};

export type TStatus =
  | "in_progress"
  | "futur_scheduled"
  | "future_unscheduled"
  | "completed";

export type TTeam = {
  code: string;
  name: string;
  score: number;
  winner: boolean;
};

export type TMatchResults = {
  id: number;
  status: TStatus;
  firstTeam: TTeam;
  secondTeam: TTeam;
};

export type TTeams = {
  name: string;
  code: string;
  status: TStatus;
};
