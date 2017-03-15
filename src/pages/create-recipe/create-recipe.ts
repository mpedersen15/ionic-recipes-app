import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController,	NavParams,	ActionSheetController, AlertController } from 'ionic-angular';

 @ Component({
	selector: 'page-create-recipe',
	templateUrl: 'create-recipe.html'
})
export class CreateRecipePage implements OnInit{
	mode: string = 'new';
	
	selectOptions: string[] = ['Easy', 'Moderate', 'Difficult'];
	
	recipeForm: FormGroup
	
	difficulty: string = "easy";

	constructor( 	
					public navCtrl: NavController, 
					public navParams: NavParams, 
					public actionSheetCtrl: ActionSheetController, 
					public alertCtrl: AlertController
				) {}

	onManageIngredients() {
		console.log('adding ingredients');

		let actionSheet = this.actionSheetCtrl.create({
				title: 'Manage Ingredients',
				buttons: [
					{
						text: 'Add Ingredient',
						handler: () => {
							console.log('Add ingredient clicked');
							this.showIngredientPromt();
						}
					}, {
						text: 'Remove All Ingredients',
						role: 'destructive',
						handler: () => {
							console.log('Remove all ingredients clicked');
						}
					}, {
						text: 'Cancel',
						role: 'cancel'
					}
				]
			});
		actionSheet.present();
	}

	addRecipe() {
		console.log('trying to add recipe');
	}

	private showIngredientPromt() {
		let prompt = this.alertCtrl.create({
				title: 'Add Ingredients',
				message: "What would you like to add?",
				inputs: [
					{
						name: 'ingredient',
						placeholder: 'Ingredient'
					},
				],
				buttons: [{
						text: 'Cancel',
						role: 'cancel'
					}, {
						text: 'Add',
						handler: data => {
							console.log('Add ingredient', data);
							if (data.name.trim() === '' || data.name === null){
								// show toast to enter a valid ingredient
							}
						}
					}
				]
			});
		prompt.present();
	}
	
	ngOnInit(){
		this.mode = this.navParams.get('mode');
		this.initializeForm();
	}
	
	private initializeForm(){
		this.recipeForm = new FormGroup({
			title: new FormControl(null, Validators.required),
			description: new FormControl(null, Validators.required),
			difficulty: new FormControl('Easy', Validators.required)
		});
	}
	
	onSubmit(){
		console.log(this.recipeForm);
	}

}
