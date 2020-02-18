import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserList } from 'app/shared/model/user-list.model';

type EntityResponseType = HttpResponse<IUserList>;
type EntityArrayResponseType = HttpResponse<IUserList[]>;

@Injectable({ providedIn: 'root' })
export class UserListService {
  public resourceUrl = SERVER_API_URL + 'api/user-lists';

  constructor(protected http: HttpClient) {}

  create(userList: IUserList): Observable<EntityResponseType> {
    return this.http.post<IUserList>(this.resourceUrl, userList, { observe: 'response' });
  }

  update(userList: IUserList): Observable<EntityResponseType> {
    return this.http.put<IUserList>(this.resourceUrl, userList, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUserList>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserList[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
