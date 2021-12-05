import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Commande } from "../../Models/commande/commande";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CommandeService {
  private baseUrl = environment.urlBackend + "commandes";
  private url = environment.urlBackend + "commande";

  constructor(private http: HttpClient) {}

  getCommande(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getInitCommande(): Observable<any> {
    return this.http.get(`${this.url}`);
  }

  createCommande(commande: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, commande);
  }

  updateCommande(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  validerCommande(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${id}`, value);
  }

  facturerCommande(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.url}/facturer/${id}`, value);
  }

  genererFactureService(id: number, value: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}/service`, value);
  }

  deleteCommande(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: "text" });
  }

  getCommandesList(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.baseUrl}`);
  }
}
