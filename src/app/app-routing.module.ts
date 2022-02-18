import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UnityComponent } from './unity/unity.component';

const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'unity',component: UnityComponent}
// {path: 'home',component: HomeComponent},
// {path: '', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
