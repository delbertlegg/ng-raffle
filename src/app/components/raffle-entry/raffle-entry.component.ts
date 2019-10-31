import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { RaffleService } from '../../services/raffle.service';
import { Person, Raffle } from '../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, mergeMap, map } from 'rxjs/operators';

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
    private _toasterService: ToastrService) { }

  ngOnInit() {

    this.form = this._formBuilder.group({
      entries: new FormArray([]),
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      emailAddress: new FormControl('', [Validators.email, Validators.maxLength(50)]),
      phoneNumber: new FormControl('', [Validators.pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)]),
    });
    this._raffleService.getRaffles().subscribe(res => {
      this.raffles = res;
    });
    this.addEntry();
    this.setRaffle();
  }

  addEntry() {
    const entry = this.getEntryGroup();
    (this.form.controls.entries as FormArray).push(entry);
  }



  removeEntry(index: number) {
    (this.form.controls.entries as FormArray).removeAt(index);
    if ((this.form.controls.entries as FormArray).length === 0) {
      this.addEntry();
    }
  }

  private getEntryGroup() {
    return this._formBuilder.group({
      raffleId: new FormControl(''),
      numberOfTickets: new FormControl('', [Validators.required, Validators.min(1)])
    });
  }

  setRaffle() {
    const entries: FormArray = (this.form.controls.entries as FormArray);
    const entryGroup = (entries.controls[0] as FormGroup);
    this._route.queryParams.subscribe(params => entryGroup.controls.raffleId.setValue(params['raffleId'] || ''));
  }

  submitEntry() {
    const entryModel = this.form.value;
    const person: Person = {
      firstName: entryModel.firstName,
      lastName: entryModel.lastName,
      emailAddress: entryModel.emailAddress,
      phoneNumber: entryModel.phoneNumber
    };
    entryModel.entries.forEach(entry => {
      this._raffleService.createPerson(person)
        .subscribe(createdPerson =>
          this._raffleService.createEntry(
            {
              raffleId: +entry.raffleId,
              personId: createdPerson.id,
              ticketCount: entry.numberOfTickets
            })
            .subscribe(e => this.showEntryMessages(+e.successCount, +e.errorCount, entryModel)));
    });
    this._router.navigateByUrl('/raffles');
  }

  private showEntryMessages(successCount: number, errorCount: number, entryModel: any) {
    if (successCount > 0) {
      this._toasterService.success(`${successCount} created for ${entryModel.firstName} ${entryModel.lastName}`, 'Entries Created!');
    }
    if (errorCount > 0) {
      this._toasterService.error(`${errorCount} entries failed to create`, 'Error Creating Entries');
    }
  }
}
