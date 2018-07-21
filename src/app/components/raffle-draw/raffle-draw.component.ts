import { Component, OnInit } from '@angular/core';
import { RaffleService } from '../../services/raffle.service';

@Component({
  selector: 'app-raffle-draw',
  templateUrl: './raffle-draw.component.html',
  styleUrls: ['./raffle-draw.component.css']
})
export class RaffleDrawComponent implements OnInit {
  entries = [];
  loading = true;
  constructor(private _raffleService: RaffleService) { }

  ngOnInit() {
    this._raffleService.drawWinners().subscribe((res: Map<number, any>) => {
      const entries = Object.entries(res);
      entries.forEach(entry => {
        setTimeout(() => {
          this.entries.push({
            raffleName: entry[0],
            ticketNumber: entry[1].ticketNumber,
            winner: entry[1].winner
          });
          if (this.entries.length === entries.length) {
            this.loading = false;
          }
        }, 1000);
      });
      const raffleNames = Object.keys(entries);
      const winners = Object.values(entries);
    });
  }

}
