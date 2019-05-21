import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { CriatorioDTO } from '../../models/Criatorio.dto';
import { AnimalService } from '../../services/domain/animal.service';

@IonicPage()
@Component({
  selector: 'page-insert-animal',
  templateUrl: 'insert-animal.html',
})
export class InsertAnimalPage {
  formGroup: FormGroup;
  criatorio:CriatorioDTO;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public animalService: AnimalService,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController) {
      this.formGroup = this.formBuilder.group({
        nome: ['Nome', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        raca:[],
        nascimento:[],
        tipo: ['4', [Validators.required]],
        criatorioId:[] 
      });
  }

  ionViewDidLoad() {
    let criatorio_id = this.navParams.get("criatorio_id");
    this.formGroup.controls.criatorioId.setValue(criatorio_id);
  }

  signupInserir(){
    this.animalService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {});
  }

  showInsertOk(){
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Novo animal inserido com sucesso',
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
