import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaffleDetailComponent } from './raffle-detail.component';

describe('RaffleDetailComponent', () => {
  let component: RaffleDetailComponent;
  let fixture: ComponentFixture<RaffleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaffleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaffleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
