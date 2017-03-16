import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list';
import { AuthService } from '../../services/auth';
import { SlOptionsPage } from '../sl-options/sl-options';

/*
  Generated class for the ShoppingList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage implements OnInit {

	shoppingList: Ingredient[];

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public shoppingListService: ShoppingListService, 
		public popoverCtrl: PopoverController,
		public loadingCtrl: LoadingController,
		public authService: AuthService,
		public alertCtrl: AlertController
	) {}
  
	onAddItem(form: NgForm){
		this.shoppingListService.addItem(form.value.ingredientName, form.value.ingredientQuantity);
		
		// Refresh the list
		this.loadItems();
		form.reset();
	}
	
	onDeleteItem(index: number){
		this.shoppingListService.removeItem(index);
		
		// Refresh the list
		this.loadItems();
	}
	private loadItems(){
		this.shoppingList = this.shoppingListService.getItems();
	}
	
	ionViewWillEnter(){
		this.loadItems();
	}
	
	ngOnInit(){
		this.loadItems();
	}
	
	openOptions(event){
		console.log('openning options');
		const loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		let popover = this.popoverCtrl.create(SlOptionsPage);
		popover.present({ev: event});
		
		popover.onDidDismiss((data) => {
			//console.log(data);
			if (!data) return;
			
			if (data.action === "save"){
				loading.present();
				this.authService.getActiveUser().getToken()
					.then(token => {
						console.log('got a token', token);
						this.shoppingListService.saveList(token)
							.subscribe(
								() => {
									console.log('successful put');
									loading.dismiss();
								},
								(error) => {
									console.log('error PUTing', error);
									loading.dismiss();
									this.handleError(error.json().error);
								}
							);
					})
					.catch(error => console.log(error));
			}else if (data.action === "load"){
				loading.present();
				this.authService.getActiveUser().getToken()
					.then(token => {
						console.log('got a token', token);
						this.shoppingListService.loadList(token)
							.subscribe(
								(list: Ingredient[]) => {
									console.log('successful GET', list);
									if (list){
										this.shoppingList = list;
									}
									loading.dismiss();
									
								},
								(error) => {
									console.log('error GETing', error);
									loading.dismiss();
									this.handleError(error.json().error);
								}
							);
					})
					.catch(error => console.log(error));
			}
		});
		
	}
	
	private handleError(errorMessage: string){
		const errorAlert = this.alertCtrl.create({
			title: 'An error occured!',
			subTitle: errorMessage,
			buttons: ['OK']
		});
		
		errorAlert.present();
		
	}

}
