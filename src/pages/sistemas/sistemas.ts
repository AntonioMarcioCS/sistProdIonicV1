import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SistemasService } from '../../services/domain/sistemas.service';
import { SistemaDTO } from '../../models/sistemas.dto';
import { CanteiroService } from '../../services/domain/canteiro.service';
import { CriatorioService } from '../../services/domain/criatorio.service';

@IonicPage()
@Component({
  selector: 'page-sistemas',
  templateUrl: 'sistemas.html'
})
export class SistemasPage {

  items: SistemaDTO[];

  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              public sistemaService: SistemasService,
              public canteiroService: CanteiroService,
              public criatorioService: CriatorioService ) {
  }

  ionViewDidLoad() {
    this.sistemaService.findAll()
      .subscribe(response => {
        this.items = response['content'];
      },
      error => {});
  }
  showCanteiros(sistema_id:string){
    this.navCtrl.push('CanteirosPage',{sistema: sistema_id});
  }
  showCriatorios(sistema_id:string){
    this.navCtrl.push('CriatoriosPage',{sistema:sistema_id});
  }
}
