import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlantioService } from '../../services/domain/plantio.service';
import { PlantioDTO } from '../../models/plantio.dto';
import { CanteiroService } from '../../services/domain/canteiro.service';
import { CanteiroDTO } from '../../models/canteiro.dto';

@IonicPage()
@Component({
  selector: 'page-canteiro-detalhe',
  templateUrl: 'canteiro-detalhe.html',
})
export class CanteiroDetalhePage {

  
  plantios: PlantioDTO[];
  canteiro: CanteiroDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public canteiroService: CanteiroService,
    public plantioService: PlantioService) {
  }

  ionViewDidLoad() {
    let canteiro_id = this.navParams.get('canteiro_id');

    this.plantioService.findByCanteiro(canteiro_id)
      .subscribe(response => {
        this.plantios = response['content'];
    },
    error => {});
    
    this.canteiroService.findById(canteiro_id)
      .subscribe(response => {
      this.canteiro = response;
    },
    error => {});

  }

  showPlantio(id:string){
    this.navCtrl.push('PlantioPage',{id: id});
  }
  
  showPlantar(canteiro_id:string){
    this.navCtrl.push('InsertPlantioPage',{canteiro_id: canteiro_id});
  }
}
