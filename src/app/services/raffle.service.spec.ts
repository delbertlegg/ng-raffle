import { TestBed, inject } from '@angular/core/testing';

import { RaffleService } from './raffle.service';

describe('RaffleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RaffleService]
    });
  });

  it('should be created', inject([RaffleService], (service: RaffleService) => {
    expect(service).toBeTruthy();
  }));
});
