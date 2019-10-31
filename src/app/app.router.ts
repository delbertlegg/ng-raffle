import { Routes } from '@angular/router';
import { RaffleListComponent } from './components/raffle-list/raffle-list.component';
import { RaffleDetailComponent } from './components/raffle-detail/raffle-detail.component';
import { RaffleResolver } from './resolvers/raffle.resolver';
import { RaffleEntryComponent } from './components/raffle-entry/raffle-entry.component';
import { RaffleAddComponent } from './components/raffle-add/raffle-add.component';
import { RaffleDrawComponent } from './components/raffle-draw/raffle-draw.component';
import { RaffleWinnersComponent } from './components/raffle-winners/raffle-winners.component';

export const routes: Routes = [
    {
        path: 'raffles',
        component: RaffleListComponent
    },
    {
        path: 'raffle/:id',
        component: RaffleDetailComponent,
        resolve: { raffle: RaffleResolver }
    },
    {
        path: 'new-raffle',
        component: RaffleAddComponent
    },
    {
        path: 'add-entries',
        component: RaffleEntryComponent
    },
    {
        path: 'draw-all',
        component: RaffleDrawComponent
    },
    {
        path: 'winners',
        component: RaffleWinnersComponent
    },
    {
        path: '',
        redirectTo: 'raffles',
        pathMatch: 'full'
    }
];
