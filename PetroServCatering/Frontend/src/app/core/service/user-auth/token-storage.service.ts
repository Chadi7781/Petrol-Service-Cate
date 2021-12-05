import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/user/userEntity';
import { UserService } from '../user/user.service';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  currentUser: User;

  constructor( private userService : UserService) { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
  // public  getUserEntity() {
  //   return this.userService.getUser(JSON.parse(sessionStorage.getItem(USER_KEY)).id);    
  // }
}
