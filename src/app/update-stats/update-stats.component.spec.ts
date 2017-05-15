import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStatsComponent } from './update-stats.component';

describe('UpdateStatsComponent', () => {
  let component: UpdateStatsComponent;
  let fixture: ComponentFixture<UpdateStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
