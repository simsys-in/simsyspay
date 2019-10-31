import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/service/nav.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private nav:NavService
  ) { }

  ngOnInit() {
  }

}
