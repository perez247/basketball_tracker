import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameOutcomeDirective } from '../directives/game-outcome.directive';
import { AvgPointsPipe } from '../pipes/avg-points.pipe';
import { SharedUtilityComponent } from './components/shared-utility/shared-utility.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    SharedUtilityComponent,
    AvgPointsPipe,
    GameOutcomeDirective,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    SharedUtilityComponent,
    AvgPointsPipe,
    GameOutcomeDirective,

    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class SharedModule { }
