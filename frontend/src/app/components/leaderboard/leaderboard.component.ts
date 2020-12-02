import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { LeaderBoardScore } from "../../models/leaderboardscore.model";
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderBoardComponent implements OnInit {

    userId: any;
    userName: string;
    userScore: number;

    leaderBoardSnake: LeaderBoardScoreSnake[];
    leaderBoardOverAll: LeaderBoardScoreOverAll[];

    displayedColumns: string[] = ['position', 'gameScore', 'userName'];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getLeaderBoardSnake();
    this.getLeaderBoardOverAll();
  }

  getLeaderBoardSnake(){
    this.httpClient.get(environment.endpointURL + 'user/highscores/game' ,{}).subscribe((data: LeaderBoardScoreSnake[]) => {
            this.leaderBoardSnake = data;
         });
  }

   getLeaderBoardOverAll(){
      this.httpClient.get(environment.endpointURL + 'user/highscores/game' ,{}).subscribe((data: LeaderBoardScoreOverAll[]) => {
                  this.leaderBoardOverAll = data;
               });
    }

}
