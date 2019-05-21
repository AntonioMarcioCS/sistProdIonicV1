import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CriatorioService } from '../../services/domain/criatorio.service';
import { AnimalService } from '../../services/domain/animal.service';
import { CriatorioDTO } from '../../models/Criatorio.dto';
import { AnimalDTO } from '../../models/animal.dto';

@IonicPage()
@Component({
  selector: 'page-criatorio-detalhe',
  templateUrl: 'criatorio-detalhe.html',
})
export class CriatorioDetalhePage {
  
  criatorio: CriatorioDTO;
  animais:AnimalDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public criatorioService: CriatorioService,
    public animalService:AnimalService) {
  }

  ionViewDidLoad() {
    let criatorio_id = this.navParams.get('criatorio_id');
    this.animalService.findByCriatorio(criatorio_id)
      .subscribe(response => {
        this.animais = response['content'];
    },
    error => {});

    this.criatorioService.findById(criatorio_id)
      .subscribe(response => {
      this.criatorio = response;
    },
    error => {});
  }
  showAnimal(id:string){
    this.navCtrl.push('AnimalPage',{id: id});
  }
  
  showAdicionar(criatorio_id:string){
    this.navCtrl.push('InsertAnimalPage',{criatorio_id: criatorio_id});
  }

}
