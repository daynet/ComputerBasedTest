import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ViewService } from '../view.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-schoolsetup',
  templateUrl: './schoolsetup.component.html',
  styleUrls: ['./schoolsetup.component.scss']
})
export class SchoolsetupComponent implements OnInit {

  SchoolForm:any;
  constructor(private fb: FormBuilder, private viewService: ViewService, private router: Router) { }

  ngOnInit() {
   this.ValidateResult();
  }

  ValidateResult()
  {
    this.SchoolForm = this.fb.group({
      schoolName: ['', Validators.required]  
    })
  }


  get f() {return this.SchoolForm.controls;}


  saveResult(form)
  {
 
      //console.log('form',form);
      Swal.fire({
        title: 'Note',
        text: "You are about to create the school!!!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.value) {
          let data =
          {
            SchoolName: form.value.schoolName

          }
  
          console.log('data', data);
  
          this.viewService.createSchool(data).subscribe((response: any) => {
            if (response.success == true) {
  
              if (true) {
               
                Swal.fire(
                  'Saved!',
                  response.message,
                  'warning'
                ) 
              }
            } else {
              Swal.fire(
                response.message, "error"
              )
            }

            this.router.navigate(['/dashboard']);
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
