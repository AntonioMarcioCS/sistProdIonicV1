import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SistemaDTO } from '../../models/sistemas.dto';
import { CanteiroService } from '../../services/domain/canteiro.service';
import { CriatorioService } from '../../services/domain/criatorio.service';
import { SistemasService } from '../../services/domain/sistemas.service';

@IonicPage()
@Component({
  selector: 'page-sistema-detalhe',
  templateUrl: 'sistema-detalhe.html',
})
export class SistemaDetalhePage {

  item:SistemaDTO;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public canteiroService: CanteiroService,
    public criatorioService: CriatorioService,
    public sistemasService: SistemasService ) {
  }

  ionViewDidLoad() {
    let sistema_id = this.navParams.get('sistema');
    
    this.sistemasService.findById(sistema_id)
      .subscribe(response => {
      this.item = response;
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
