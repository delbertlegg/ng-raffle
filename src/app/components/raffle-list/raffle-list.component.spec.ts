import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaffleListComponent } from './raffle-list.component';

describe('RaffleListComponent', () => {
  let component: RaffleListComponent;
  let fixture: ComponentFixture<RaffleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RaffleListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaffleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the list of raffles', () => { });

  it('should navigate to raffle details on click', () => { });

  it('should add new raffle', () => { });
});
