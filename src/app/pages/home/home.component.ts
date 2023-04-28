import { finalize } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { IAppTeam } from 'src/app/shared/models/app-team';
import { NbaService } from 'src/app/shared/services/nba/nba.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends SharedUtilityComponent implements OnInit {

  selectedTeams: IAppTeam[] = [];

  constructor(private nbaService: NbaService) {
    super();
  }

  override ngOnInit(): void {
    this.getTrackedTeams();
  }

  getTrackedTeams(): void {
    this.isLoading = true;
    const sub = this.nbaService.getTrackedTeams()
      .pipe(
        finalize(() => this.isLoading = false)
      ).subscribe({
        next: (teams) => {
          this.selectedTeams = teams;
        },
        error: (error) => {
          alert('Failed to get tracked teams');
          console.log(error);
        }
      })
  }

  addTeam(newTeam: IAppTeam): void {

    const index = this.getTeamIndex(newTeam);

    if (index > -1) {
      alert(`Already tracking ${newTeam.full_name}`)
      return;
    }

    this.selectedTeams.unshift(newTeam);

    this.saveTeams();
  }

  removeTeam(oldTeam: IAppTeam): void {

    const index = this.getTeamIndex(oldTeam);

    if (index == -1) { return; }

    this.selectedTeams.splice(index, 1);

    this.saveTeams();
  }

  private saveTeams(): void {
    this.nbaService.saveTrackedTeams(this.selectedTeams)
    .subscribe({
      error: (error) => {
        alert('Failed to persist team, kindly try again later');
        console.log(error);
      }
    })
  }

  private getTeamIndex(searchTeam: IAppTeam): number {
    return this.selectedTeams.findIndex((team) => team.id == searchTeam.id);
  }
}
