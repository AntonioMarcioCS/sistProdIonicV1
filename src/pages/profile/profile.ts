import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { UsuarioDTO } from '../../models/usuario.dto';
import { UsuarioService } from '../../services/domain/usuario.service';
import { API_CONFIG } from '../../config/api.config';



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  usuario:UsuarioDTO;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: StorageService,
    public usuarioService: UsuarioService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
        this.usuarioService.findByEmail(localUser.email).subscribe(
          response =>{
            this.usuario=response;
            //busca imagem
          },error=>{
            if(error.status == 403){
              this.navCtrl.setRoot('HomePage');    
            }

          });
    }
    else{
      this.navCtrl.setRoot('HomePage');
    }
  }
  getImageIfExists() {
    this.usuarioService.getImageFromBucket(this.usuario.id)
    .subscribe(response => {
      this.usuario.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.usuario.id}.jpg`;
      //this.blobToDataURL(response).then(dataUrl => {
        //let str : string = dataUrl as string;
        //this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str);
      },
    error => {
      //this.profileImage = 'assets/imgs/avatar-blank.png';
    });
  }

}
