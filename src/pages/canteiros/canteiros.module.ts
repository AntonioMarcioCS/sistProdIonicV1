import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CanteirosPage } from './canteiros';

@NgModule({
  declarations: [
    CanteirosPage,
  ],
  imports: [
    IonicPageModule.forChild(CanteirosPage),
  ],
})
export class CanteirosPageModule {}
