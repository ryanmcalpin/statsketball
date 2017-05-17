import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsGroupComponent } from './stats-group.component';

describe('StatsGroupComponent', () => {
  let component: StatsGroupComponent;
  let fixture: ComponentFixture<StatsGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
