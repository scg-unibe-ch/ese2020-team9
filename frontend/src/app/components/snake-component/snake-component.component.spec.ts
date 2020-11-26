import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeComponentComponent } from './snake-component.component';

describe('SnakeComponentComponent', () => {
  let component: SnakeComponentComponent;
  let fixture: ComponentFixture<SnakeComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnakeComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnakeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
