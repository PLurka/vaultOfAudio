import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IListSong } from 'app/shared/model/list-song.model';

type EntityResponseType = HttpResponse<IListSong>;
type EntityArrayResponseType = HttpResponse<IListSong[]>;

@Injectable({ providedIn: 'root' })
export class ListSongService {
  public resourceUrl = SERVER_API_URL + 'api/list-songs';

  constructor(protected http: HttpClient) {}

  create(listSong: IListSong): Observable<EntityResponseType> {
    return this.http.post<IListSong>(this.resourceUrl, listSong, { observe: 'response' });
  }

  update(listSong: IListSong): Observable<EntityResponseType> {
    return this.http.put<IListSong>(this.resourceUrl, listSong, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IListSong>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IListSong[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
