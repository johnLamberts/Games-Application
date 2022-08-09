import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIResponse, Game } from '../types/game';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private http: HttpClient) {}

  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);

    if (!search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${environment.GAME_URL}/games`, {
      params,
    });
  }

  getGameDetails(gameId: string): Observable<Game> {
    const gameInfoRequest = this.http.get(
      `${environment.GAME_URL}/games/${gameId}`
    );

    const gameTrailersRequest = this.http.get(
      `${environment.GAME_URL}/games/${gameId}/movies`
    );

    const gameScreenShotRequest = this.http.get(
      `${environment.GAME_URL}/games/${gameId}/screenshots`
    );


    return forkJoin({
        gameInfoRequest,
        gameScreenShotRequest,
        gameTrailersRequest,
      }).pipe(
        map((resp: any) => {
          return {
            ...resp['gameInfoRequest'],
            screenshots: resp['gameScreenShotRequest']?.results,
            trailers: resp['gameTrailersRequest']?.results,
          };
        })
      );
  }
}
