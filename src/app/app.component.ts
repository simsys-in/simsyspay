import { Component, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from './core/auth.service';
import { config } from './config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[AuthService]
})

export class AppComponent {
  currentUser: any;
  title = 'app-mat';
  filteredOptions: Observable<string[]>;
  mobileQuery: MediaQueryList;

  //fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  fillerNav = [
    'Dashboard',
    'Master',
    'ledger'
  ]

       constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
        private service : AuthService
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
