import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ViewService } from '../../view.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',

})
export class SignupComponent implements OnInit {

  signupForm : any;
  signupData: any;
  courseList: any = [];  
  Nationality: any = [];
  StateList: any = [];
  saturdays: any = [];
  schoolList: any = [];
  
  otpForm: any;
  displayOtp:boolean = false;
  displaySignup:boolean=true;
  displayResendOtp:boolean=false;
  displayInstruction:boolean=false;

  psid: any;
  resendOtpForm: any;
  emailValidity: boolean;
  fname:any;
  lname: any;
  email: any;

  constructor(private fb: FormBuilder, private viewService:ViewService, private router: Router) 
  { 
   

  }

  ngOnInit() {
    this.InitialiseInput();
    this.getCourses();
    this.getNationality();
     this.getState();
     this.getSaturdays();
     this.getSchool();
    
  }

  InitialiseInput(){
    this.signupForm = this.fb.group({
      levels: ['', Validators.required],
      school: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName:[''],
      mobileNumber:['',Validators.required],
      email:['',Validators.required],
      dob:['',Validators.required],
      program:['',Validators.required],
      address:['',Validators.required],
      cor:['',Validators.required],
      cityName:['',Validators.required],
      designation:['',Validators.required],
      noi:['',Validators.required],
      examDate:['',Validators.required],
      state:['',Validators.required],

    })

    this.otpForm = this.fb.group({
      otp : ['', Validators.required]
    })

    this.resendOtpForm = this.fb.group({
      phoneNumber : ['', Validators.required],
      email:['',Validators.required]
    })
  }

  get f() {return this.signupForm.controls;}
  get g() {return this.otpForm.controls;}
  get e() {return this.resendOtpForm.controls;}


  SubmitSignup(form)
  {
    //console.log('form',form);
    Swal.fire({
      title: 'Note',
      text: "You are about to save your details!!!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', 
      confirmButtonText: 'Yes!'
    }).then((result)=>
    {
      if (result.value) {
    

     let data = 
    {
     SchoolID:form.value.school,
     firstName: form.value.firstName,
     lastName: form.value.lastName,
     middleName:form.value.middleName,
     MobileNo:form.value.mobileNumber,
     email:form.value.email,
     dob:form.value.dob,
     program:form.value.program,
     cor:form.value.cor,
     city:form.value.cityName,
     designation:form.value.designation,
     noi:form.value.noi,
     address: form.value.address,
     examDate:form.value.examDate,
     state:form.value.state,
     levels:form.value.levels
    }

    console.log('data',data);
    
    this.viewService.getSignUpDetails(data).subscribe((response : any) => {
      this.signupData = response.result;
      if(response.success==true){
      this.psid = this.signupData.Psid;
      this.fname = this.signupData.FirstName;
      this.lname = this.signupData.LastName;
      this.email  = this.signupData.Email;
      console.log("SignupData", this.signupData);
      console.log("psid", this.psid);
      console.log("fname", this.fname);
      
      localStorage.setItem('psid', this.psid);
      localStorage.setItem('firstName', this.fname);
      localStorage.setItem('lastName', this.lname);
      localStorage.setItem('email', this.email);
      console.log('signupData',this.signupData);

      if(this.psid.value != 0)
  {     if (this.signupForm.valid) {
    console.log("Form Submitted!");
   this. displaySignup = false;
   //this.displayOtp = true;
   this.displayInstruction = true;

    this.signupForm.reset();    }

    else{
           Swal.fire(
       'Saved!',
       'Your record has not been saved.',
       'warning'
     )  
     this. displaySignup = true;
    }
      
      }
    }else{
      Swal.fire(
        response.message,"error"
      )  
    }
    })
    // Swal.fire(
    //   'Saved!',
    //   'Your record has been saved.',
    //   'success'
    // )
      }
    });
  }

  reset()
  {
    this.signupForm.reset();

   // this.displaySignup = false;
    //this.displayOtp = true;
  }

  getCourses()
  {
    this.viewService.getCourse().subscribe((response) => {
     this.courseList = response;
     console.log("course list", this.courseList)
    })
  }

  getState()
  {
    this.viewService.getState().subscribe((response) => {
      this.StateList = response;
      console.log("State list", this.StateList)
     })

  }

  getNationality()
  {
    this.viewService.getNationality().subscribe((response) => {
      this.Nationality = response;
      console.log("Nationality", this.Nationality)
     })
  }

  getSaturdays()
  {
    this.viewService.getSaturdays().subscribe((response) => {
      this.saturdays = response;
      console.log("Saturdays", this.saturdays)
    })
  }


  getSchool()
  {
    this.viewService.getSchools().subscribe((Response:any) => {
     this.schoolList = Response

     console.log("schoollist:", this.schoolList);

      
    })
    
  }

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

  SubmitResendOtp(form){
    let data={
      MobileNo:form.value.phoneNumber,
      Email:form.value.email
    }
    this.viewService.resendOtp(data).subscribe((response : any) => {
      if(response.success==true){
        console.log('otp successful');  
        
        this.router.navigate(['/test'],{ queryParams: { psid: this.psid } });
      }
    })
  }

}
