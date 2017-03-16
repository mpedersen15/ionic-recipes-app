import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, PopoverController, AlertController } from 'ionic-angular';
import { CreateRecipePage } from '../create-recipe/create-recipe';
import { RecipeDetailsPage } from '../recipe-details/recipe-details';
import { RecipesOptionsPage } from '../recipes-options/recipes-options';
import { RecipeService } from '../../services/recipe';
import { AuthService } from '../../services/auth';
import { Recipe } from '../../models/recipe.model';

@Component({
	selector: 'page-recipes',
	templateUrl: 'recipes.html'
})
export class RecipesPage {

	recipes: Recipe[] = [];
	
	//createRecipePage = CreateRecipePage;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public recipeService: RecipeService, 
		public loadingCtrl: LoadingController, 
		public popoverCtrl: PopoverController,
		public alertCtrl: AlertController,
		public authService: AuthService
	) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad RecipesPage');
	}

	onNewRecipe(){
		this.navCtrl.push(CreateRecipePage, {mode: 'New'});
	}

	ionViewWillEnter(){
		this.loadRecipes();
	}

	onDeleteRecipe(index){
		console.log('deleting index', index, this.recipes);
		this.recipeService.removeRecipe(index);
		this.loadRecipes();
	}
	
	onLoadRecipe(recipe: Recipe, index: number){
		console.log('load this recipe', recipe, index);
		this.navCtrl.push(RecipeDetailsPage, {recipe, index});
	}
	
	private loadRecipes(){
		this.recipes = this.recipeService.getRecipes();
	}
	
	openOptions(event){
		console.log('openning options');
		const loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		let popover = this.popoverCtrl.create(RecipesOptionsPage);
		popover.present({ev: event});
		
		popover.onDidDismiss((data) => {
			if (!data) return;
			if (data.action === "save"){
				loading.present();
				this.authService.getActiveUser().getToken()
					.then(token => {
						console.log('got a token', token);
						this.recipeService.saveRecipes(token)
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
						this.recipeService.loadRecipes(token)
							.subscribe(
								(list: Recipe[]) => {
									console.log('successful GET', list);
									if (list){
										this.recipes = list;
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
