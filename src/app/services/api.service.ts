import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = "https://seahorse-app-36ato.ondigitalocean.app/v1/"
  isLoading: boolean = false;
  constructor(private http: HttpClient) { }

  async get(endpoint: string): Promise<any> {

    this.isLoading = true;
    const headers = await this.getHeaders();
    try {
      const response = await this.http.get<any>(`${this.apiUrl}${endpoint}`, { headers }).toPromise();
      this.isLoading = false;
      return response;
    } catch (error) {
      this.isLoading = false;
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  async post(endpoint: string, body: any): Promise<any> {
    this.isLoading = true;
    const headers = await this.getHeaders();
    try {
      const response = await this.http.post<any>(`${this.apiUrl}${endpoint}`, body, { headers }).toPromise();

      this.isLoading = false;
      return response;
    } catch (error) {
      this.isLoading = false;
      console.error('Error fetching data:', error);
      throw error;
    }
  }


  async getHeaders(): Promise<any> {


    let expires = Number(localStorage.getItem("expires_at"));
    let time = new Date().getTime();
    console.log(time - expires)
    if ((time - expires) > 300000) {
      //  console.log("Refresh")
      // await this.refreshToken();
    }


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    });

    return headers
  }
}
