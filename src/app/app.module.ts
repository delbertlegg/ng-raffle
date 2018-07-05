import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { routes } from './app.router';
import { RaffleListComponent } from './components/raffle-list/raffle-list.component';
import { RaffleService } from './services/raffle.service';
import { RaffleDetailComponent } from './components/raffle-detail/raffle-detail.component';
import { RaffleResolver } from './resolvers/raffle.resolver';
import { RaffleEntryComponent } from './components/raffle-entry/raffle-entry.component';
import { RaffleAddComponent } from './components/raffle-add/raffle-add.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    RaffleListComponent,
    RaffleDetailComponent,
    RaffleEntryComponent,
    RaffleAddComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { enableTracing: false }),

  ],
  providers: [RaffleService, RaffleResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
