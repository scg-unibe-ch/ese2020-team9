import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  const spyRouter = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatSelectModule, BrowserAnimationsModule ],
      declarations: [ SearchBarComponent, MatSelect ],
      providers: [ {provide: Router, useValue: spyRouter} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
