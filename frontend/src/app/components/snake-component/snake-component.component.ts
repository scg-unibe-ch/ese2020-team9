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

  readonly size = 40;
  readonly cellWidth = 13; // in px
  readonly timestep = 100;
  readonly ngStyleCells = {
    width: `${this.size * this.cellWidth}px`
  };
  readonly direnum = Direction;

  dead = false;
  score = 0;
  highscore = 0;
  playing = false;

  message: string;

  board: Board = new Board(this.size);
  positions: Position[] = this.initializePositions();
  snake: Snake = new Snake();

  public constructor() {
    this.message = 'Welcome to Snake!';
  }

  public ngOnInit(): void {
    this.board.newGame();
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
            }, 700);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }

  public saveHighscore(): void { }

  public quit(): void { }

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
    this.updateHighscore();
  }

  private updateHighscore(): void {
    this.highscore = this.score > this.highscore ? this.score : this.highscore;
  }

  private initializeNewGame(): void {
    this.snake = new Snake()
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
