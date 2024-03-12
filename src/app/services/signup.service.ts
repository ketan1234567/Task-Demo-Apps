import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient: HttpClient) { }
  userSignUp(data: any) {
    this.httpClient.post('http://localhost:3000/signup', data,{ observe: 'response'})
    .subscribe((result) => {  
        // this.router.navigate(['seller-home']);
        console.log(result);
      });
 
  }

  getSignupUser(){
    return this.httpClient.get<any>('http://localhost:3000/signup')
  }
  getimages(){
    return this.httpClient.get<any>('http://localhost:3000/images')
  }
}
