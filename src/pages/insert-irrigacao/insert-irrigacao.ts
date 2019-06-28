import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { PlantioService } from '../../services/domain/plantio.service';
import { IrrigacaoService } from '../../services/domain/irrigacao.service';
import { PlantioDTO } from '../../models/plantio.dto';
import { CanteiroDTO } from '../../models/canteiro.dto';
import { IrrigacaoDTO } from '../../models/irrigacao.dto';
import { getLocaleDateFormat } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-insert-irrigacao',
  templateUrl: 'insert-irrigacao.html',
})
export class InsertIrrigacaoPage {
  
  formGroup: FormGroup;
  plantio:PlantioDTO;
  plantios:PlantioDTO[];
  canteiro:CanteiroDTO;
  irrigacoes:IrrigacaoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public plantioService: PlantioService,
    public irrigacaoService:IrrigacaoService,
    public alertCtrl: AlertController) {
      this.formGroup = this.formBuilder.group({
        data:[],
        tempo: [ ,[Validators.required]],
        plantioId:[], 
      });  
    }

  ionViewDidLoad() {
    let plantio_id = this.navParams.get("plantio");
    this.formGroup.controls.plantioId.setValue(plantio_id);
    this.formGroup.controls.data.setValue(getLocaleDateFormat);
    
    this.irrigacaoService.findByPlantio(plantio_id)
      .subscribe(response => {
        this.irrigacoes = response['content'];
      },
        error => { });
    //não tá funcioando  
    this.plantioService.find(plantio_id)
      .subscribe(response => {
         this.plantio = response['content'];
      },
        error => { });
      
  }
  
  signupIrrigar(){
    this.irrigacaoService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {});
  }

  showInsertOk(){
    let canteiroId = this.navParams.get("canteiro");
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Irrigação inserida com sucesso',
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
