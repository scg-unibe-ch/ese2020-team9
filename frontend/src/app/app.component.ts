import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Stor';

  keycodesEntered = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  @HostListener('window:keydown', ['$event'])
  public onKeypress(event: KeyboardEvent): void {
    console.log(event.code);
    this.keycodesEntered.push(event.code);
    this.checkForKonamiCode();
  }

  private checkForKonamiCode(): void {
    switch (this.keycodesEntered.length) {
      case 1:
        if (this.keycodesEntered[0] !== 'ArrowUp') {
          this.keycodesEntered = [];
          console.log('first false');
        }
        break;
      case 2:
        if (this.keycodesEntered[1] !== 'ArrowUp') {
          this.keycodesEntered = [];
          console.log('second false');
        }
        break;
      case 3:
        if (this.keycodesEntered[2] !== 'ArrowDown') {
          this.keycodesEntered = [];
          console.log('third false');
        }
        break;
      case 4:
        if (this.keycodesEntered[3] !== 'ArrowDown') {
          this.keycodesEntered = [];
          console.log('fourth false');
        }
        break;
      case 5:
        if (this.keycodesEntered[4] !== 'ArrowLeft') {
          this.keycodesEntered = [];
          console.log('fith false');
        }
        break;
      case 6:
        if (this.keycodesEntered[5] !== 'ArrowRight') {
          this.keycodesEntered = [];
          console.log('sixth false');
        }
        break;
      case 7:
        if (this.keycodesEntered[6] !== 'ArrowLeft') {
          this.keycodesEntered = [];
          console.log('seventh false');
        }
        break;
      case 8:
        if (this.keycodesEntered[7] !== 'ArrowRight') {
          this.keycodesEntered = [];
          console.log('eigth false');
        }
        break;
      case 9:
        if (this.keycodesEntered[8] !== 'KeyB') {
          this.keycodesEntered = [];
          console.log('ninth false');
        }
        break;
      case 10:
        if (this.keycodesEntered[9] !== 'KeyA') {
          this.keycodesEntered = [];
          console.log('tenth false');
        } else {
          console.log('Got it!!');
          this.keycodesEntered = [];
          this.router.navigate(['/game']);
        }
        break;
    }
  }

}
