import { Component } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-item-add',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './item-add.component.html',
  styleUrl: './item-add.component.scss'
})
export class ItemAddComponent {


  itemForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });


  constructor(

    private api: ApiService,
    public authService: AuthService) { }


  async createItem() {
    alert(JSON.stringify(this.itemForm.value))
    let response = await this.api.post("items", this.itemForm.value);
    console.log(JSON.stringify(response))
  }
}
