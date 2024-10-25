import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JsonPipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  categories: any = [];
  items: any = [];
  constructor(private api: ApiService) {
    if (localStorage.getItem("categories") != null) {

      this.categories = JSON.parse(localStorage.getItem("categories") || "[]");
    }
    this.getCategories();
    this.getItems();
  }

  async getCategories() {

    this.categories = await this.api.get("categories");
    localStorage.setItem("categories", JSON.stringify(this.categories));
    console.log(this.categories)
  }
  async getItems() {

    this.items = await this.api.get("items");
    // localStorage.setItem("categories", JSON.stringify(this.categories));
    console.log(this.categories)
  }
}
