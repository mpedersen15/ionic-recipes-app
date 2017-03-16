import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
	tabsPage = TabsPage;
	loginPage = LoginPage;
	signupPage = SignupPage;
	
	@ViewChild('content') navCtrl: NavController;
	
	constructor(public platform: Platform, public menuCtrl: MenuController) {
		firebase.initializeApp({
			apiKey: "AIzaSyCMecrrRMwPmChrVWDN2jFzBH-J0bxp8j8",
			authDomain: "ionic2-recipe-book-d0f7a.firebaseapp.com",
		});
		
		platform.ready().then(() => {
		  // Okay, so the platform is ready and our plugins are available.
		  // Here you can do any higher level native things you might need.
		  StatusBar.styleDefault();
		  Splashscreen.hide();
		});
	}

	openPage(page){
		this.navCtrl.setRoot(page);
		this.menuCtrl.close();
	}
	
	onLogout(){
		console.log('trying to logout');
	}
}
