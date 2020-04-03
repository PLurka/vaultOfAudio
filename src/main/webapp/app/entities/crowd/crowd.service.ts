import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICrowd } from 'app/shared/model/crowd.model';

type EntityResponseType = HttpResponse<ICrowd>;
type EntityArrayResponseType = HttpResponse<ICrowd[]>;

@Injectable({ providedIn: 'root' })
export class CrowdService {
  public resourceUrl = SERVER_API_URL + 'api/crowds';

  constructor(protected http: HttpClient) {}

  create(crowd: ICrowd): Observable<EntityResponseType> {
    return this.http.post<ICrowd>(this.resourceUrl, crowd, { observe: 'response' });
  }

  update(crowd: ICrowd): Observable<EntityResponseType> {
    return this.http.put<ICrowd>(this.resourceUrl, crowd, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrowd>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrowd[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
