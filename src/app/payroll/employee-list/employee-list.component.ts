import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { config } from 'src/app/config';

/**
 * @title Table retrieving data through HTTP
 */
//for editing in the employee get  the view page
@Component({
  selector: 'app-employee-list',
  styleUrls:['./employee-list.component.scss'],
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent implements AfterViewInit {
  [x: string]: any;
  displayedColumns: string[] = ['employee_code', 'employee', 'mobile', 'department'];
  exampleDatabase: ExampleHttpDatabase | null;
  data: GithubIssue[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  rows: any;

  constructor(private http: HttpClient) {}
  
  ngAfterViewInit() {
    this.simsList();
    this.exampleDatabase = new ExampleHttpDatabase(this.http);
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;
          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }
  
  simsList(){
        const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':JSON.parse(localStorage.getItem('currentUser')).apiKey
      })
    };
  
    this.http.get<any>(config.apiUrl+'/payroll/employee/queries',httpOptions).subscribe(res => {
      this.rows = res;
    });
}
}

  export interface GithubApi {
    items: GithubIssue[];
    total_count: number;
  }

export interface GithubIssue {
  employee_code: string;
  mobile: string;
  employee: string;
  department: string;
  
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private http: HttpClient) {}

  getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
    //alert(JSON.parse(localStorage.getItem('currentUser')).apiKey);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':JSON.parse(localStorage.getItem('currentUser')).apiKey
      })
    }
    const href = 'http://api.simsys.org/payroll/employee/queries';
    const requestUrl = `${href}?q=repo:angular/material2&order=${sort} ${order}&page=${page + 1}`;

    return this.http.get<GithubApi>(requestUrl,httpOptions);
  }

}