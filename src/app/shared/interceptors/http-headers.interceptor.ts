import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'X-RapidAPI-Key': '53140f95admsh22e17b272984698p11718ejsnebeb9b2458fe',
        'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
      },
      setParams: {
        key: '425d1c54b0114c16ad35fcbc69f9da46',
      },
    });

    return next.handle(req);
  }
}
