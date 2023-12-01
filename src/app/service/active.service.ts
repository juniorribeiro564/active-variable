import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL2 } from '../modules/assets/env';
import { Observable } from 'rxjs';

type ChartGetResponseItem = {
  'adj close': string;
  close: string;
  date: string;
  high: string;
  low: string;
  open: string;
  volume: string;
};

@Injectable({
  providedIn: 'root',
})
export class ActiveService {
  constructor(
    private http: HttpClient
    ) { }


  addActive(idActive: string): Observable<any> {
    return this.http.get<any>(`${baseURL2}/${idActive}`)
  }
}
