import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserSong } from 'app/shared/model/user-song.model';

type EntityResponseType = HttpResponse<IUserSong>;
type EntityArrayResponseType = HttpResponse<IUserSong[]>;

@Injectable({ providedIn: 'root' })
export class UserSongService {
  public resourceUrl = SERVER_API_URL + 'api/user-songs';

  constructor(protected http: HttpClient) {}

  create(userSong: IUserSong): Observable<EntityResponseType> {
    return this.http.post<IUserSong>(this.resourceUrl, userSong, { observe: 'response' });
  }

  update(userSong: IUserSong): Observable<EntityResponseType> {
    return this.http.put<IUserSong>(this.resourceUrl, userSong, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUserSong>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserSong[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
