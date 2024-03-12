import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { SignupService } from './services/signup.service';

@NgModule({
  declarations: [ AppComponent, HelloComponent ],
  imports:      [ BrowserModule,HttpClientModule ,FormsModule,ReactiveFormsModule, ],

  bootstrap:    [ AppComponent ],
  providers:[SignupService]
})
export class AppModule { }
