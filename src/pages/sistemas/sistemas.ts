import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SistemasService } from '../../services/domain/sistemas.service';
import { SistemaDTO } from '../../models/sistemas.dto';

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
              public sistemaService: SistemasService) {
  }

  ionViewDidLoad() {
    this.sistemaService.findAll()
      .subscribe(response => {
        this.items = response['content'];
      },
      error => {});
  }
}
