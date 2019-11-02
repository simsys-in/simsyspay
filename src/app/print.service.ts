import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { config } from 'process';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  isPrinting = false;
  http: any;

  constructor(private router: Router) { }

  printDocument(documentName: string, documentData: string[]) {
    this.isPrinting = true;
    this.router.navigate(['/',
      { outlets: {
        'print': ['print', documentName, documentData.join()]
      }}]);
  }

  onDataReady() {
    setTimeout(() => {
      window.print();
      this.isPrinting = false;
      this.router.navigate([{ outlets: { print: null }}]);
    });
  }


}
