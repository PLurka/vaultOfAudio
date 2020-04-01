import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISong } from 'app/shared/model/song.model';

type EntityResponseType = HttpResponse<ISong>;
type EntityArrayResponseType = HttpResponse<ISong[]>;

@Injectable({ providedIn: 'root' })
export class SongService {
  public resourceUrl = SERVER_API_URL + 'api/songs';

  constructor(protected http: HttpClient, private https: HttpClient) {}

  create(song: ISong): Observable<EntityResponseType> {
    return this.http.post<ISong>(this.resourceUrl, song, { observe: 'response' });
  }

  update(song: ISong): Observable<EntityResponseType> {
    return this.http.put<ISong>(this.resourceUrl, song, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISong>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISong[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);

    //return this.http.post<any>(this.resourceUrl+'/savefile', data, { reportProgress: true });

    const newRequest = new HttpRequest('POST', this.resourceUrl + '/savefile', data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.https.request(newRequest);
  }

  pullPromiseFileFromStorage(path: String) {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU4NTc1OTE1OH0.6uMQP-5K2ORQJXscz_jQlaxc5PNII5Sg6R0z3rFYSluFdcV-qwxcRrwXvoWERySbQ2PTS06av0VM4njUZwic6A'
      }
    };
    return fetch(this.resourceUrl + '/file/' + path, requestOptions).then(res => {
      return res.blob();
    });
  }
}
