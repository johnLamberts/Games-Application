import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { GamesService } from "src/app/shared/services/games.service";
import { APIResponse, Game } from "src/app/shared/types/game";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit, OnDestroy{ 
    sort: string;
    games: Game[] = [];
    endGameSub$ = new Subject<void>();

    constructor(
        private gameService: GamesService,
        private route: ActivatedRoute,
        private router: Router
        ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            if(params['game-search']) {
                this._searchGames('metacrit', params['game-search']);
            } else {
                this._searchGames('metacrit');
            }

        })        
    }

    ngOnDestroy(): void {
        this.endGameSub$.next();
        this.endGameSub$.complete();
    }

    _searchGames(sort: string, search?: string): void {
        this.gameService
            .getGameList(sort, search)
            .pipe(takeUntil(this.endGameSub$))
            .subscribe((gameList: APIResponse<Game>) => {
                this.games = gameList.results;
                console.log(this.games)
            })
    }

    openGameDetails(gameId: string): void {
        this.router.navigate(['details', gameId])
    }


}