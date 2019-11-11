import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/service/nav.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  spinnerService: any;
  constructor(
    public nav:NavService,
    private router:Router,
    
  ) { 

    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
  }
  this.router.events.subscribe((evt) => {
    if (evt instanceof NavigationEnd) {
       // trick the Router into believing it's last link wasn't previously loaded
       this.router.navigated = false;
       // if you need to scroll back to top, here is the right place
       window.scrollTo(0, 0);
    }
});
  }
  ngOnInit() {
   this.load(eval);
  }
  load(val) {
  
    if (val == this.router.url) {
      this.spinnerService.show();
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
     }
    }
  toggle(){
    
    this.nav.toggle();
    }
  
}
