import { Component, OnInit } from '@angular/core';
import { RaffleService } from '../../services/raffle.service';
import { Winner } from '../../models/winner.model';
import { Observable, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-raffle-draw',
  templateUrl: './raffle-draw.component.html',
  styleUrls: ['./raffle-draw.component.css']
})
export class RaffleDrawComponent implements OnInit {
  entries: Observable<Winner[]>;
  constructor(private raffleService: RaffleService) {}

  ngOnInit() {
    this.raffleService
      .drawWinner()
      .pipe(
        switchMap(winners => {
          return forkJoin(
            winners.map(winner => this.raffleService.addWinner(winner))
          );
        })
      )
      .subscribe(() => {
        this.raffleService.emitWinners();
        this.entries = this.raffleService.getWinners();
      });
  }
}
