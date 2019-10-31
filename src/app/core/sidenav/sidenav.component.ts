import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(map(result => result.matches));

  @Input() openedSubject: Subject<boolean>;
  @ViewChild('sidenav') sidenav: MatSidenav;
  
  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
  }
  ngAfterContentInit() {
    this.openedSubject.subscribe(
      keepOpen => this.sidenav[keepOpen ? 'open' : 'close']()
    );
  }

  toggle() {
    this.openedSubject.next(!this.sidenav.opened);
  }
}
