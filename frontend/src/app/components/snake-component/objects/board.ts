import { Position } from './position';

const Objects = {
  0: 'Empty',
  1: 'Egg',
  2: 'Stone',
  3: 'CutInHalfEgg'
};

export class Board {

  private board: number[][];
  private size: number;

  constructor(size: number) {
    this.size = size;
  }

  public newGame(): void {
    this.initBoard();

    const numberOfStones = this.getRandomNumber(30);
    const numberOfEggs = this.getRandomNumber(5) + 1;

    this.initializeObjects(numberOfStones, 2);
    this.initializeObjects(numberOfEggs, 1);
  }

  public isStone(pos: Position): boolean {
    return this.board[pos.x][pos.y] === 2;
  }

  public isEgg(pos: Position): boolean {
    return this.board[pos.x][pos.y] === 1;
  }

  public isSpecialEgg(pos: Position): boolean {
    return this.board[pos.x][pos.y] === 3;
  }

  public eatEgg(pos: Position): void {
    this.board[pos.x][pos.y] = 0;
    const eggOrSpecialEgg = this.getRandomNumber(10) === 3 ? 3 : 1;
    this.initializeObjects(1, eggOrSpecialEgg);
  }

  private initBoard(): void {
    this.board = [];
    for (let i = 0; i < this.size; i++) {
      this.board[i] = [];
      for (let k = 0; k < this.size; k++) {
        this.board[i][k] = 0;
      }
    }
  }

  private initializeObjects(count: number, object: number): void {
    for (let i = 0; i < count; i++) {
      let x: number;
      let y: number;
      do {
        x = this.getRandomNumber(this.size);
        y = this.getRandomNumber(this.size);
      } while (this.board[x][y] !== 0);
      this.board[x][y] = object;
    }
  }

  private getRandomNumber(n: number): number {
    const rand = Math.random() * n;
    return Math.floor(rand);
  }

}
