import { AfterViewInit, Directive, ElementRef, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { IAppTeam } from '../shared/models/app-team';
import { IAppTeamResult } from '../shared/models/team-result';

@Directive({
  selector: '[appGameOutcome]'
})
export class GameOutcomeDirective implements AfterViewInit {

  @Input() team?: IAppTeam;
  @Input() teamResult?: IAppTeamResult

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    this.setOutcome();
  }

  setOutcome(): void {
    let mainTeamScore = this.teamResult?.home_team.id == this.team?.id ? this.teamResult?.home_team_score : this.teamResult?.visitor_team_score;
    let oppositeTeamScore = this.teamResult?.home_team.id != this.team?.id ? this.teamResult?.home_team_score : this.teamResult?.visitor_team_score;

    if ((mainTeamScore ?? 0) <= (oppositeTeamScore ?? 0)) {
      this.renderer.setProperty(this.element.nativeElement, 'innerText', 'L');
      this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', '#FF0000')
    } else {
      this.renderer.setProperty(this.element.nativeElement, 'innerText', 'W');
      this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', '#308732')
    }

  }
}
