import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Famille } from '../../Models/famille/famille';
import { environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class FamilleService {

  private baseUrl = environment.urlBackend+'familles';

  constructor(private http: HttpClient) { }


  

  getSousFamillesByFamilleId(famille:any): Observable<any> {
    return this.http.get(`${this.baseUrl+"/sousfamilles"}`,famille);
  }

  getFamille(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createFamille(famille: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, famille);
  }

  updateFamille(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteFamille(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getFamillesList(): Observable<Famille[]> {
    return this.http.get<Famille[]>(`${this.baseUrl}`);
  }
}
