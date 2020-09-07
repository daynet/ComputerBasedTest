import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',

})
export class TimerComponent implements OnInit {
   counter = 1200;

   displayCounter:string;

  timer:any  =0;
  constructor() { }

  ngOnInit() {
    this.startCountdown();
  }


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
