import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsertAnimalPage } from './insert-animal';

@NgModule({
  declarations: [
    InsertAnimalPage,
  ],
  imports: [
    IonicPageModule.forChild(InsertAnimalPage),
  ],
})
export class InsertAnimalPageModule {}
