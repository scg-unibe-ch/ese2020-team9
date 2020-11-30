import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { LeaderBoardScore } from "../../models/leaderboardscore.model";


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderBoardComponent implements OnInit {

    userId: any;
    userName: string;
    userScore: number;
    userFirstName: string;
    userLastName: string;
    leaderBoard: LeaderBoardScore[];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getLeaderBoard();

  }

  getLeaderBoard(){
    this.httpClient.get(environment.endpointURL + 'leaderboard/' ,{}).subscribe((data: LeaderBoardScore[]) => {
            this.leaderBoard = data;
         });

  }

}
