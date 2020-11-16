import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoughtproductsComponent } from './boughtproducts.component';

describe('BoughtproductsComponent', () => {
  let component: BoughtproductsComponent;
  let fixture: ComponentFixture<BoughtproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoughtproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoughtproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
