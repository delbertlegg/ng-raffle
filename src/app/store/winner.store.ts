import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Winner } from '../models/winner.model';
import { Injectable } from '@angular/core';

export interface WinnerState extends EntityState<Winner> { }

@Injectable()
@StoreConfig({ name: 'winnerStore' })
export class WinnerStore extends EntityStore<WinnerState, Winner> {
    constructor() {
        super();
    }
}
