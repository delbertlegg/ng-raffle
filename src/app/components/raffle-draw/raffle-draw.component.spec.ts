import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaffleDrawComponent } from './raffle-draw.component';

describe('RaffleDrawComponent', () => {
  let component: RaffleDrawComponent;
  let fixture: ComponentFixture<RaffleDrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaffleDrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaffleDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
