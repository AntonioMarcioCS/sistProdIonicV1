import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CanteiroDetalhePage } from './canteiro-detalhe';

@NgModule({
  declarations: [
    CanteiroDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(CanteiroDetalhePage),
  ],
})
export class CanteiroDetalhePageModule {}
