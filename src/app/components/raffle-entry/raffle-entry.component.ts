import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RaffleService } from '../../services/raffle.service';
import { Person, Raffle } from '../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ToasterService } from 'angular5-toaster';

@Component({
  selector: 'app-raffle-entry',
  templateUrl: './raffle-entry.component.html',
})
export class RaffleEntryComponent implements OnInit {
  form: FormGroup;
  raffles: Raffle[];
  constructor(private _formBuilder: FormBuilder,
    private _raffleService: RaffleService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _toasterService: ToasterService) { }

  ngOnInit() {

    this.form = this._formBuilder.group({
      raffleId: new FormControl(''),
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      emailAddress: new FormControl('', [Validators.email, Validators.maxLength(50)]),
      phoneNumber: new FormControl('', [Validators.pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)]),
      numberOfTickets: new FormControl('', [Validators.required, Validators.min(1)])
    });
    this._raffleService.getRaffles().subscribe(res => {
      this.raffles = res;
    });
    this._route.queryParams.subscribe(params => this.form.controls.raffleId.setValue(params['raffleId'] || ''));
  }

  submitEntry() {
    const entryModel = this.form.value;
    const person: Person = {
      firstName: entryModel.firstName,
      lastName: entryModel.lastName,
      emailAddress: entryModel.emailAddress,
      phoneNumber: entryModel.phoneNumber
    };
    this._raffleService.createPerson(person).subscribe(res => {
      for (let i = 0; i < entryModel.numberOfTickets; i++) {
        this._raffleService.createEntry({ raffleId: +entryModel.raffleId, personId: res.id })
          .subscribe();
      }
    });
    this._toasterService.pop('success', 'Entries Created!',
      `${entryModel.numberOfTickets} created for ${entryModel.firstName} ${entryModel.lastName}`);
    this._router.navigateByUrl('/raffles');
  }
}
