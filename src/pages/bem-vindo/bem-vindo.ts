import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-bem-vindo',
  templateUrl: 'bem-vindo.html',
})
export class BemVindoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BemVindoPage');
  }
  btnSistemas(){
        this.navCtrl.push('SistemasPage');
  }
  
  btnNovoSist(){

  }
  btnPassopasso(){

  }

}
