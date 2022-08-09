import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { GamesService } from 'src/app/shared/services/games.service';
import { Game } from 'src/app/shared/types/game';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating: number = 0;
  gameId: string;
  game: Game;
  routeSub: Subscription;
  gameSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private gameService: GamesService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.gameId = params['gameId'];
      this.getGameDetails(this.gameId);
    });
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  getGameDetails(gameid: string): void {
    this.gameSub = this.gameService
      .getGameDetails(gameid)
      .subscribe((gameRes: Game) => {
        this.game = gameRes;

        setTimeout(() => {
            this.gameRating = this.game.metacritic;
        }, 1000)
      });
  }

  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }
}
