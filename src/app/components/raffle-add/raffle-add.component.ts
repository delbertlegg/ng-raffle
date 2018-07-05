import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RaffleService } from '../../services/raffle.service';
import { Raffle } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-raffle-add',
  templateUrl: './raffle-add.component.html',
  styleUrls: ['./raffle-add.component.css']
})
export class RaffleAddComponent implements OnInit {
  form: FormGroup;
  constructor(private _formBuilder: FormBuilder, private _raffleService: RaffleService, private _router: Router) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      description: new FormControl('', [Validators.maxLength(200)])
    });
  }

  createRaffle() {
    const raffleModel = this.form.value;
    const raffle: Raffle = {
      name: raffleModel.name,
      prizeDescription: raffleModel.description
    };

    this._raffleService.addRaffle(raffle).subscribe(() => this._router.navigateByUrl('/raffles'));
  }

}
