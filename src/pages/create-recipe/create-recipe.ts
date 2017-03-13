import {
	Component
}
from '@angular/core';
import {
	NavController,
	NavParams,
	ActionSheetController,
	AlertController
}
from 'ionic-angular';

/*
Generated class for the CreateRecipe page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
 */
 @ Component({
	selector: 'page-create-recipe',
	templateUrl: 'create-recipe.html'
})
export class CreateRecipePage {

	difficulty: string = "easy";

	constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController) {}

	addIngredients() {
		console.log('adding ingredients');

		let actionSheet = this.actionSheetCtrl.create({
				title: 'Manage Ingredients',
				buttons: [{
						text: 'Add Ingredients',
						handler: () => {
							console.log('Add ingredients clicked');
							this.showPrompt();
						}
					}, {
						text: 'Remove All Ingredients',
						role: 'destructive',
						handler: () => {
							console.log('Remove all ingredients clicked');
						}
					}, {
						text: 'Cancel',
						role: 'cancel',
						handler: () => {
							console.log('Cancel clicked');
						}
					}
				]
			});
		actionSheet.present();
	}

	addRecipe() {
		console.log('trying to add recipe');
	}

	showPrompt() {
		let prompt = this.alertCtrl.create({
				title: 'Add Ingredients',
				message: "What would you like to add?",
				inputs: [{
						name: 'ingredient',
						placeholder: 'Ingredient'
					},
				],
				buttons: [{
						text: 'Cancel',
						handler: data => {
							console.log('Cancel ingredient add');
						}
					}, {
						text: 'Add',
						handler: data => {
							console.log('Add ingredient', data);
						}
					}
				]
			});
		prompt.present();
	}

}
