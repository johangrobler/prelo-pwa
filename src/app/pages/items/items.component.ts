import { Component } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { DatePipe, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-items',
  standalone: true,
  imports: [JsonPipe, RouterLink, DatePipe],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent {

  items: any = []

  constructor(

    private api: ApiService) {
    this.getItems()

  }
  async getItems() {
    this.items = await this.api.get("items");
  }
}
