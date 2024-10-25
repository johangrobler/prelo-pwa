import { Component } from '@angular/core';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {
  showDrawer = false;

  toggleDrawer() {
    this.showDrawer = !this.showDrawer
  }
}
