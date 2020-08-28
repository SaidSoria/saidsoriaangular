import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(public http: HttpClient) { }

  /**
   * Alphavantage API Get request 
   */
  getInfo() {
    return this.http.get(API).toPromise();
  }
}
