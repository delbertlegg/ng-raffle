import { Component, OnInit } from '@angular/core';
import { RaffleService } from './services/raffle.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'OLF Raffle';
  hasWinners: Observable<boolean>;
  constructor(private raffleService: RaffleService) {}

  ngOnInit() {
    this.hasWinners = this.raffleService.hasWinners();
  }
}
