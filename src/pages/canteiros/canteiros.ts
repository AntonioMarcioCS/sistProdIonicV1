import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CanteiroDTO } from '../../models/canteiro.dto';
import { CanteiroService } from '../../services/domain/canteiro.service';


@IonicPage()
@Component({
  selector: 'page-canteiros',
  templateUrl: 'canteiros.html',
})
export class CanteirosPage {

  items: CanteiroDTO[];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public canteiroService: CanteiroService) {
  }

  ionViewDidLoad() {
    let sistema_id = this.navParams.get("sistema");
    this.canteiroService.findBySistema(sistema_id)
      .subscribe(response=>{
          this.items = response['content'];
      },
      error =>{});
  }
}
