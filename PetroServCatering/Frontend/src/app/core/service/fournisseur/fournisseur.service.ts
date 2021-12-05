import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fournisseur } from '../../Models/fournisseur/fournisseur';
import { environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  private baseUrl = environment.urlBackend+'fournisseurs';

  constructor(private http: HttpClient) { }

  getFournisseur(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createFournisseur(fournisseur: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, fournisseur);
  }

  updateFournisseur(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteFournisseur(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getFournisseursList(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.baseUrl}`);
  }
}
