import { Component } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-item-add',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, JsonPipe],
  templateUrl: './item-add.component.html',
  styleUrl: './item-add.component.scss'
})
export class ItemAddComponent {


  categories: any = [];

  brands: any = [];

  itemForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    brand_id: new FormControl(''),
    category_id: new FormControl(''),
  });


  constructor(
    private router: Router,
    private api: ApiService,
    public authService: AuthService) {
    this.getBrands();
    this.getCategories();
  }


  async createItem() {
    //alert(JSON.stringify(this.itemForm.value))
    let response = await this.api.post("items", this.itemForm.value);
    console.log(JSON.stringify(response))
    this.router.navigate(['/items']);
  }

  async getCategories() {
    this.categories = await this.api.get("categories");
  }

  async getBrands() {
    this.brands = await this.api.get("brands");
  }
}
