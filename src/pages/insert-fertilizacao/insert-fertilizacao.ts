import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlantioDTO } from '../../models/plantio.dto';
import { CanteiroDTO } from '../../models/canteiro.dto';
import { PlantioService } from '../../services/domain/plantio.service';
import { FertilizanteDTO } from '../../models/fertilizante.dto';
import { FertilizanteService } from '../../services/domain/fertilizante.service';
import { getLocaleDateFormat } from '@angular/common';


@IonicPage()
@Component({
  selector: 'page-insert-fertilizacao',
  templateUrl: 'insert-fertilizacao.html',
})
export class InsertFertilizacaoPage {
  formGroup: FormGroup;
  plantio:PlantioDTO;
  plantios:PlantioDTO[];
  canteiro:CanteiroDTO;
  fertilizacoes:FertilizanteDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public plantioService: PlantioService,
    public fertilizanteService:FertilizanteService,
    public alertCtrl: AlertController) {
      this.formGroup = this.formBuilder.group({
        data:[],
        descricao: [ ,[Validators.required]],
        qtd:[ ,[Validators.required]],
        plantioId:[], 
      });  
    }

  ionViewDidLoad() {
    let plantio_id = this.navParams.get("plantio");
    this.formGroup.controls.plantioId.setValue(plantio_id);
    this.formGroup.controls.data.setValue(getLocaleDateFormat);
    
    this.fertilizanteService.findByPlantio(plantio_id)
      .subscribe(response => {
        this.fertilizacoes = response['content'];
      },
        error => { });
    
    //não tá funcioando  
    this.plantioService.find(plantio_id)
      .subscribe(response => {
         this.plantio = response['content'];
      },
        error => { });
  }
  signupFertilizar(){
    this.fertilizanteService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {});
  }

  showInsertOk(){
    let canteiroId = this.navParams.get("canteiro");
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Fertilização inserida com sucesso',
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
