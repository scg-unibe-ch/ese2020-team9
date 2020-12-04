import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './../../services/user.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeComponentComponent } from './snake-component.component';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

describe('SnakeComponentComponent', () => {
  let component: SnakeComponentComponent;
  let fixture: ComponentFixture<SnakeComponentComponent>;

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  const mockUserService = {
    getUserHighscore(): number {
      return 7;
    },
    isUserLoggedIn(): Observable<boolean> {
      return of(true);
    },
    getOverallHighscoreTopList(): Observable<any> {
      return of([{
        userName: 'Bobby',
        overallScore: '208'
      },
      {
        userName: 'Billy',
        overallScore: '180'
      }]);
    },
    getGameHighscoreTopList(): Observable<any> {
      return of([{
        userName: 'Billy',
        overallScore: '34'
      },
      {
        userName: 'Bobby',
        overallScore: '12'
      }]);
    },
    saveHighscore(): Observable<any> {
      return of(true);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ SnakeComponentComponent ],
      providers: [ {provide: Router, useValue: routerSpy}, UserService, HttpTestingController]
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

  it('should render welcome message in console', () => {
    const nat = fixture.nativeElement;
    const console = nat.querySelector('div');
    expect(console.textContent).toMatch('Welcome to Snake!');
  });

  it('should toggle instructions successfully', () => {
    expect(component.instructions).toEqual(false);
    component.toggleInstructions();
    expect(component.instructions).toEqual(true);
  });

});
