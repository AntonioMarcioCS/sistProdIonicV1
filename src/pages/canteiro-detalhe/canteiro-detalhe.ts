import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Refresher } from 'ionic-angular';
import { PlantioService } from '../../services/domain/plantio.service';
import { PlantioDTO } from '../../models/plantio.dto';
import { CanteiroService } from '../../services/domain/canteiro.service';
import { CanteiroDTO } from '../../models/canteiro.dto';
import { IrrigacaoService } from '../../services/domain/irrigacao.service';

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
    public irrigacaoService: IrrigacaoService,
    public loadingControl: LoadingController) {
  }

  ionViewDidEnter(){
    this.lerDados();
  }

  lerDados() {
    let canteiro_id = this.navParams.get('canteiro_id');
    let carregando = this.presentLoading();
    this.plantioService.findByCanteiro(canteiro_id)
      .subscribe(response => {
        this.plantios = response['content'];
        carregando.dismiss();

      },
        error => { });

    this.canteiroService.findById(canteiro_id)
      .subscribe(response => {
        this.canteiro = response;
      },
        error => { });
 
  }

  showPlantar(canteiro_id: string) {
    this.navCtrl.push('InsertPlantioPage', { canteiro_id: canteiro_id, sistema: this.canteiro.sistemaId });
  }

  showIrrigar(plantio_id:string){
    this.navCtrl.push('InsertIrrigacaoPage', { plantio: plantio_id, canteiro: this.canteiro.id });
  }
  showFertilizar(plantio_id:string){
    this.navCtrl.push('InsertFertilizacaoPage', { plantio: plantio_id, canteiro: this.canteiro.id });
  }
  showColheita(plantio_id:string, cultura_id:number, qtd:string){
    this.navCtrl.push('InsertColheitaPage', {plantio: plantio_id, canteiro: this.canteiro.id, cultura: cultura_id, quantidade:qtd});
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
