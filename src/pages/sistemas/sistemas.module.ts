import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SistemasPage } from './sistemas';
import { CanteiroService } from '../../services/domain/canteiro.service';
import { CriatorioService } from '../../services/domain/criatorio.service';

@NgModule({
  declarations: [
    SistemasPage,
  ],
  imports: [
    IonicPageModule.forChild(SistemasPage),
  ],
  providers:[
    CanteiroService,
    CriatorioService
  ]
})
export class SistemasPageModule {}
