import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NavController,	NavParams,	ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { RecipeService } from '../../services/recipe';
import { Ingredient } from '../../models/ingredient.model';
import { Recipe } from '../../models/recipe.model';
 @ Component({
	selector: 'page-create-recipe',
	templateUrl: 'create-recipe.html'
})
export class CreateRecipePage implements OnInit{
	mode: string = 'new';
	
	selectOptions: string[] = ['Easy', 'Moderate', 'Difficult'];
	
	recipeForm: FormGroup;
	recipe: Recipe;
	index: number; 
	
	difficulty: string = "easy";

	constructor( 	
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public actionSheetCtrl: ActionSheetController, 
		public alertCtrl: AlertController,
		public toastCtrl: ToastController,
		public recipeService: RecipeService
	) {}

	onManageIngredients() {
		console.log('opening action sheet');

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
		console.log('trying to add recipe', this.recipeForm);
		const value = this.recipeForm.value;
		const ingredients = [];
		if (value.ingredients.length){
			
			value.ingredients.forEach(name => {
				ingredients.push(new Ingredient(name, 1));
			});
			
			// alternative with MAP
			/* ingredients = value.ingredients.map( name =>{
				return {name: name, quantity: 1};
			}) */
		}
		
		if (this.mode === "Edit"){
			this.recipeService.updateRecipe(this.index, value.title, value.description, value.difficulty, ingredients);
		}else{
			this.recipeService.addRecipe(value.title, value.description, value.difficulty, ingredients);
		}
		
		this.navCtrl.popToRoot();
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
		console.log('create-recipe params',this.navParams);
		this.mode = this.navParams.get('mode');
		if (this.mode === "Edit"){
			this.recipe = this.navParams.get('recipe');
			this.index = this.navParams.get('index');
		}
		this.initializeForm();
	}
	
	private initializeForm(){
		let title = null;
		let difficulty = 'Easy';
		let description = null;
		let ingredients = [];
		
		if (this.mode === "Edit"){
			title = this.recipe.title;
			difficulty = this.recipe.difficulty;
			description = this.recipe.description;
			
			for (let ingredient of this.recipe.ingredients){
				ingredients.push(new FormControl(ingredient.name, Validators.required));
			}

		}
		
		this.recipeForm = new FormGroup({
			title: new FormControl(title, Validators.required),
			description: new FormControl(description, Validators.required),
			difficulty: new FormControl(difficulty, Validators.required),
			ingredients: new FormArray(ingredients)
		});
	}
	
	onSubmit(){
		console.log('on submit');
	}

}
