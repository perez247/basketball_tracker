import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { IAppTeam } from 'src/app/shared/models/app-team';
import { IAppTeamResult } from 'src/app/shared/models/team-result';
import { NbaService } from 'src/app/shared/services/nba/nba.service';

@Component({
  selector: 'app-team-item',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.scss']
})
export class TeamItemComponent extends SharedUtilityComponent implements OnInit {

  @Input() team? : IAppTeam;
  @Output() remove = new EventEmitter<IAppTeam>();

  teamResults: IAppTeamResult[] = [];

  constructor(private nbaService: NbaService) {
    super();
  }

  override ngOnInit(): void {
    this.getPastResults();
  }

  removeItem(): void {
    this.remove.emit(this.team);
  }

  getPastResults(): void {
    this.isLoading = true;
    const sub = this.nbaService.getTeamResult(this.team?.id?.toString() ?? '')
    .pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (data) => {
        this.teamResults = data.data;
        this.setState();
      },
      error: (error) => {
        alert('Failed to get teams, try again later');
        console.log(error);
      }
    });

    this.subscription.push(sub);
  }

  private setState(): void {
    this.teamResults.forEach(x => {
      let mainTeamScore = x.home_team.id == this.team?.id ? x.home_team_score : x.visitor_team_score;
      let oppositeTeamScore = x.home_team.id != this.team?.id ? x.home_team_score : x.visitor_team_score;

      x.state = mainTeamScore <= oppositeTeamScore ? 'L' : 'W';
    });
  }
}
