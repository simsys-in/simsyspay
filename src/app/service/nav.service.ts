import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  private a:MatSidenav
  constructor() { }

  public setSidenav(a:MatSidenav){
    this.a =a;
  }
  public open(){
    return this.a.open();
  }
  public close(){
    return this.a.close();
  }
  public toggle():void{
    this.a.toggle();
  }
}
