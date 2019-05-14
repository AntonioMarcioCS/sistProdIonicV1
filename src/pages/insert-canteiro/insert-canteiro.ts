import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SistemasService } from '../../services/domain/sistemas.service';
import { SistemaDTO } from '../../models/sistemas.dto';
import { CanteiroService } from '../../services/domain/canteiro.service';

@IonicPage()
@Component({
  selector: 'page-insert-canteiro',
  templateUrl: 'insert-canteiro.html',
})

export class InsertCanteiroPage {
  
  formGroup: FormGroup;
  sistema: SistemaDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public sistemasService: SistemasService,
    public canteiroService: CanteiroService,
    public alertCtrl: AlertController) {
      this.formGroup = this.formBuilder.group({
        nome: ['Nome do Canteiro', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        comprimento: ['em m²', [Validators.required]],
        largura : ['em m²', [Validators.required]],
        sistemaId:[]      
      });  
  }

  ionViewDidLoad() {
    let sistema_id = this.navParams.get("sistema_id");
    this.formGroup.controls.sistemaId.setValue(sistema_id);
    //Usando apenas para mostrar o nome do sistema:
    this.sistemasService.findById(sistema_id)
    .subscribe(response=>{
        this.sistema = response;
    },
    error =>{});

  }
  
  novoCanteiro(){
    this.canteiroService.insert(this.formGroup.value)
    .subscribe(response => {
      this.showInsertOk();
    },
    error => {});
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Novo Canteiro adicionado ao sistema',
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
