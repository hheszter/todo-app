import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loginStatus: boolean = true;

  constructor() { }

  ngOnInit(): void { }


  logout() {
    console.log("logged out...")
  }

}
