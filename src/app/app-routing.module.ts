import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageComponent} from './page/page.component';
import {NewTranslateComponent} from './new-translate/new-translate.component';

const routes: Routes = [
  {path: '', component: PageComponent},
  {path: 'new', component: NewTranslateComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
