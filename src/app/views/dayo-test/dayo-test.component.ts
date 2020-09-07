import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ViewService } from '../view.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dayo-test',
  templateUrl: './dayo-test.component.html',

})
export class DayoTestComponent implements OnInit {

  examForm: any;
  examSearch: boolean = true;
  resultList: any;  
  displayReport: boolean;
  displayTestReport: boolean;
  reportSrc: SafeResourceUrl;
  psid: any;
  toggleResult: boolean = true;
 


  constructor(private fb: FormBuilder, private viewService:ViewService, private sanitizer: DomSanitizer) { }

  ngOnInit() {

   // this.psid = localStorage.getItem('psid');
  this.ValidateResult();
  }

  ValidateResult()
  {
    this.examForm = this.fb.group({
      psid: ['', Validators.required]
      
    })
  }

  

  get f() {return this.examForm.controls;}


  getresult()
  {
    if(this.psid != null)
    {
    let path = '';
    this.displayReport = false;
    this.displayTestReport = false;
    this.viewService.getscoresheet(this.psid).subscribe((response : any) => {
      path = response.result;
     
    // window.open(path, '_blank')
     this.reportSrc = this.sanitizer.bypassSecurityTrustResourceUrl(path)
     this.examSearch = false;
    this.displayTestReport = true;
    console.log("ReportSource", this.reportSrc)
    // window.open(this.reportSrc.toString(), '_blank')
     this.toggleResult = false;
    });
    this.displayReport = true;
    return;
  }
  }

  reset()
  {
    this.examForm.reset();
  }
  public validateinput(event: any) {
    //console.log(event.target.value);
    const pattern = /^[0-9]*$/;   
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/, "");
      // invalid character, prevent input

    }
  }


  getResult(form)
  {
    this.psid = form.value.psid;
    if(  this.psid != null)
    {
    let path = '';
    this.displayReport = false;
    this.displayTestReport = false;
    this.viewService.getscoresheet(this.psid).subscribe((response : any) => {
      path = response.result;
     
    // window.open(path, '_blank')
     this.reportSrc = this.sanitizer.bypassSecurityTrustResourceUrl(path)
    
     this.examSearch = false;
    this.displayTestReport = true;
    console.log("ReportSource", this.reportSrc)
    // window.open(this.reportSrc.toString(), '_blank')
     this.toggleResult = false;
    });
    this.displayReport = true;
    return;
  }

  }


}
