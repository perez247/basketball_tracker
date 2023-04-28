import { IAppTeam } from "./app-team"

export interface IAppTeamResult {
  id: number
  date: string
  home_team: IAppTeam
  home_team_score: number
  period: number
  postseason: boolean
  season: number
  status: string
  time: string
  visitor_team: IAppTeam
  visitor_team_score: number
  state: 'L' | 'W';
}
