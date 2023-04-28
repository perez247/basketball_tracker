import { Pipe, PipeTransform } from '@angular/core';
import { IAppTeamResult } from '../shared/models/team-result';

@Pipe({
  name: 'avgPoints'
})
export class AvgPointsPipe implements PipeTransform {

  transform(value: IAppTeamResult[], ...args: string[]): string {

    if (!value) {
      return 'Incorrect value entered';
    }

    const type = args[0];

    if (type == 'conceded') {
      const conceded = value.reduce((a, b) =>{
        return a + b.visitor_team_score
      }, 0) / value.length;

      return Math.floor(conceded).toString();

    } else {

      const scored = value.reduce((a, b) =>{
        return a + b.home_team_score
      }, 0) / value.length;
      return Math.floor(scored).toString();
    }
  }

}
