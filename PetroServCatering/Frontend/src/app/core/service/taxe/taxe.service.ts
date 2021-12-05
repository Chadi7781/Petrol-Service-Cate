import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Taxe} from '../../models/taxe/taxe';

@Injectable({
  providedIn: 'root'
})
export class TaxeService {

  private baseUrl = environment.urlBackend + 'taxes';

  constructor(private http: HttpClient) { }

  getTaxeById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createTaxe(taxe: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`, taxe);
  }

  updateTaxe( taxe: Taxe , id: number): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, taxe);
  }

  deleteTaxe(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAllTaxes(): Observable<Taxe[]> {
    return this.http.get<Taxe[]>(`${this.baseUrl}`);
  }

  getInitTaxe() {

  }
}
