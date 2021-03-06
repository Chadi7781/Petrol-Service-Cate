import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user/userEntity';
import { environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl =  environment.urlBackend+'users';

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createUser(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, user);
  }

  updateUser(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getUsersList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }
}
