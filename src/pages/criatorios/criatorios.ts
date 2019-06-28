import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CriatorioDTO } from '../../models/criatorio.dto';
import { CriatorioService } from '../../services/domain/criatorio.service';
import { SistemasService } from '../../services/domain/sistemas.service';
import { SistemaDTO } from '../../models/sistemas.dto';


@IonicPage()
@Component({
  selector: 'page-criatorios',
  templateUrl: 'criatorios.html',
})
export class CriatoriosPage {
  sistema:SistemaDTO;
  criatorios: CriatorioDTO[];
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public criatorioService: CriatorioService,
      public sistemasService: SistemasService) {
  }

  /*ionViewDidLoad() {
     
  }*/
  ionViewDidEnter(){
    this.lerDados();
  }
  lerDados(){
    let sistema_id = this.navParams.get("sistema");
    this.criatorioService.findBySistema(sistema_id)
      .subscribe(response=>{
          this.criatorios = response['content'];
      },
      error =>{});
    this.sistemasService.findById(sistema_id)
      .subscribe(response => {
        this.sistema = response;
    },
    error => {}); 
  }
  showDetalhe(criatorio_id:string){
    this.navCtrl.push('CriatorioDetalhePage',{criatorio_id: criatorio_id});
  }

  showNovoCriatorio(){
    this.navCtrl.push('InsertCriatorioPage',{sistema_id: this.sistema.id});
  }

}
