import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, debounceTime} from 'rxjs/operators';
//import { BooksService } from '../../core/books.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  //providers: [BooksService]
})
export class EmployeeComponent implements OnInit {
  myControl = new FormControl();

       searchTerm : FormControl = new FormControl();
       myBooks = <any>[];
  constructor(//private service: BooksService,
    private http: HttpClient
    ) {

   }

  ngOnInit() {
    this.searchTerm.valueChanges.subscribe(
      term => {
        if (term != '') {
          this.search(term).subscribe(
            data => {
              this.myBooks = data as any[];
              //console.log(data[0].BookName);
          })
        }
    })
  }

  search(term) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':'shethra123'
      })
    }
    var listOfBooks = this.http.get('http://api.simsys.org/ledger/query_autocomplete?term=' + term,httpOptions)
    .pipe(
        debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
        map(
            (data: any) => {
                return (
                    data.length != 0 ? data as any[] : [{"ledger": "No Record Found"} as any]
                );
            }
    ));

    return listOfBooks;  
}  
}
