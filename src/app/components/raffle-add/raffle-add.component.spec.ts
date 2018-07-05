import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaffleAddComponent } from './raffle-add.component';

describe('RaffleAddComponent', () => {
  let component: RaffleAddComponent;
  let fixture: ComponentFixture<RaffleAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaffleAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaffleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
