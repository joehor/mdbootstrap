import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LinhasListService {

  url = './assets/json/linhas-list.json';

  constructor(private _http: HttpClient) { }

  getLinhas() {
    return this._http.get(this.url);
  }

}
