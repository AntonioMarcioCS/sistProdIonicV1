import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/domain/usuario.service';
import { UsuarioDTO } from '../../models/usuario.dto';
import { SistemasService } from '../../services/domain/sistemas.service';
import { StorageService } from '../../services/storage.service';
import { getLocaleDateFormat } from '@angular/common';


@IonicPage()
@Component({
  selector: 'page-insert-sistemas',
  templateUrl: 'insert-sistemas.html',
})
export class InsertSistemasPage {

  formGroup: FormGroup;
  usuario:UsuarioDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public usuarioService: UsuarioService,
    public sistemaService: SistemasService,
    public storage: StorageService,
    
    public alertCtrl: AlertController) {
      this.formGroup = this.formBuilder.group({
        nome: ['Nome do Sistema', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        comprimento: ['em m²', [Validators.required]],
        data:[],
        largura : ['em m²', [Validators.required]],
        usuarioId:[]      
      });
    }

  ionViewDidLoad() {
      this.loadData();
  }
  loadData() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.usuarioService.findByEmail(localUser.email)
        .subscribe(response => {
          this.usuario = response as UsuarioDTO;
          this.formGroup.controls.usuarioId.setValue(this.usuario.id);
          this.formGroup.controls.data.setValue(getLocaleDateFormat);         
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        });
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }    
  }
  signupSistema(){
    this.sistemaService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {});
  }
  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}
