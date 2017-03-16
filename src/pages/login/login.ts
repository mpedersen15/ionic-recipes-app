import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	onLogin(form: NgForm){
		console.log('on login', form);
	}
  
}
