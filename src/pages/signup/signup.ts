import { CustumerService } from './../../services/domain/custumer.service';
import { CityDTO } from './../../models/city.dto';
import { CityService } from './../../services/domain/city.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StateService } from '../../services/domain/state.service';
import { StateDTO } from '../../models/state.dto';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  states: StateDTO[];
  cities: CityDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public stateService: StateService,
    public cityService: CityService,
    public custumerService: CustumerService,
    public alertCtrl: AlertController
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['Joaquin', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      custumerType : ['1', [Validators.required]],
      cpfCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      password : ['123', [Validators.required]],
      publicPlace : ['Rua Via', [Validators.required]],
      number : ['25', [Validators.required]],
      complement : ['Apto 3', []],
      neighborhood : ['Copacabana', []],
      zipCOde : ['10828333', [Validators.required]],
      celPhone1 : ['977261827', [Validators.required]],
      celPhone2 : ['', []],
      celPhone3 : ['', []],
      stateId : [null, [Validators.required]],
      cityId : [null, [Validators.required]]   
    });
  }

  ionViewDidLoad() {

    this.stateService.findall().subscribe(response => {
      this.states = response;
      this.formGroup.controls.stateId.setValue(this.states[0].id);
      this.updateCities();
    }, error => {});
  }

  updateCities() {
    let state_id = this.formGroup.value.stateId;
    this.cityService.findall(state_id).subscribe(response => {
      this.cities = response;
      this.formGroup.controls.cityId.setValue(null);
    });
  }

  signupUser() {
    this.custumerService.insert(this.formGroup.value).subscribe(response => {
      this.showInsertOk();
    }, error => {});
  }

  showInsertOk(){
    let alert = this.alertCtrl.create({
      title: 'Success!',
      message: 'Signup done!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }  
}
