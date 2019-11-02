import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../auth.service';
import { PrintService } from 'src/app/print.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
 currentUser: any;
  title = 'app-mat';
  filteredOptions: Observable<string[]>;
  mobileQuery: MediaQueryList;
  name = 'angular-print-service';
  //fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  fillerNav = [
    'Dashboard',
    'Master',
    'ledger'
  ]

       constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
        private service : AuthService,
        public printService: PrintService
        ) {

        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);  
        this.service.currentUser.subscribe(x => this.currentUser = x);
       }

       

  private _mobileQueryListener: () => void;


  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
 
  
}
