import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BonReception } from '../../models/bonReception/bonReception';
import { environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class BonReceptionService {

  private baseUrl = environment.urlBackend+'bonReceptions';

  constructor(private http: HttpClient) { }

  getBonReception(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  
  getInitBonReception(): Observable<any> {
    return this.http.get(`${ environment.urlBackend+'bonReception'}`); 
  }

  createBonReception(bonReception: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, bonReception);
  }

  updateBonReception(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteBonReception(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getBonReceptionsList(): Observable<BonReception[]> {
    return this.http.get<BonReception[]>(`${this.baseUrl}`);
  }
}
