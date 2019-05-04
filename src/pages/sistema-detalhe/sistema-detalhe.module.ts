import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SistemaDetalhePage } from './sistema-detalhe';

@NgModule({
  declarations: [
    SistemaDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(SistemaDetalhePage),
  ],
})
export class SistemaDetalhePageModule {}
