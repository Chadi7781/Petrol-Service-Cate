import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Devis } from "../../Models/devis/devis";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class DevisService {
  private baseUrl = environment.urlBackend + "devis";

  constructor(private http: HttpClient) {}

  getDevis(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getInitDevis(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  createDevis(devis: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, devis);
  }

  updateDevis(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  commanderDevis(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/commander/${id}`, value);
  }

  deleteDevis(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: "text" });
  }

  getDevisList(): Observable<Devis[]> {
    return this.http.get<Devis[]>(`${environment.urlBackend + "deviss"}`);
  }
}
