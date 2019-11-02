//the processing will include activities such as coonecting to db,interact with other component,routing,services,etc.
import { Component, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from './core/auth.service';
import { config } from './config';
import { PrintService } from './print.service';


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
    providers:[AuthService]
})

export class AppComponent {


}
