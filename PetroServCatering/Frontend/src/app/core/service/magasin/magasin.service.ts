import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Magasin } from '../../Models/magasin/magasin';
import { environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class MagasinService {

  private baseUrl = environment.urlBackend+'magasins';

  constructor(private http: HttpClient) { }

  getMagasin(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createMagasin(magasin: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, magasin);
  }

  updateMagasin(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteMagasin(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getMagasinsList(): Observable<Magasin[]> {
    return this.http.get<Magasin[]>(`${this.baseUrl}`);
  }
}
