import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('johan.grobler@prelo.co.za'),
    password: new FormControl('password'),
  });

  constructor(
    private api: ApiService,
    private router: Router,
    public authService: AuthService) { }
  categories: any = []

  async login() {
    //alert(JSON.stringify(this.loginForm.value))
    let response = await this.api.post("auth/login", this.loginForm.value);
    if (response.access_token) {
      this.authService.isAuthenticated = true
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("isAuthenticated", "true");
      this.router.navigate(['/profile']);

    } else {

      alert("oops")
    }
  }

}
