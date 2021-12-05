import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LigneCommande } from '../../Models/commande/lignecommande';
import { environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class LigneCommandeService {

  private baseUrl = environment.urlBackend+'ligneCommandes';

  constructor(private http: HttpClient) { }

  getLigneCommande(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createLigneCommande(lignecommande: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, lignecommande);
  }

  updateLigneCommande(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteLigneCommande(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getLigneCommandesList(): Observable<LigneCommande[]> {
    return this.http.get<LigneCommande[]>(`${this.baseUrl}`);
  }
}
