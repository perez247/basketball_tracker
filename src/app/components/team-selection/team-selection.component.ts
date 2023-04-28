import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { IAppPagination } from 'src/app/shared/models/app-pagination';
import { IAppTeam } from 'src/app/shared/models/app-team';
import { NbaService } from 'src/app/shared/services/nba/nba.service';

@Component({
  selector: 'app-team-selection',
  templateUrl: './team-selection.component.html',
  styleUrls: ['./team-selection.component.scss']
})
export class TeamSelectionComponent extends SharedUtilityComponent implements OnInit {

  @Output() teamSelected = new EventEmitter<IAppTeam>();

  selected?: IAppTeam;
  teams: IAppTeam[] = [];

  constructor(private nbaService: NbaService) {
    super();
  }

  override ngOnInit(): void {
    this.getTeams();
  }

  getTeams(): void {
    this.isLoading = true;
    const sub = this.nbaService.getTeams()
    .pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (data) => {
        this.teams = data.data;
      },
      error: (error) => {
        alert('Failed to get teams, try again later');
        console.log(error);
      }
    });

    this.subscription.push(sub);
  }

  selectTeam(): void {
    this.teamSelected.emit(this.selected);
    this.selected = undefined;
  }

}
