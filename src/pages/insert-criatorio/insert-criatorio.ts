import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SistemaDTO } from '../../models/sistemas.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SistemasService } from '../../services/domain/sistemas.service';
import { CriatorioService } from '../../services/domain/criatorio.service';

@IonicPage()
@Component({
  selector: 'page-insert-criatorio',
  templateUrl: 'insert-criatorio.html',
})
export class InsertCriatorioPage {
  formGroup: FormGroup;
  sistema: SistemaDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public sistemasService: SistemasService,
    public criatorioService: CriatorioService,
    public alertCtrl: AlertController) {
      this.formGroup = this.formBuilder.group({
        nome: ['Nome do Criatório', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        tipo:[],
        comprimento: ['em m²', [Validators.required]],
        largura : ['em m²', [Validators.required]],
        profundidade : ['em m²', [Validators.required]],
        sistemaId:[]      
      });
  }

  ionViewDidLoad() {
    let sistema_id = this.navParams.get("sistema_id");
    this.formGroup.controls.sistemaId.setValue(sistema_id);
   
    this.sistemasService.findById(sistema_id)
    .subscribe(response=>{
        this.sistema = response;
    },
    error =>{});
  }
  novoCriatorio(){
    this.criatorioService.insert(this.formGroup.value)
    .subscribe(response => {
      this.showInsertOk();
    },
    error => {});
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Novo Criatório adicionado ao sistema',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.getPrevious().data.sistema = this.sistema.id;
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}
