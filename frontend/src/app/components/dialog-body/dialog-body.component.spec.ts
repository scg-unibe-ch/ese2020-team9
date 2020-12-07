import { MatDialogModule, MatDialogRef  } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogBodyComponent } from './dialog-body.component';
import { Overlay } from '@angular/cdk/overlay';
import { BrowserModule } from '@angular/platform-browser';

describe('DialogBodyComponent', () => {
  let component: DialogBodyComponent;
  let fixture: ComponentFixture<DialogBodyComponent>;

  const spyDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserModule, MatDialogModule],
      declarations: [ DialogBodyComponent ],
      providers: [ MatSnackBar, Overlay, {provide: MatDialogRef, useValue: spyDialogRef} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
