import { Injectable } from '@angular/core';
import { Raffle } from '../models/raffle.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { Person, Entry } from '../models';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';

@Injectable()
export class RaffleService {
  raffleUrl = '/api/v1/raffles';
  personUrl = '/api/v1/people';
  entryUrl = '/api/v1/entries';

  constructor(private _httpClient: HttpClient) {
  }

  getRaffles(): Observable<Raffle[]> {
    return this._httpClient.get<any>(this.raffleUrl).pipe(map(
      res => res.body
    ));
  }

  getRaffleById(id: string): Observable<Raffle> {
    return this._httpClient.get<any>(this.raffleUrl, { params: new HttpParams().set('id', id) }).pipe(map(res => res.body));
  }

  addRaffle(raffle: Raffle) {
    return this._httpClient.post<any>(this.raffleUrl, raffle).pipe(map(res => res.body));
  }

  addPerson(person: Person): Observable<Person> {
    const personObs = this.findPerson(person).pipe(map(existingPerson => {
      if (existingPerson !== null) {
        return personObs;
      } else {
        return this.createPerson(person);
      }
    }));
    return personObs;
  }

  findPerson(person: Person): Observable<Person> {
    return this._httpClient.get<any>(this.personUrl, {
      params: {
        emailAddress: person.emailAddress,
        phoneNumber: person.phoneNumber
      }
    }).pipe(map(res => res.body));
  }

  createPerson(person: Person): Observable<Person> {
    return this._httpClient.post<any>(this.personUrl, {
      firstName: person.firstName,
      lastName: person.lastName,
      emailAddress: person.emailAddress,
      phoneNumber: person.phoneNumber
    }).pipe(map(res => res.body));
  }

  createEntry(entry: Entry) {
    return this._httpClient.post<any>(this.entryUrl, entry).pipe(map(res => res.body));
  }

  getEntryCounts(raffleId: string) {
    return this._httpClient.get<any>(`${this.entryUrl}/counts`, {
      params: {
        raffleId: raffleId
      }
    }).pipe(map(res => res.body));
  }

  drawWinners() {
    return this._httpClient.get<any>(this.raffleUrl + '/draw').pipe(map(res => res.body));
  }

}
