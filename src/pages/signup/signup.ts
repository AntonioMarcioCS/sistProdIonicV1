import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/domain/usuario.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public usuarioService: UsuarioService,
    public alertCtrl: AlertController) {
      
      this.formGroup = this.formBuilder.group({
        nome: ['Poliana', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['poliana@gmail.com', [Validators.required, Validators.email]],
        tipo : ['1', [Validators.required]],
        cpf : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha : ['123', [Validators.required]]      
      });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  signupUser(){
    this.usuarioService.insert(this.formGroup.value)
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
