import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamResultsComponent } from './pages/team-results/team-results.component';
import { HomeComponent } from './pages/home/home.component';
import { TeamItemComponent } from './components/team-item/team-item.component';
import { TeamSelectionComponent } from './components/team-selection/team-selection.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    TeamSelectionComponent,
    TeamItemComponent,
    TeamResultsComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
