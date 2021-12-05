import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SousFamille } from '../../Models/famille/sousfamille';
import { environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class SousFamilleService {

  private baseUrl = environment.urlBackend+'sousFamilles';

  constructor(private http: HttpClient) { }

  getSousFamille(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createSousFamille(sousfamille: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, sousfamille);
  }

  updateSousFamille(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteSousFamille(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getSousFamillesList(): Observable<SousFamille[]> {
    return this.http.get<SousFamille[]>(`${this.baseUrl}`);
  }

}
