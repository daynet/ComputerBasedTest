import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import Swal from 'sweetalert2'
import { ViewService } from '../view.service';

@Component({
  selector: 'app-question-setup',
  templateUrl: './question-setup.component.html',
  //styleUrls: ['./question-setup.component.scss']
})
export class QuestionSetupComponent implements OnInit {
  questionTypeFG: any;
  reponse: any;
  showQuestionInput:boolean = false;
  showQuestionTable:boolean = true;
  questionReponse: any;
  questionList: any = [];
  testCategoryList: any;

  constructor(private fb: FormBuilder, private viewService: ViewService,
    private router: Router) { }



  ngOnInit() {
    this.InitLoginForm();
    this.GetQuestions();
    this.GetTestCategory();
    this. GetTestQuestions();
  }

  get f() {return this.questionTypeFG.controls;}

  InitLoginForm() {
    this.questionTypeFG = this.fb.group({
      question: ['', Validators.required],
     // quetionOptionName : ['',Validators.required],
      optionA:['',Validators.required],
      optionB:['',Validators.required],
      testCategoryId :['',Validators.required]
    })
  }


  AddQuestion(form){
    let data = {
      question:form.value.question,
     // quetionOptionName:form.value.quetionOptionName,
     optionA:form.value.optionA,
     optionB:form.value.optionB,
     testCategoryId: form.value.testCategoryId
    }

    console.log('data',data);
    

    this.viewService.AddQuestion(data).subscribe((response) => {
      this.reponse = response;

      // console.log('this.loginResponse',this.reponse);
      // if(response.result==true)
      this.InitLoginForm();
      Swal.fire('Saved Successfully!')
      
    })
  }

  GetTestCategory(){
    this.viewService.GetTestCategory().subscribe((response : any) => {
      this.testCategoryList = response.result;
console.log('this.testCategoryList',this.testCategoryList);

    })
  }

  GetQuestions()
  {
    this.viewService.GetQuestions().subscribe((response : any) => {
      this.questionList = response.result;
      this.GetQuestions();
    })
  }
  GetTestQuestions()
  {
    this.viewService.GetTestQuestions().subscribe((response : any) => {
      this.questionList = response.result;
      this.GetQuestions();
    })
  }

  DeleteQuestion(row){


console.log('row',row);

  }
}
