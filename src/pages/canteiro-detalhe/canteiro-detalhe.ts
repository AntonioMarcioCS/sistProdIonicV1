import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
    public plantioService: PlantioService,
    public loadingControl: LoadingController) {
  }

  ionViewDidLoad() {
    this.lerDados();
  }

  lerDados(){
    let canteiro_id = this.navParams.get('canteiro_id');
    let carregando = this.presentLoading();
    this.plantioService.findByCanteiro(canteiro_id)
      .subscribe(response => {
        this.plantios = response['content'];
        carregando.dismiss();
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

  presentLoading() {
    let carregando = this.loadingControl.create({
      content: 'Carregando...',
    });
    carregando.present();
    return carregando;
  }

  doRefresh(refresher) {
    this.lerDados;
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }


}
