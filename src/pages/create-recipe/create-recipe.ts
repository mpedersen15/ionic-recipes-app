import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NavController,	NavParams,	ActionSheetController, AlertController, ToastController } from 'ionic-angular';

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
		public alertCtrl: AlertController,
		public toastCtrl: ToastController
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
							
							this.createIngredientPrompt().present()
							
							//this.showIngredientPromt();
						}
					}, {
						text: 'Remove All Ingredients',
						role: 'destructive',
						handler: () => {
							console.log('Remove all ingredients clicked');
							
							const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
							
							const len = fArray.length;
							
							if (len > 0){
								for (let i = len - 1; i >= 0; i--){
									fArray.removeAt(i);
								}
								
								const toast = this.toastCtrl.create({
									message: 'All ingredients removed',
									duration: 1000,
									position: 'bottom'
								});
								
								toast.present();
								
							}
							
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

	private createIngredientPrompt() {
		return this.alertCtrl.create({
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
						if (data.ingredient.trim() === '' || data.ingredient === null){
							// show toast to enter a valid ingredient
							
							const toast = this.toastCtrl.create({
								message: 'Please enter an ingredient name',
								duration: 1000,
								position: 'bottom'
							});
							
							toast.present();
							
							return;
						}
						
						(<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.ingredient, Validators.required));
						
						const toast = this.toastCtrl.create({
							message: 'Item added',
							duration: 1000,
							position: 'bottom'
						});
						
						toast.present();
						
						console.log(this.recipeForm);
					}
				}
			]
		});
	}
	
	ngOnInit(){
		this.mode = this.navParams.get('mode');
		this.initializeForm();
	}
	
	private initializeForm(){
		this.recipeForm = new FormGroup({
			title: new FormControl(null, Validators.required),
			description: new FormControl(null, Validators.required),
			difficulty: new FormControl('Easy', Validators.required),
			ingredients: new FormArray([])
		});
	}
	
	onSubmit(){
		console.log(this.recipeForm);
	}

}
