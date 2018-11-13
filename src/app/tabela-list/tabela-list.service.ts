import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TabelaListService {

  url = './assets/json/tabela-list.json';

  constructor(private _http: HttpClient) { }

  getTabela(id) {
    return this._http.get(this.url);
  }

}
