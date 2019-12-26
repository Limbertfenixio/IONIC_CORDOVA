import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  menu: any = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.menu = this.dataService.getData();
  }

}
