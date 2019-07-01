import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { PlantioService } from '../../services/domain/plantio.service';
import { ColheitaService } from '../../services/domain/colheita.service';
import { PlantioDTO } from '../../models/plantio.dto';
import { CanteiroDTO } from '../../models/canteiro.dto';
import { ColheitaDTO } from '../../models/colheita.dto';
import { getLocaleDateFormat } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-insert-colheita',
  templateUrl: 'insert-colheita.html',
})
export class InsertColheitaPage {
  
  formGroup: FormGroup;
  plantio:PlantioDTO;
  novoPlantio:PlantioDTO;
  plantios:PlantioDTO[];
  canteiro:CanteiroDTO; 
  colheitas:ColheitaDTO[];
  minNum = 1;
  maxNum = this.navParams.get("quantidade");

  constructor(
      
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public plantioService: PlantioService,
    public colheitaService:ColheitaService,
    public alertCtrl: AlertController) {
      //let maxNum = this.navParams.get("quantidade");
      this.formGroup = this.formBuilder.group({
        data:[],
        qtd: [ ,Validators.compose([Validators.min(this.minNum),Validators.max(this.maxNum),Validators.required])],
        plantioId:[], 
      });  
    }

  ionViewDidLoad() {
    let plantio_id = this.navParams.get("plantio");
    let canteiro_id = this.navParams.get("canteiro");
    let cultura_id = this.navParams.get("cultura");
    this.formGroup.controls.plantioId.setValue(plantio_id);
    this.formGroup.controls.data.setValue(getLocaleDateFormat);
    
    this.colheitaService.findByPlantio(plantio_id)
      .subscribe(response => {
        this.colheitas = response['content'];
      },
        error => { });
    
    this.plantioService.find(plantio_id)
      .subscribe(response => {
        //plantio do backend não vem com canteiroId e culturaId, por isto estou preenchendo através de parametros
        this.plantio = response;
        this.plantio.canteiroId=canteiro_id;
        this.plantio.culturaId=cultura_id;
      },
        error => { });
  }
  
  signupColher(){
    this.colheitaService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {});
    
    this.novoPlantio = this.plantio;
    let novaQtd = this.plantio.qtd - this.formGroup.controls.qtd.value;
    this.novoPlantio.qtd = novaQtd; 
    
    this.plantioService.update(this.novoPlantio, this.novoPlantio.id)
      .subscribe(response=>{    
      },
      error =>{});  
  }

  showInsertOk(){
    let canteiro_id = this.navParams.get("canteiro");
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Colheita realizada com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            //usando o getPrevius para enviar parametro de volta através do pop
            this.navCtrl.getPrevious().data.canteiro_id = canteiro_id;
            this.navCtrl.pop();          
          }
        }
      ]
    });
    alert.present();
  }  
}
