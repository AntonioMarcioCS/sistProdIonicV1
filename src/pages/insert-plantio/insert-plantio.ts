import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { CanteiroDTO } from '../../models/canteiro.dto';
import { CulturaDTO } from '../../models/cultura.dto';
import { CulturaService } from '../../services/domain/cultura.service';
import { PlantioService } from '../../services/domain/plantio.service';
import { getLocaleDateFormat } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-insert-plantio',
  templateUrl: 'insert-plantio.html',
})
export class InsertPlantioPage {

  formGroup: FormGroup;
  canteiro: CanteiroDTO;
  culturas: CulturaDTO[];
  cultura:CulturaDTO;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public plantioService: PlantioService,
    public culturaService:CulturaService,
    public alertCtrl: AlertController) {
      this.formGroup = this.formBuilder.group({
        nome: ['Nome do Plantio', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        data:[],
        qtd: [ ,[Validators.required]],
        canteiroId:[],
        culturaId:[, [Validators.required]] 
      });  
    }

  ionViewDidLoad() {
    let canteiro_id = this.navParams.get("canteiro_id");
    this.formGroup.controls.canteiroId.setValue(canteiro_id);
    this.formGroup.controls.data.setValue(getLocaleDateFormat);

    this.culturaService.findAll()
        .subscribe(response => {
          this.culturas = response as CulturaDTO[];
          this.formGroup.controls.culturaId.setValue(this.culturas[0].id);
        },
    error => {});
  }

  signupPlantar(){
    this.plantioService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {});
  }

  showInsertOk(){
    let canteiroId = this.navParams.get("canteiro_id");
    let sistemaId = this.navParams.get("sistema");
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Novo plantio cadastrado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            //usando o getPrevius para enviar parametro de volta através do pop
            this.navCtrl.getPrevious().data.canteiro_id = canteiroId;
            this.navCtrl.pop();          
          }
        }
      ]
    });
    alert.present();
  }
  
}
