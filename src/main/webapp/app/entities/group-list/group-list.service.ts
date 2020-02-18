import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGroupList } from 'app/shared/model/group-list.model';

type EntityResponseType = HttpResponse<IGroupList>;
type EntityArrayResponseType = HttpResponse<IGroupList[]>;

@Injectable({ providedIn: 'root' })
export class GroupListService {
  public resourceUrl = SERVER_API_URL + 'api/group-lists';

  constructor(protected http: HttpClient) {}

  create(groupList: IGroupList): Observable<EntityResponseType> {
    return this.http.post<IGroupList>(this.resourceUrl, groupList, { observe: 'response' });
  }

  update(groupList: IGroupList): Observable<EntityResponseType> {
    return this.http.put<IGroupList>(this.resourceUrl, groupList, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGroupList>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGroupList[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
