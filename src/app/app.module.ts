import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  GridModule, IconService, ModalModule, ToggleModule, UIShellModule } from 'carbon-components-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import ArrowRight16 from '@carbon/icons/es/arrow--right/16';
import { HomeComponent } from './home/home.component';
import { UnityComponent } from './unity/unity.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UnityComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule,
    ToggleModule,
    FormsModule,
    UIShellModule,
    GridModule
    // HeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(protected iconService: IconService) {
    this.iconService.register(ArrowRight16);
  }
}
