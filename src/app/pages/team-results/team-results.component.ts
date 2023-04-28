import { finalize } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { IAppTeam } from 'src/app/shared/models/app-team';
import { NbaService } from 'src/app/shared/services/nba/nba.service';
import { IAppTeamResult } from 'src/app/shared/models/team-result';

@Component({
  selector: 'app-team-results',
  templateUrl: './team-results.component.html',
  styleUrls: ['./team-results.component.scss']
})
export class TeamResultsComponent extends SharedUtilityComponent implements OnInit {

  team?: IAppTeam;
  teamResults: IAppTeamResult[] = [];

  constructor(
    private nbaService: NbaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  override ngOnInit(): void {
    const teamId = this.route.snapshot.paramMap.get('teamCode');
    this.getSingleTeam(Number(teamId))
  }

  getSingleTeam(teamId: number): void {
    this.isLoading = true;
    const sub = this.nbaService.getTrackedTeams()
      .pipe(
        finalize(() => this.isLoading = false)
      ).subscribe({
        next: (teams) => {
          this.team = teams.find(x => x.id == teamId);
          if (!this.team) {
            this.router.navigate(['/']);
            alert('Team not found');
            return;
          }
          console.log(this.team);
          this.getTeamResult();
        },
        error: (error) => {
          this.router.navigate(['/']);
          alert('Unkown error occurred');
        }
      });

    this.subscription.push(sub);
  }

  getTeamResult(): void {
    this.isLoadingSecond = true;
    const sub = this.nbaService.getTeamResult(this.team?.id?.toString() ?? '')
    .pipe(
      finalize(() => this.isLoadingSecond = false)
    ).subscribe({
      next: (data) => {
        this.teamResults = data.data;
        console.log(this.teamResults);
      },
      error: (error) => {
        alert('Failed to get teams, try again later');
        console.log(error);
      }
    });

    this.subscription.push(sub);
  }

}
