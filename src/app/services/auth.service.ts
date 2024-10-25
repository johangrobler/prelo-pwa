import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated: boolean = false

  constructor() {
    if (localStorage.getItem("isAuthenticated") == "true") {
      this.isAuthenticated = true

    }

  }

}
