import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ViewService } from '../view.service';
import { Router, ActivatedRoute } from '@angular/router';
//import { timingSafeEqual } from 'crypto';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-internalstudent',
  templateUrl: './internalstudent.component.html',

})
export class InternalstudentComponent implements OnInit {

  username: any;
  /* firstname: any;
  lastname: any;
  email:any; */
  lmsDetails: any;
  psid: any;
  fname: any;
  lname: any;
  email: any
  otpForm: any;
  displayOtp:boolean = false;
  displayInstruction:boolean=false;


  constructor(private fb: FormBuilder, private viewService: ViewService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.otpForm = this.fb.group({
      otp : ['', Validators.required]
    })
    let details = null;
    console.log('this.route.snapshot',this.route.snapshot);
    const url = window.location.href;
    this.route.queryParamMap.subscribe(queryParams => {
      this.username = queryParams.get("userName");
      this.fname = queryParams.get("firstName");
      this.lname = queryParams.get("lastname");
      this.email = queryParams.get("email");

  })
  this.getLMSdetails();
  }


 getLMSdetails()
 {
   let data = {
   
       username: this.username,
       firstname: this.fname,
       lastname: this.lname,
       email: this.email,
   }

   this.viewService.getLMSDetails(data).subscribe((response:any) => {
     this.lmsDetails = response.result;

     if(response.success==true){
      
      this.username = this.lmsDetails.userName;
      this.psid = this.lmsDetails.Psid;
      this.fname = this.lmsDetails.FirstName;
      this.lname = this.lmsDetails.LastName;
      this.email  = this.lmsDetails.Email;

      console.log('fname', this.fname);


      localStorage.setItem('psid', this.psid);
      localStorage.setItem('firstName', this.fname);
      localStorage.setItem('lastName', this.lname);
      localStorage.setItem('email', this.email);

      this.displayOtp = true
     }
     else
     {
      Swal.fire(
        response.message,"Warning!!!"
      )  
     }
   })

   

 }
 

 get g() {return this.otpForm.controls;}

 SubmitOtp(form){

  let data ={
    otp : form.value.otp,
    Psid : this.psid
  }

  console.log('data', data);
  
  this.viewService.validateOtp(data).subscribe((response : any) => {
    if(response.success==true){
      console.log('otp successful');  
      this.displayOtp = false;
      this.displayInstruction = true;
    //  this.router.navigate(['/test']);
      
      //this.router.navigate(['/test',this.signupData]);
    }
    else{
      Swal.fire(
        'Saved!',
        response.message,
        'warning'
      )  

    }
  })
}

start()
{
  this.router.navigate(['/test']);
}

}
