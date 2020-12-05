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

  it('should display countdown when play()', () => {
    expect(component.playing).toEqual(false);
    component.play();
    expect(component.playing).toEqual(false);
    expect(component.message).toEqual('3');
  });

  it('should start the game after 3.6s', () => {
    component.play();
    setTimeout(() => {
      expect(component.playing).toEqual(true);
      expect(component.message).toEqual('START');
    }, 3600);
  });

  it('should not initialize new game when not dead', () => {
    component.dead = false;
    const snake = component.snake;
    component.run();
    expect(component.snake == snake).toEqual(true);
  });

  it('should initialize new game when dead', () => {
    component.dead = true;
    const snake = component.snake;
    component.run();
    expect(component.snake == snake).toEqual(false);
  });

  it('should return true when valid userHighscore and call isValidUserHighscore', () => {
    component.userHighscore = 7;
    expect(component.isValidUserHighscore()).toEqual(true);
  });

  it('should return false when userHighscore null and call isValidUserHighscore', () => {
    component.userHighscore = null;
    expect(component.isValidUserHighscore()).toEqual(false);
  });

  it('should return false when userHighscore NaN and call isValidUserHighscore', () => {
    component.userHighscore = Number.NaN;
    expect(component.isValidUserHighscore()).toEqual(false);
  });

  it('should route to home, when calling quit', () => {
    component.quit();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should not save highscore, when user is not logged in', () => {
    component.userLoggedIn = false;
    component.saveHighscore();
    expect(component.message).toEqual('Not logged in, cannot save the highscore...');
  });

  it('should not save highscore, when highscore made lower than highscore saved', () => {
    component.userLoggedIn = true;
    component.userHighscore = 7;
    component.sessionHighscore = 3;
    component.saveHighscore();
    expect(component.message).toEqual('You cannot save a lower score...');
  });

  it('should save highscore, when highscore made higher than highscore saved and logged in', () => {
    component.userLoggedIn = true;
    component.userHighscore = 3;
    component.sessionHighscore = 7;
    component.saveHighscore();
    setTimeout(() => {
      expect(component.message).toEqual('Successfully saved new highscore!');
    }, 500);
  });

});
