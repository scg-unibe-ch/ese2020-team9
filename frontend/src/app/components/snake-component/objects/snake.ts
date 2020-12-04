import { Position } from './position';
import { Direction } from './direction';

export class Snake {

  dir: Direction = Direction.RIGHT;
  cells: SnakeCell[] = [{
    pos: {
      x: 3,
      y: 0,
    },
    prevPos: {
      x: 2,
      y: 0,
    }
  }, {
    pos: {
      x: 2,
      y: 0,
    },
    prevPos: {
      x: 1,
      y: 0,
    }
  }, {
    pos: {
      x: 1,
      y: 0,
    },
    prevPos: {
      x: 0,
      y: 0,
    }
  }];

  get head(): SnakeCell {
    return this.cells[0];
  }

  get tail(): SnakeCell[] {
    const [_, ...tail] = this.cells;
    return tail;
  }

  public grow(): void {
    this.cells.push({
      pos: this.cells[this.cells.length - 1].pos
    });
  }

  public shrink(): void {
    for (let i = 0; i < this.cells.length / 2; i++) {
      this.cells.pop();
    }
  }

  public isSnakeCell(pos: Position): boolean {
    return this.cells.filter(elt => elt.pos.x === pos.x && elt.pos.y === pos.y).length > 0;
  }

  public updateTail(): void {
    this.tail.forEach((elt, idx) => {
      elt.prevPos = elt.pos;
      elt.pos = this.cells[idx].prevPos;
    });
  }

  public checkSelfDead(): boolean {
    return this.tail.filter(elt => elt.pos.x === this.head.pos.x && elt.pos.y === this.head.pos.y).length > 0;
  }

  public setNextPos(newPos: Position): void {
    this.head.prevPos = this.head.pos;
    this.head.pos = newPos;
    this.updateTail();
  }

  public goStep(size: number): void {
    const next: Position = {
      x: this.head.pos.x,
      y: this.head.pos.y
    };
    if (this.dir === Direction.LEFT) {
      next.x === 0 ? next.x = size - 1 : next.x--;
    } else if (this.dir === Direction.RIGHT) {
      next.x = (next.x + 1) % size;
    } else if (this.dir === Direction.UP) {
      next.y === 0 ? next.y = size - 1 : next.y--;
    } else if (this.dir === Direction.DOWN) {
      next.y = (next.y + 1) % size;
    } else {
      throw new Error('Unknown direction');
    }
    this.setNextPos(next);
  }

}

interface SnakeCell {
  prevPos?: Position;
  pos: Position;
}
