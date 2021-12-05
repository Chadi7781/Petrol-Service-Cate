import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../../Models/article/article';
import { environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private baseUrl = environment.urlBackend+'articles';

  constructor(private http: HttpClient) { }

  getArticle(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createArticle(article: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, article);
  }

  updateArticle(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteArticle(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getArticlesList(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}`);
  }
}
