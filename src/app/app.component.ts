import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from './core/auth.service';
import { config } from './config';

import { MatSidenav } from '@angular/material/sidenav';
import { NavService } from './service/nav.service';
import { Router } from '@angular/router';



declare var device;
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.scss'],
    //providers:[AuthService]
})


export class AppComponent {
  open: any;
  [x: string]: any;
  @ViewChild('snav') public a:MatSidenav;

  openedSubject = new Subject<boolean>();
  currentUser: any;
  title = 'Garments';
  filteredOptions: Observable<string[]>;
  mobileQuery: MediaQueryList;

  //fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  fillerNav = [
    'Dashboard',
    'Master',
    'ledger'
  ]
  i=0;
  masters: any=[];
  reports: any=[];
menu_reports:any=[];
widgets:any=[];
shortcuts:any=[];
  vouchers: any=[];
  master: any;
  todaydate: any;

       constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
        private service : AuthService,
        
        private navService:NavService,
        
        private router:Router,
        private routess:Router,
        
        ) {

         

        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);  
        this.service.currentUser.subscribe(x => this.currentUser = x);
       }

       
       toggleSidenav()
       {
     this.navService.toggle();
        //  this.sidenav.toggle();
        //  console.log(this.sidenav.toggle);
       }
     

  private _mobileQueryListener: () => void;

  dismissSidebar() {
    this.openedSubject.next(false);
  }
  ngOnInit() {
     
    this.navService.setSidenav(this.a);
   
    document.addEventListener("deviceready", function () {
      alert(device.platform);
    }, false);
    
  }
  load(val) {
  
    if (val == this.router.url) {
      this.spinnerService.show();
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
     }
    }


  saveCall(s,t){
  
    let r:any=s;
    let id:any=t
    
    this.routess.navigate([r],
    
  {
    queryParams:{menu_id:id
    }
    })
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  
  }


  logout(){
    this.service.logOut();
    this.router.navigate(['login'])
  }
  toggle(){

    this.navService.toggle();
  }

}
