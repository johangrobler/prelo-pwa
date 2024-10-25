import { Component } from '@angular/core';
import { DrawerComponent } from '../drawer/drawer.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [DrawerComponent, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  constructor(public authService: AuthService) { }
}
