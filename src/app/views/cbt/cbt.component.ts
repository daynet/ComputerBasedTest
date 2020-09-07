import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewService } from '../view.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { CountdownComponent } from 'ngx-countdown';

@Component({
  selector: 'app-cbt',
  templateUrl: './cbt.component.html',
 // styleUrls: ['./cbt.component.scss']
})
export class CbtComponent implements OnInit {
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  testList: any;
  optionA: any;
  optionB: any;
  question: any;
  index: number=0;
  index1: number = 1;
  index2: number = 1;
  disabledNext: boolean =false;
  disabledPrevious: boolean =false;
  reponse: any;
  optionBControl:any;
  answer: any;
  psid: any;
  testCategoryId: any;
  questionBankId: any;
  testResultId: any;
  altAnswer: any;
  testListIndex: number = 0;
  inputForm: any;
  pagination: any;
  firstName: any;
  lastName: any;
  email: any;
  counter = 1800;
  list: any[] = []
  //counter = 60;

  displayCounter:string;

  constructor(private fb: FormBuilder ,private viewService : ViewService, private router:Router) { }

  ngOnInit() {
 this.psid = localStorage.getItem('psid');
 this.firstName = localStorage.getItem('firstName');
 this.lastName = localStorage.getItem('lastName');
 this.email = localStorage.getItem('email');

 
    this.GetTestQuestions();
console.log('this.optionA',this.optionA);

this.createInput();
  }

  createInput(){
    this.inputForm =this.fb.group({
      optionControl : [''],
      //optionBControl : ['']      
    });
  }

  GetTestQuestions(){
    
    this.viewService.GetTestQuestions().subscribe((response : any) => {
      
      this.testList = response.result;

      this.pagination = '(' + this.index1 + ')' + '  ' +  'of' + '  ' + '(' + this.testList.length + ')';

      this.optionA = this.testList[this.index].optionA;
      this.optionB = this.testList[this.index].optionB;
      this.question =this.testList[this.index].optionB;

      this.testCategoryId = this.testList[this.index].testCategoryId ;
      this.questionBankId =this.testList[this.index].questionBankId;

      this.startCountdown();
      
    })
  }

  Next(){
    if((this.answer != null && this.answer!='') || (this.altAnswer != null && this.altAnswer!='') ){

     
       /*  let data ={
          psid: this.psid,
          testCategoryId:this.testCategoryId,
          questionBankId: this.questionBankId,
          testResultId : this.testResultId,
          answer : this.answer,
          altAnswer : this.altAnswer,
        } */

        
      /* this.list.push({
        psid: this.psid,
        testCategoryId: this.testCategoryId,
        questionBankId: this.questionBankId,
        testResultId: this.testResultId,
        answer: this.answer,
        altAnswer: this.altAnswer,
      }); */

      console.log(' this.list', this.list);
        /* this.viewService.AddResult(data).subscribe((response : any) => {
         let reponse = response.success;
          if(reponse==true){
            this.testResultId = response.result;
            this.testResultId +=1;
            console.log("displayCounter:", this.displayCounter); */
            
            if((this.index  == this.testList.length -1 ) || (this.displayCounter == "0:0")){

              if(this.displayCounter == "0:0")
                       {
              Swal.fire(
                'Time up!!! You have successfully completed your test.',
                'Your Exam ID is'+ ' '+ '<b>'+this.psid + '</b>'+'  ' + '.keep it safe!!!  Kindly call 08035678244 for your result details',
                'success'
              )
                       }
                       else{

              Swal.fire(
                'Congratulations!!! You have successfully completed your test.',
                'Your Exam ID is'+ ' '+ '<b>'+this.psid + '</b>'+'  ' + '.keep it safe!!!  Kindly call 08035678244 for your result details',
                'success'
              )
              }
              this.viewService.AddResult(this.list).subscribe((response: any) => {
                let reponse = response.success;
                if (reponse == true) {
                  this.testResultId = response.result;
                  this.testResultId += 1;
                 // console.log("displayCounter:", this.displayCounter);
                }
        
              })

          

              let Mail = {
                firstName: this.firstName,
                lastName: this.lastName,
                 email: this.email,
                 psid: this.psid


              }

              this.viewService.getSendMail(Mail).subscribe((response: any)=>
              {
                let res = response.result;
                console.log("mail response", res);
              })
      
              this.router.navigate(['/thankyou']);
              localStorage.removeItem('psid');
              localStorage.removeItem('token');
              
              this.disabledNext = true;
              this.disabledPrevious = true;

            }
            else{
              
              this.optionA = this.testList[this.index].optionA;
              this.optionB = this.testList[this.index].optionB;
              this.question =this.testList[this.index].question;
              this.questionBankId = this.testList[this.index].questionBankId;
              this.testCategoryId = this.testList[this.index].testCategoryId;


              this.list.push({
                psid: this.psid,
                testCategoryId: this.testCategoryId,
                questionBankId: this.questionBankId,
                testResultId: this.testResultId,
                answer: this.answer,
                altAnswer: this.altAnswer,
              });
             
            this.inputForm.reset();
            }
        //  }
  

      //  })
        
           
      
      this.index = this.index + 1; 
      this.answer=null;
      this.altAnswer=null;

      this.index2 += 1;

      this.pagination = '(' + this.index2  +')' + '  ' +  'of' + '  ' + '(' + this.testList.length  +')';

      
    } 
    
  }
  
  Previous(){
    
    this.index = this.index - 1;

    if(this.index = -1){
      this.disabledPrevious = true;
      this.disabledNext = false;
    }else{

      this.viewService.GetTestResult(this.testResultId).subscribe((response : any) => {
        let reponse = response.result;
         
        this.viewService.GetQuestion(reponse.questionBankId).subscribe((resp : any) => {
          
          let result = resp.result 
          
          if(result != null && result != undefined){
            this.testResultId = response.result;
             this.optionA = result.optionA;
             this.optionB = result.optionB;
             this.question =result.optionB;

             if(reponse.answer == 'X')
             {
               
              this.optionA.checked = true;
          
             }else{
              this.optionB.checked = true;
             }
         }
        })
       })
    }
  }

  AddResult(d){
    let data ={
      answer :this.answer,
      psid : d.psid,
      questionBankId : d.questionBankId,
      testCategoryId : d.testCategoryId
    }

    console.log('data data ',data);
    
    this.viewService.GetTestResult(data).subscribe((response) => {
      this.reponse = response;
    })
  }

  GetPreviousResult(testResultId){
    this.viewService.GetPreviousResult(testResultId).subscribe((response) => {
      this.reponse = response;
    })
  }

  handleAChange(event){

    this.answer = 'X'
    this.altAnswer =null
    
  }

  handleBChange(event){
    this.answer = null
    this.altAnswer ='X'
  }

  //  timer code starts here

  startCountdown()
  {
 
    if(this.counter > 0 )
    {
      this.counter = this.counter;

      this.doCountdown();
    }
  }

  doCountdown()
  { 
   
    setTimeout(()=>
    {
      
      this.displayCounter = this.convertToSeconds(this.counter - 1);
      this.counter--;
      this.processCount();
    },1000)
             
  }

  processCount()
  {
    console.log("counter is:", this.counter);


    if(this.counter == 0)
    {
      //Emmit
      console.log("-------------counter ends --------------")   
     }
  else{
      this.doCountdown();
  }
    }

 convertToSeconds(s)
 {
   var min = Math.floor(s/60);

   var sec = s % 60 ;

   return min + ':' + sec;

 }



  
}
