import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './../../services/product.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderBoardComponent } from './leaderboard.component';

describe('LeaderBoardComponent', () => {
  let component: LeaderBoardComponent;
  let fixture: ComponentFixture<LeaderBoardComponent>;

  const stubActivatedRoute = {
    snapshot: {
      paramMap: {
        get(): string {
          return '2';
        }
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ LeaderBoardComponent ],
      providers: [ { provide: ActivatedRoute, useValue: stubActivatedRoute }, ProductService, HttpTestingController ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
