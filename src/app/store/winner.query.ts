import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { WinnerStore, WinnerState } from './winner.store';
import { Winner } from '../models/winner.model';

@Injectable()
export class WinnerQuery extends QueryEntity<WinnerState, Winner> {
    constructor(protected store: WinnerStore) {
        super(store);
    }
}
