import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { RaffleDrawComponent } from './components/raffle-draw/raffle-draw.component';
import { ToastrModule } from 'ngx-toastr';
import { WinnerStore } from './store/winner.store';
import { WinnerQuery } from './store/winner.query';
import { RaffleWinnersComponent } from './components/raffle-winners/raffle-winners.component';

@NgModule({
  declarations: [
    AppComponent,
    RaffleListComponent,
    RaffleDetailComponent,
    RaffleEntryComponent,
    RaffleAddComponent,
    RaffleDrawComponent,
    RaffleWinnersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes, { enableTracing: false })
  ],
  providers: [RaffleService, RaffleResolver, WinnerStore, WinnerQuery],
  bootstrap: [AppComponent]
})
export class AppModule {}
