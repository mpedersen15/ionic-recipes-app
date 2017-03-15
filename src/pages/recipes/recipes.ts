import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreateRecipePage } from '../create-recipe/create-recipe';
import { RecipeDetailsPage } from '../recipe-details/recipe-details';
import { RecipeService } from '../../services/recipe';
import { Recipe } from '../../models/recipe.model';

@Component({
	selector: 'page-recipes',
	templateUrl: 'recipes.html'
})
export class RecipesPage {

	recipes: Recipe[] = [];
	
	//createRecipePage = CreateRecipePage;

	constructor(public navCtrl: NavController, public navParams: NavParams, public recipeService: RecipeService) {}

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

}
