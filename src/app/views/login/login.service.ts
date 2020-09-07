import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppCongifService } from '../../Config/app-congif.service';

//let AppConstant: any = "http://localhost:50038/api/v1/";
let AppConstant: any = "http://localhost:50560/api/v1/";

//let AppConstant: any = "http://172.16.12.15/AptitudeTest/api/v1/";
 //let AppConstant: any = "http://172.16.12.1/AptitudeTest/api/v1/";



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,private appConfig: AppCongifService) { 
   //AppConstant = appConfig;
  }

  login(data) {
    return this.http.post(`${AppConstant}login`,data);
  }

  
}