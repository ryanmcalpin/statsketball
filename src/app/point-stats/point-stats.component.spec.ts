import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointStatsComponent } from './point-stats.component';

describe('PointStatsComponent', () => {
  let component: PointStatsComponent;
  let fixture: ComponentFixture<PointStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
