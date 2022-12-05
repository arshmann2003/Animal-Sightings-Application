import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPigComponent } from './add-pig/add-pig.component';
import { AppComponent } from './app.component';
import { PidDBComponent } from './pid-db/pid-db.component';

const routes: Routes = [
  { path: 'pid-db-component', component:PidDBComponent},
  { path: 'app-component', component:AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
