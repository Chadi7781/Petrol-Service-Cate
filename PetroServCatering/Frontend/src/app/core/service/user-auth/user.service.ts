import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUser(id: any) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
