import { FullInfoModel } from './../../app-common-shared/model/full-info.model';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LogDataModel } from '../models/log-data.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(
    private http: HttpClient
  ) { }

  getLogInfo(option): Observable<LogDataModel> {
    console.log('get log info got called');
    return this.http.post<LogDataModel>(`${environment.serverUrl}/all-info`, option);
  }

}
