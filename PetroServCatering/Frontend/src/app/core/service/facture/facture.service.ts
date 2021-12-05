import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facture } from '../../models/facture/facture';
import { environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class FactureService {

  private baseUrl = environment.urlBackend+'factures';

  constructor(private http: HttpClient) { }

  getFacture(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  
  getInitFacture(): Observable<any> {
    return this.http.get(`${ environment.urlBackend+'facture'}`); 
  }

  createFacture(facture: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, facture);
  }

  updateFacture(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteFacture(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getFacturesList(): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.baseUrl}`);
  }
}
