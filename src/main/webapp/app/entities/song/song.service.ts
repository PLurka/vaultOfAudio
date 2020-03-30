import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  pullFileFromStorage(path: String): Observable<HttpEvent<{}>> {
    // const options = createRequestOption(path);
    const newRequest = new HttpRequest('GET', this.resourceUrl + '/file/' + path, path, {
      reportProgress: true,
      responseType: 'blob'
    });

    return this.https.request(newRequest);
    // return this.http.get<File>(this.resourceUrl, { params: options, observe: 'response' });
  }

  pullPromiseFileFromStorage(path: String) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU4NTY5MTg5MH0.HKmwPvO8WwZHaojVtmd-i5-z_MIF-F_gggiXbm5bpU0bsQLqZ0SiS4D7jjRvd_gJz2MMPKdonoXU7QQQNqIzwg'
      },
      body: JSON.stringify({ word: path })
    };
    return fetch(this.resourceUrl + '/file/' + path, requestOptions).then(
      res => {
        return res.blob();
      } /*{
                if (!res.ok)
                    throw new Error(`${res.status} = ${res.statusText}`);
                // response.body is a readable stream.
                // Calling getReader() gives us exclusive access to
                // the stream's content
                var reader = res.body.getReader();
                // read() returns a promise that resolves
                // when a value has been received
                return reader
                    .read()
                    .then((result) => {
                        return result;
                    });
            }*/
    );
  }

  getFile(path: String): Observable<any> {
    return this.http.get(this.resourceUrl + '/file/' + path, { responseType: 'blob', observe: 'response' }).pipe(
      map((res: any) => {
        // console.error('File resource title: ' + res['filename'].data);
        // console.error('File name: ' + res.headers.getAll());
        return new Blob([res.value], { type: 'audio/mpeg' });
      })
    );
  }

  /*pullFileFromStorage(path: String): File{
      const newRequest = new HttpRequest('GET', this.resourceUrl , path, {
          reportProgress: true,
          responseType: 'text'
      });
  }*/
}
