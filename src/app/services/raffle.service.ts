import { Injectable } from '@angular/core';
import { Raffle } from '../models/raffle.model';
import { Observable, of, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { Person, Entry } from '../models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { createWinner, Winner } from '../models/winner.model';

@Injectable()
export class RaffleService {
  raffleUrl = '/api/v1/raffles';
  personUrl = '/api/v1/people';
  entryUrl = '/api/v1/entries';
  winnerUrl = '/api/v1/winners';
  winnerSub = new Subject<boolean>();

  constructor(private _httpClient: HttpClient) {}

  getRaffles(): Observable<Raffle[]> {
    return this._httpClient.get<any>(this.raffleUrl).pipe(map(
      res => res.body
    ));
    }

  getRaffleById(id: string): Observable<Raffle> {
    return this._httpClient.get<any>(this.raffleUrl, { params: new HttpParams().set('id', id) }).pipe(map(res => res.body[0]));
  }

  addRaffle(raffle: Raffle) {
    return this._httpClient.post<any>(this.raffleUrl, raffle).pipe(map(res => res.body));
    }

  addPerson(person: Person): Observable<Person> {
    const personObs = this.findPerson(person).pipe(
      map(existingPerson => {
        if (existingPerson !== null) {
          return personObs;
        } else {
          return this.createPerson(person);
        }
      })
    );
    return personObs;
  }

  findPerson(person: Person): Observable<Person> {
    return this._httpClient
      .get<any>(this.personUrl, {
        params: {
          emailAddress: person.emailAddress,
          phoneNumber: person.phoneNumber
        }
      }).pipe(map(res => res.body));
  }

  createPerson(person: Person): Observable<Person> {
    return this._httpClient
      .post<any>(this.personUrl, {
        firstName: person.firstName,
        lastName: person.lastName,
        emailAddress: person.emailAddress,
        phoneNumber: person.phoneNumber
      }).pipe(map(res => res.body));
  }

  createEntry(entry: any) {
    return this._httpClient.post<any>(this.entryUrl, entry).pipe(map(res => res.body));
  }

  getEntryCounts(raffleId: string) {
    return this._httpClient
      .get<any>(`${this.entryUrl}/counts`, {
        params: {
          raffleId: raffleId
        }
      }).pipe(map(res => res.body));
  }

  drawWinner(raffleId?: string): Observable<Winner[]> {
    const drawUrl = this.raffleUrl + '/draw';
    const params = raffleId ? { raffleId } : null;
    return this._httpClient.get<any>(drawUrl, { params }).pipe(
      map(res => res.body),
      map(res => {
        return Object.keys(res).map(key => {
          return createWinner({
            id: +key,
            ticketNumber: res[key].ticketNumber,
            raffleName: res[key].raffleName,
            winner: res[key].winner,
            prizeClaimed: false
          });
        });
      })
    );
  }

  getWinners(): Observable<Winner[]> {
    return this._httpClient.get<any>(this.winnerUrl).pipe(map(res => res.body));
  }

  getWinnerById(id: string): Observable<Winner> {
    return this._httpClient
      .get<any>(this.winnerUrl, { params: new HttpParams().set('id', id) }).pipe(map(res => res.body[0]));
  }

  addWinner(winner: Winner): Observable<Winner> {
    return this.getWinnerById(winner.id.toString()).pipe(
      switchMap(w => {
        if (w) {
          return this.updateWinner(winner);
        } else {
          return this._httpClient
            .post<any>(this.winnerUrl, winner);
        }
      })
    );
  }

  updateWinner(winner: Winner) {
    return this.getWinnerById(winner.id.toString()).pipe(
      switchMap(w => {
        if (w.prizeClaimed) {
          return of(winner);
        } else {
          return this._httpClient
            .put<any>(`${this.winnerUrl}/${winner.id}`, winner).pipe(map(res => res.body));
        }
      })
    );
  }

  emitWinners() {
    this.winnerSub.next(true);
  }

  hasWinners() {
    return this.winnerSub;
  }
}
