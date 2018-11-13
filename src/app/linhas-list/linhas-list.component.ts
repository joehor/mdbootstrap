import { Component, OnInit } from '@angular/core';
import { LinhasListService } from './../linhas-list/linhas-list.service';

@Component({
  selector: 'app-linhas-list',
  templateUrl: './linhas-list.component.html',
  styleUrls: ['./linhas-list.component.scss']
})
export class LinhasListComponent implements OnInit {

  linhas;

  constructor(private linhasListService: LinhasListService) { }

  ngOnInit() {
    this.getLinhas();
  }

  getLinhas() {
    this.linhasListService.getLinhas()
      .subscribe(res => {
        this.linhas = res;
      });
  }

}
