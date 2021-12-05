import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LigneFacture } from '../../models/facture/ligneFacture';
import { environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class LigneFactureService {

  private baseUrl = environment.urlBackend+'ligneFactures';

  constructor(private http: HttpClient) { }

  getLigneFacture(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createLigneFacture(ligneFacture: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, ligneFacture);
  }

  updateLigneFacture(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteLigneFacture(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getLigneFacturesList(): Observable<LigneFacture[]> {
    return this.http.get<LigneFacture[]>(`${this.baseUrl}`);
  }
}
