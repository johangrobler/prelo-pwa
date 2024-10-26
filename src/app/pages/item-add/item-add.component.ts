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
  //handleUpload

  files: any = [];
  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Reads the selected files and stores them in the this.files array.
   * Each object in the array will contain the file name, size and the file data.
   * @param event The event from the file input.
   */
  /******  d53592cb-eea9-4d6b-b576-dc48b5884751  *******/
  handleUpload(event: any) {
    this.files = []

    for (var i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.files.push({
          name: "" + file.name,
          size: file.size,
          //fileType: this.getFileType("" + file.name),
          data: file
        });

      };
    }

  }
  postImage() {
    for (var i = 0; i < this.files.length; i++) {
      this.uploadImage(this.files[i]);
    }
  }
  // post image
  imageFile!: File;
  async uploadImage(file: any) {

    const formData = new FormData();;
    formData.append('file', file.data, file.name);
    await this.api.uploadDocument(formData);
  }

}
