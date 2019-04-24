import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SistemasService } from '../../services/domain/sistemas.service';

/**
 * Generated class for the SisteminhasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sisteminhas',
  templateUrl: 'sisteminhas.html',
})
export class SisteminhasPage {

  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              public sistemaService: SistemasService) {
  }

  ionViewDidLoad() {
    this.sistemaService.findAll()
        .subscribe(response =>{console.log(response);})        
  }

}