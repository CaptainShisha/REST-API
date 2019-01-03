import { HttpClient } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class MenuListResolverService implements Resolve<Observable<any>> {

  public constructor(private readonly http: HttpClient) {}

  public resolve(): Observable<any> {
    return this.http
      .get(
        `http://localhost:3000/menu`
      )
      .pipe();
  }
}
