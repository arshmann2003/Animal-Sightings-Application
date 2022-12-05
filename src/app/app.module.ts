import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; // CLI imports AppRoutingModule


import { AppComponent } from './app.component';
import { AddPigComponent } from './add-pig/add-pig.component';
import { FormComponent } from './form/form.component';
import { PidDBComponent } from './pid-db/pid-db.component';


@NgModule({
  declarations: [
    AppComponent,
    AddPigComponent,
    FormComponent,
    PidDBComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
