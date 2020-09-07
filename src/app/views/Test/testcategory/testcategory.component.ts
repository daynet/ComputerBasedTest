import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ViewService } from '../../view.service';

@Component({
  selector: 'app-testcategory',
  templateUrl: './testcategory.component.html',
 
})
export class TestcategoryComponent implements OnInit {
   categoryForm: any;
   displayModal: false;
   exchangeRateForm: any;


   categoryData: object;
   constructor(private fb: FormBuilder, private viewService:ViewService ) { }

  ngOnInit() {

    this.getCategoryName();
  }

  getCategoryName()
 {
    this.viewService.getCategoryName().subscribe((response) => {
      this.categoryData = response;
      console.log('categoryData',this.categoryData);
    })
 }
 submitForm(form){

 }
 createCategory()
 {

 }


}
