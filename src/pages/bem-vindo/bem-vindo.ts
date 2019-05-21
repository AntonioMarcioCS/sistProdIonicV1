import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import { UsuarioDTO } from '../../models/usuario.dto';
import { UsuarioService } from '../../services/domain/usuario.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-bem-vindo',
  templateUrl: 'bem-vindo.html',
})
export class BemVindoPage {

  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  
  btnSistemas(){
        this.navCtrl.setRoot('SistemasPage');
  }
  
  btnNovoSist(usuario_id: string){
        this.navCtrl.push('InsertSistemasPage');
  }
  btnPassopasso(){

  }

}
