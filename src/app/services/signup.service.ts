import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
  getimagesedit(id:any){
    return this.httpClient.get<any>(`http://localhost:3000/images/${id}`)
  }
  onEditByUser(id: any): Observable<any> {
    return this.httpClient.get(`http://localhost:3000/signup/${id}`)

  }

  UpdateUser(data:any){
    return this.httpClient.put<any>(`http://localhost:3000/signup/${data.id}`,data)

  }

}
