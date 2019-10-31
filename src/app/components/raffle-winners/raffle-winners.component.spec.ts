import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaffleWinnersComponent } from './raffle-winners.component';

describe('RaffleWinnersComponent', () => {
  let component: RaffleWinnersComponent;
  let fixture: ComponentFixture<RaffleWinnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaffleWinnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaffleWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
