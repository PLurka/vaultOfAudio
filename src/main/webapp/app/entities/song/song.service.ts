import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { filter, map } from 'rxjs/operators';
import { ISong } from 'app/shared/model/song.model';

type EntityResponseType = HttpResponse<ISong>;
type EntityArrayResponseType = HttpResponse<ISong[]>;

@Injectable({ providedIn: 'root' })
export class SongService {
  public resourceUrl = SERVER_API_URL + 'api/songs';
  jwt: string;

  constructor(protected http: HttpClient, private https: HttpClient) {
    this.getJWT()
      .pipe(
        filter((res: HttpResponse<string>) => res.ok),
        map((res: HttpResponse<string>) => res.body)
      )
      .subscribe((res: string) => {
        if (res != undefined) {
          console.error('getJWT(): ' + res);
          this.jwt = res;
        }
      });
  }

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

  getLogin() {
    //return this.http.get<String>(`${this.resourceUrl}/mylogin`, { observe: 'response' });

    const newRequest = new HttpRequest('GET', this.resourceUrl + '/mylogin', {
      reportProgress: true,
      responseType: 'text'
    });
    return this.https.request(newRequest);
  }

  getJWT() {
    //return this.http.get<String>(`${this.resourceUrl}/myjwt`, { observe: 'response' });

    const newRequest = new HttpRequest('GET', this.resourceUrl + '/myjwt', {
      reportProgress: true,
      responseType: 'text'
    });
    return this.https.request(newRequest);
  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);

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
        Authorization: 'Bearer ' + this.jwt
      }
    };
    return fetch(this.resourceUrl + '/file/' + path, requestOptions).then(res => {
      return res.blob();
    });
  }
}
