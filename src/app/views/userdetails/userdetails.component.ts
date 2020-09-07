import { Component, OnInit } from '@angular/core';
import { ViewService } from '../view.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
 
})
export class UserdetailsComponent implements OnInit {

  userList: any = [];
  displayTable: boolean = false;

  constructor(private viewService:ViewService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails()
  {
    this.viewService.getUserDetails().subscribe((response : any) => {
      this.userList = response.result;
      this.displayTable = true;
    console.log('UserList',this.userList);

})
  }

}
