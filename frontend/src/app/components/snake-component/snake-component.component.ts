import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Board } from './objects/board';
import { Component, OnInit, HostListener, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Snake } from './objects/snake';
import { Direction } from './objects/direction';
import { Position } from './objects/position';

const KeyCodes = {
  KeyA: Direction.LEFT,
  KeyW: Direction.UP,
  KeyD: Direction.RIGHT,
  KeyS: Direction.DOWN
};

@Component({
  selector: 'app-snake-component',
  templateUrl: './snake-component.component.html',
  styleUrls: ['./snake-component.component.css']
})
export class SnakeComponentComponent implements OnInit {

  readonly size = 26;
  readonly cellWidth = 20; // in px
  readonly timestep = 100;
  readonly ngStyleCells = {
    width: `${this.size * this.cellWidth}px`
  };
  readonly direnum = Direction;

  dead = false;
  score = 0;
  lastScore = 0;
  sessionHighscore = 0;
  userHighscore: number;
  userLoggedIn: boolean;
  playing = false;
  instructions = false;

  message: string;

  board: Board = new Board(this.size);
  positions: Position[] = this.initializePositions();
  snake: Snake = new Snake();

  topThreeOverall: any[] = [];
  topTenGame: any[] = [];

  public constructor(private userService: UserService, private router: Router) {
    this.message = 'Welcome to Snake!';
    this.userHighscore = this.userService.getUserHighscore();
  }

  public ngOnInit(): void {
    this.board.newGame();
    this.getOverallScoreList();
    this.getSnakeHighscoreList();
    this.userService.isUserLoggedIn.subscribe(val => {
      this.userLoggedIn = val;
    });
  }

  public play(): void {
    this.message = 'Enjoy playing!';
    setTimeout(() => {
      this.message = 'Snake begins in 3';
      setTimeout(() => {
        this.message = 'Snake begins in 2';
        setTimeout(() => {
          this.message = 'Snake begins in 1';
          setTimeout(() => {
            this.message = 'START';
            setTimeout(() => {
              this.playing = true;
              this.run();
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }

  public getOverallScoreList(): void {
    this.userService.getOverallHighscoreTopList().subscribe((userList: any) => {
      this.topThreeOverall = userList;
    });
  }

  public getSnakeHighscoreList(): void {
    this.userService.getGameHighscoreTopList().subscribe((userList: any) => {
      this.topTenGame = userList;
    });
  }

  public saveHighscore(): void {
    if (!this.userLoggedIn) {
      this.message = 'Not logged in, cannot save the highscore...';
    } else if (this.sessionHighscore <= this.userHighscore) {
      this.message = 'You cannot save a lower score...';
    } else {
      this.userService.saveHighscore(this.sessionHighscore).subscribe((res) => {
        this.message = 'Successfully saved new highscore!';
        this.userHighscore = this.sessionHighscore;
        this.getOverallScoreList();
        this.getSnakeHighscoreList();
      }, (err) => {
        this.message = 'Could not update highscore...';
      });
    }
  }

  public quit(): void {
    this.router.navigate(['/home']);
  }

  public toggleInstructions(): void {
    this.instructions = !this.instructions;
  }

  public isValidUserHighscore(): boolean {
    return this.userHighscore !== null && !Number.isNaN(this.userHighscore);
  }

  public run(): void {
    if (this.dead) {
      this.initializeNewGame();
    }
    const runTime = () => {
      setTimeout(() => {
        this.goStep();
        this.dead = this.dead || this.snake.checkSelfDead();
        if (!this.dead) {
          runTime();
        } else {
          this.die();
        }
      }, this.timestep);
    };
    runTime();
  }

  public goStep(): void {
    this.snake.goStep(this.size);
    this.eatEggOrDie();
  }

  public eatEggOrDie(): void {
    const pos: Position = this.snake.head.pos;
    if (this.board.isStone(pos)) {
      console.log('on a stone');
      this.dead = true;
    } else if (this.board.isEgg(pos)) {
      this.board.eatEgg(pos);
      this.snake.grow();
      this.score++;
    } else if (this.board.isSpecialEgg(pos)) {
      this.board.eatEgg(pos);
      this.snake.shrink();
      this.score++;
    }
  }

  @HostListener('window:keydown', ['$event'])
  public onKeypress(event: KeyboardEvent): void {
    if (!this.dead) {
      const dir: Direction = KeyCodes[event.code];
      this.changeDirAndGoStep(dir);
    }
  }

  private die(): void {
    this.message = 'You Died!';
    this.playing = false;
    this.updateScores();
  }

  private updateScores(): void {
    this.lastScore = this.score;
    this.sessionHighscore = this.score > this.sessionHighscore ? this.score : this.sessionHighscore;
  }

  private initializeNewGame(): void {
    this.snake = new Snake();
    this.board.newGame();
    this.score = 0;
    this.dead = false;
  }

  private initializePositions(): Position[] {
    const positions: Position[] = [];
    for (let i = 0; i < this.size; i++) {
      for (let k = 0; k < this.size; k++) {
        positions.push({
          x: k,
          y: i
        });
      }
    }
    return positions;
  }

  private changeDirAndGoStep(dir: Direction): void {
    if (dir) {
      const canChangeDir = this.getCanChangeDir(dir, this.snake.dir);
      if (canChangeDir) {
        this.snake.dir = dir;
        this.goStep();
      }
    }
  }

  private getCanChangeDir(d1: Direction, d2: Direction): boolean {
    const dirs = [d1, d2];
    const filteredUpDown = dirs.filter(dir => dir === Direction.UP || dir === Direction.DOWN).length;
    const onlyOneDir = filteredUpDown === 2 || filteredUpDown === 0;
    return !onlyOneDir;
  }

  public ngStyleCell(pos: Position): any {
    const bgEgg = this.board.isEgg(pos) ? 'orange' : null;
    const bgStone = this.board.isStone(pos) ? 'grey' : null;
    const bgSnake = this.snake.isSnakeCell(pos) ? 'red' : null;
    const specialEggAnimation = this.board.isSpecialEgg(pos) ? 'specialEgg 1s infinite' : 'none';
    const defaultBg = '#ccc';
    return {
      width: `${this.cellWidth}px`,
      height: `${this.cellWidth}px`,
      background: bgEgg || bgStone || bgSnake || defaultBg,
      animation: specialEggAnimation
    };
  }

}
