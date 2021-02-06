import { environment } from '../../../environments/environment';
import { FullInfoModel } from '../../app-common-shared/model/full-info.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullInfoService {

  constructor(
    private http: HttpClient
  ) { }

  getFullInfo(id: string): Observable<FullInfoModel> {
    return this.http.get<FullInfoModel>(`${environment.serverUrl}/full-info/${id}`);
  }
}
