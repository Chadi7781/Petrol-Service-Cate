import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LigneDevis } from "../../Models/devis/lignedevis";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class LigneDevisService {
  private baseUrl = environment.urlBackend + "ligneDevis";

  constructor(private http: HttpClient) {}

  getLigneDevis(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createLigneDevis(lignedevis: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, lignedevis);
  }

  updateLigneDevis(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteLigneDevis(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: "text" });
  }

  getLigneDevissList(): Observable<LigneDevis[]> {
    return this.http.get<LigneDevis[]>(`${this.baseUrl}`);
  }
}
