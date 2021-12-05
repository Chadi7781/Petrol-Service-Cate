import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LigneReception } from '../../models/bonReception/ligneReception';
import { environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class LigneReceptionService {

  private baseUrl = environment.urlBackend+'ligneReceptions';

  constructor(private http: HttpClient) { }

  getLigneReception(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createLigneReception(ligneReception: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, ligneReception);
  }

  updateLigneReception(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteLigneReception(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getLigneReceptionsList(): Observable<LigneReception[]> {
    return this.http.get<LigneReception[]>(`${this.baseUrl}`);
  }
}
