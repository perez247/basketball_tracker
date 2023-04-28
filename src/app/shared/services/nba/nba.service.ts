import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAppPagination } from '../../models/app-pagination';
import { IAppTeam } from '../../models/app-team';
import { IAppTeamResult } from '../../models/team-result';

@Injectable({
  providedIn: 'root'
})
export class NbaService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getTeams(): Observable<IAppPagination<IAppTeam[]>> {
    const headers = this.getNbaHeader();
    return this.http.get<IAppPagination<IAppTeam[]>>(`${this.apiUrl}/teams`, {headers});
  }

  getTeamResult(team_ids: string): Observable<IAppPagination<IAppTeamResult[]>> {
    const headers = this.getNbaHeader();
    const params = this.getNbaParams(team_ids);
    return this.http.get<IAppPagination<IAppTeamResult[]>>(`${this.apiUrl}/games`, {headers, params});
  }

  getTrackedTeams(): Observable<IAppTeam[]> {
    const teamAsString = localStorage.getItem('teams');
    const teamAsObj = teamAsString ? JSON.parse(teamAsString) as IAppTeam[] : [];
    return of(teamAsObj)
  }

  saveTrackedTeams(teams: IAppTeam[]): Observable<void> {
    localStorage.setItem('teams', JSON.stringify(teams));
    return of()
  }

  private getNbaHeader(): HttpHeaders {
    const headers = new HttpHeaders()
                    .set('X-RapidAPI-Host', environment['X-RapidAPI-Host'])
                    .set('X-RapidAPI-Key', environment['X-RapidAPI-Key']);

    return headers;
  }

  private getNbaParams(team_ids: string): HttpParams {

    let params = new HttpParams();
    let daysToSubtract = 1;
    Array(12).fill('').forEach(x => {
      const date = new Date();
      date.setDate(date.getDate() - daysToSubtract);
      daysToSubtract++;
      let getYear = date.toLocaleString("default", { year: "numeric" });
      let getMonth = date.toLocaleString("default", { month: "2-digit" });
      let getDay = date.toLocaleString("default", { day: "2-digit" });
      params = params.append('date[]', `${getYear}-${getMonth}-${getDay}`);
    });

    params = params.set('team_ids[]', team_ids)
    params = params.set('per_page', 12)
    params = params.set('page', 0);

    return params;
  }
}
