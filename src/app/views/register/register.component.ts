import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ViewService } from '../view.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  
  registerForm: any;
  registrationResponse: Object;

  constructor(private fb: FormBuilder, private viewService:ViewService ) { }

  ngOnInit() {
    
    this.clearInput();
  }

  clearInput(){
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email:['',Validators.required],
      userName:['',Validators.required],
      gender:['',Validators.required],
      password:['',Validators.required],
      passwordConfirm:['',Validators.required]
    })
  }

  get f() {return this.registerForm.controls;}

  SubmitRegistration(form){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => 
    {
      if (result.value)
       {

        let data ={
          firstName: form.value.firstName,
          lastName: form.value.lastName,
          email: form.value.email,
          userName: form.value.userName,
          gender: form.value.gender,
          password : form.value.password
        }

        console.log('datadata',data);
        
        this.viewService.submitRegistration(data).subscribe((response) => {
          this.registrationResponse = response;

          console.log('this.registrationResponse',this.registrationResponse);
          
          this.clearInput();
          
        })

        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
      }
    })
    
    
  }
  // ConfirmPassword(){
  //   if(this.f.passwordConfirm.value == this.f.password.value){
  //     this.f.passwordConfirm.invalid = false
  //   }
  //   else
  //   this.f.passwordConfirm.invalid =true;
  // }
}
