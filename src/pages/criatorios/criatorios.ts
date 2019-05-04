import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CriatorioDTO } from '../../models/criatorio.dto';
import { CriatorioService } from '../../services/domain/criatorio.service';


@IonicPage()
@Component({
  selector: 'page-criatorios',
  templateUrl: 'criatorios.html',
})
export class CriatoriosPage {
  
  items: CriatorioDTO[];
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public criatorioService: CriatorioService) {
  }

  ionViewDidLoad() {
    let sistema_id = this.navParams.get("sistema");
    this.criatorioService.findBySistema(sistema_id)
      .subscribe(response=>{
          this.items = response['content'];
      },
      error =>{});
  }

}
