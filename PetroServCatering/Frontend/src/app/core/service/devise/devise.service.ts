import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Devise } from '../../Models/devise/devise';
import { environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class DeviseService {

  private baseUrl = environment.urlBackend+'devises';

  constructor(private http: HttpClient) { }

  getDevise(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createDevise(devise: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, devise);
  }

  updateDevise(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteDevise(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getDevisesList(): Observable<Devise[]> {
    return this.http.get<Devise[]>(`${this.baseUrl}`);
  }
}
