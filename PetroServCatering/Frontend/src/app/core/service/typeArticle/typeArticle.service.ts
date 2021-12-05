import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeArticle } from '../../Models/typeArticle/typeArticle';
import { environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class TypeArticleService {

  private baseUrl = environment.urlBackend+'typeArticles';

  constructor(private http: HttpClient) { }

  getTypeArticle(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createTypeArticle(typeArticle: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, typeArticle);
  }

  updateTypeArticle(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteTypeArticle(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getTypeArticlesList(): Observable<TypeArticle[]> {
    return this.http.get<TypeArticle[]>(`${this.baseUrl}`);
  }
}
