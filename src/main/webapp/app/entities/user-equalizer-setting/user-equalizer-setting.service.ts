import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserEqualizerSetting } from 'app/shared/model/user-equalizer-setting.model';

type EntityResponseType = HttpResponse<IUserEqualizerSetting>;
type EntityArrayResponseType = HttpResponse<IUserEqualizerSetting[]>;

@Injectable({ providedIn: 'root' })
export class UserEqualizerSettingService {
  public resourceUrl = SERVER_API_URL + 'api/user-equalizer-settings';

  constructor(protected http: HttpClient) {}

  create(userEqualizerSetting: IUserEqualizerSetting): Observable<EntityResponseType> {
    return this.http.post<IUserEqualizerSetting>(this.resourceUrl, userEqualizerSetting, { observe: 'response' });
  }

  update(userEqualizerSetting: IUserEqualizerSetting): Observable<EntityResponseType> {
    return this.http.put<IUserEqualizerSetting>(this.resourceUrl, userEqualizerSetting, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUserEqualizerSetting>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserEqualizerSetting[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
