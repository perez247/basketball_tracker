import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamResultsComponent } from './pages/team-results/team-results.component';
import { HomeComponent } from './pages/home/home.component';
import { TeamItemComponent } from './components/team-item/team-item.component';
import { TeamSelectionComponent } from './components/team-selection/team-selection.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedUtilityComponent } from './shared/components/shared-utility/shared-utility.component';
import { FormsModule } from '@angular/forms';
import { AvgPointsPipe } from './pipes/avg-points.pipe';
import { GameOutcomeDirective } from './directives/game-outcome.directive';


@NgModule({
  declarations: [
    AppComponent,
    TeamSelectionComponent,
    TeamItemComponent,
    TeamResultsComponent,
    HomeComponent,
    SharedUtilityComponent,
    AvgPointsPipe,
    GameOutcomeDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
