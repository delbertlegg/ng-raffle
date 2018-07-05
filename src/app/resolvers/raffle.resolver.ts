import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Raffle } from '../models/raffle.model';
import { RaffleService } from '../services/raffle.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RaffleResolver implements Resolve<Raffle> {
    constructor(private _raffleService: RaffleService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Raffle | Observable<Raffle> | Promise<Raffle> {
        const id = route.paramMap.get('id');
        return this._raffleService.getRaffleById(id);
    }
}
