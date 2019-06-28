import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CanteiroDTO } from '../../models/canteiro.dto';
import { CanteiroService } from '../../services/domain/canteiro.service';
import { SistemaDTO } from '../../models/sistemas.dto';
import { SistemasService } from '../../services/domain/sistemas.service';


@IonicPage()
@Component({
  selector: 'page-canteiros',
  templateUrl: 'canteiros.html',
})
export class CanteirosPage {

  sistema: SistemaDTO;
  canteiros: CanteiroDTO[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public canteiroService: CanteiroService,
    public sistemasService: SistemasService) {
  }

  /*ionViewDidLoad() {
    this.lerDados();
  }*/
  ionViewDidEnter(){
    this.lerDados();
  }

  lerDados(){
    let sistema_id = this.navParams.get("sistema");
    this.canteiroService.findBySistema(sistema_id)
      .subscribe(response => {
        this.canteiros = response['content'];
      },
        error => { });

    this.sistemasService.findById(sistema_id)
      .subscribe(response => {
        this.sistema = response;
      },
        error => { });
  }

  showDetalhe(canteiro_id: string) {
    this.navCtrl.push('CanteiroDetalhePage', { canteiro_id: canteiro_id });
  }

  showNovoCanteiro() {
    this.navCtrl.push('InsertCanteiroPage', { sistema_id: this.sistema.id });
  }
}
