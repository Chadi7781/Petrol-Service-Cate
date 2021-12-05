import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etat } from '../../Models/etat/etat';
import { environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class EtatService {

  private baseUrl = environment.urlBackend+'etats';

  constructor(private http: HttpClient) { }

  getEtat(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createEtat(etat: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, etat);
  }

  updateEtat(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteEtat(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getEtatsList(): Observable<Etat[]> {
    return this.http.get<Etat[]>(`${this.baseUrl}`);
  }
}
