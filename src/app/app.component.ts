import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController, Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import { AuthService } from '../services/auth';
import { ShoppingListService } from '../services/shopping-list';
import { RecipeService } from '../services/recipe';

import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
	rootPage: any = TabsPage;
	loginPage = LoginPage;
	signupPage = SignupPage;
	isAuthenticated = false;
	@ViewChild('content') navCtrl: NavController;
	
	constructor(
		public platform: Platform, 
		public menuCtrl: MenuController, 
		public authService: AuthService,
		public shoppingListService: ShoppingListService,
		public recipeService: RecipeService,
		public events: Events) {
		firebase.initializeApp({
			apiKey: "AIzaSyCMecrrRMwPmChrVWDN2jFzBH-J0bxp8j8",
			authDomain: "ionic2-recipe-book-d0f7a.firebaseapp.com",
		});
		
		firebase.auth().onAuthStateChanged( user => {
			if (user){
				console.log('user',user);
				this.isAuthenticated = true;
				this.rootPage = TabsPage;
				
				firebase.auth().currentUser.getToken().then( (token) => {
					console.log('token', token);
					this.recipeService.loadRecipes(token).subscribe( (data) => {
						console.log('successful load of recipes', data);
						this.shoppingListService.loadList(token).subscribe( (data) => {
							console.log('successful load of shopping list', data);
							this.events.publish('data:fetch', true);
						});
					});
					
				});
				
			}else{
				this.isAuthenticated = false;
				this.rootPage = this.loginPage;
			}
		})
		
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
		this.authService.logout();
		this.menuCtrl.close();
		this.navCtrl.setRoot(LoginPage);
	}
}
