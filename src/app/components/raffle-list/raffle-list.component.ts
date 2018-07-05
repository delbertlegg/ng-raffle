import { Component, OnInit } from '@angular/core';
import { RaffleService } from '../../services/raffle.service';
import { Raffle } from '../../models/raffle.model';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-raffle-list',
  templateUrl: './raffle-list.component.html',
  styleUrls: ['./raffle-list.component.css']
})
export class RaffleListComponent implements OnInit {
  raffles: Raffle[];
  constructor(private _raffleService: RaffleService, private _router: Router) { }

  ngOnInit() {
    this._raffleService.getRaffles().subscribe(raffles => this.raffles = raffles);
  }

  addNewRaffle(raffleName: any) {
    this._raffleService.addRaffle({ name: raffleName.value }).subscribe();
    this._raffleService.getRaffles().subscribe(raffles => this.raffles = raffles);
    raffleName.value = '';
  }

  onRaffleClick(raffleId: number) {
    this._router.navigateByUrl(`/raffle/${raffleId}`);
  }
}
