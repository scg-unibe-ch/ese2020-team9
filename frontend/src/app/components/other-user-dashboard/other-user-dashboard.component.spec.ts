import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUserDashboardComponent } from './other-user-dashboard.component';

describe('OtherUserDashboardComponent', () => {
  let component: OtherUserDashboardComponent;
  let fixture: ComponentFixture<OtherUserDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherUserDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherUserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
