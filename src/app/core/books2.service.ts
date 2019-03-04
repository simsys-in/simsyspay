import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { debounceTime, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private httpService: HttpClient) { }

  search(term) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':'shethra123'
      })
    }
    var listOfBooks = this.httpService.get('http://api.simsys.org/ledger/query_autocomplete?term=' + term,httpOptions)
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
