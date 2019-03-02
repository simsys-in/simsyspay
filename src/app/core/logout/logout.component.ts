import { Component, OnInit } from '@angular/core';
import { MyServiceService } from 'src/app/my-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authservice:MyServiceService,
    private router:Router
    ) { }

  ngOnInit() {
    this.authservice.logOut();
    this.router.navigate(['login']);
  }

}
