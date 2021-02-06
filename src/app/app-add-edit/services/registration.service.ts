import { FullInfoModel } from './../../app-common-shared/model/full-info.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationInfoModule } from '../models/registration-info.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private http: HttpClient
  ) { }

  register(registerInfo: RegistrationInfoModule): Observable<any> {
    return this.http.post(`${environment.serverUrl}/register`, registerInfo);
  }

  getEditInfo(uid: string): Observable<FullInfoModel> {
    return this.http.post<FullInfoModel>(`${environment.serverUrl}/get-edit-info`, {uid});
  }

  editInfo(info: FullInfoModel): Observable<any> {
    return this.http.post(`${environment.serverUrl}/edit-info`, info);
  }
}
