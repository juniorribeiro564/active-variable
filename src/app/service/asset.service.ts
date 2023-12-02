import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL2 } from '../modules/assets/env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  constructor(
    private http: HttpClient
    ) { }


  addAsset(idAsset: string): Observable<any> {
    return this.http.get<any>(`${baseURL2}/${idAsset}`)
  }
}
