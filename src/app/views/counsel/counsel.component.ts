import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ViewService } from '../view.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { routes } from '../../app.routing';

@Component({
  selector: 'app-counsel',
  templateUrl: './counsel.component.html',

})
export class CounselComponent implements OnInit {

  counselForm: any;
  counselling:boolean= true;
  chkContacted: boolean = false;

  constructor(private fb: FormBuilder, private viewService: ViewService, private router: Router) { }

  ngOnInit() {
    this.ValidateResult();
  }

  ValidateResult()
  {
    this.counselForm = this.fb.group({
      psid: ['', Validators.required],
      counselId: ['', Validators.required],
      chkContacted: ['', Validators.required]

      
    })
  }

  get f() {return this.counselForm.controls;}


  public validateinput(event: any) {
    //console.log(event.target.value);
    const pattern = /^[0-9]*$/;   
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/, "");
      // invalid character, prevent input

    }
  }


  saveResult(form)
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
      }).then((result) => {
        if (result.value) {
          let data =
          {
            psid: form.value.psid,
            isCounsel: form.value.counselId,
            isContact: form.value.chkContacted
           
           // LogedBy: localStorage.getItem('username')
          }
  
          console.log('data', data);
  
          this.viewService.updateCounsel(data).subscribe((response: any) => {
            if (response.success == true) {
  
              if (true) {
               
                Swal.fire(
                  'Saved!',
                  response.message,
                  'warning'
                ).then((result)=>{   this.router.navigate(['/dashboard'])})
              }
            } else {
              Swal.fire(
                response.message, "error"
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
  


}
