import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Winner, fromWinner } from '../../models/winner.model';
import { RaffleService } from '../../services/raffle.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-raffle-winners',
  templateUrl: './raffle-winners.component.html',
  styleUrls: ['./raffle-winners.component.css']
})
export class RaffleWinnersComponent implements OnInit {
  entries: Observable<Winner[]>;
  constructor(private raffleService: RaffleService) {}

  ngOnInit() {
    this.entries = this.raffleService.getWinners();
  }

  claimPrize(entry: Winner) {
    const updateWinner = fromWinner(entry);
    updateWinner.prizeClaimed = true;
    this.entries = this.raffleService
      .updateWinner(updateWinner)
      .pipe(switchMap(() => this.raffleService.getWinners()));
  }
}
