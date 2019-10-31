import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from './core/auth.service';
import { config } from './config';
import { PrintService } from './service/print.service';
import { MatSidenav } from '@angular/material';
import { NavService } from './service/nav.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.scss'],
    //providers:[AuthService]
})

export class AppComponent {
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

       constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
        private service : AuthService,
        public printService: PrintService,
        private navService:NavService
        ) {

        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);  
        this.service.currentUser.subscribe(x => this.currentUser = x);
       }

       

  private _mobileQueryListener: () => void;

  dismissSidebar() {
    this.openedSubject.next(false);
  }
  ngOnInit() {
    this.navService.setSidenav(this.a);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
