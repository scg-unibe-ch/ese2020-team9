import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatSelect } from '@angular/material/select';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCategoryComponent } from './search-category.component';
import { InjectionToken } from '@angular/core';

describe('SearchCategoryComponent', () => {
  let component: SearchCategoryComponent;
  let fixture: ComponentFixture<SearchCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatSelectModule, BrowserAnimationsModule ],
      declarations: [ SearchCategoryComponent, MatSelect ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
