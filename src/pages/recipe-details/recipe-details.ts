import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Recipe } from '../../models/recipe.model';
import { CreateRecipePage } from '../create-recipe/create-recipe';
import { ShoppingListService } from '../../services/shopping-list';
import { RecipeService } from '../../services/recipe';

@Component({
  selector: 'page-recipe-details',
  templateUrl: 'recipe-details.html'
})
export class RecipeDetailsPage implements OnInit{
	recipe: Recipe;
	index: number;
	
  constructor(public navCtrl: NavController, public navParams: NavParams, public shoppingListService: ShoppingListService, public recipeService: RecipeService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipeDetailsPage');
  }
  
  ionViewWillEnter(){
	console.log('ionViewWillEnter', this.navParams);
  }

  onEditRecipe(){
	this.navCtrl.push(CreateRecipePage, {
		mode: 'Edit',
		recipe: this.recipe,
		index: this.index
	})
  }
  
  onAddIngredients(){
	this.shoppingListService.addItems(this.recipe.ingredients);
  }
  
  onDeleteRecipe(){
	this.recipeService.removeRecipe(this.index);
	this.navCtrl.popToRoot();
  }
  
  ngOnInit(){
	this.recipe = this.navParams.get('recipe');
	this.index = this.navParams.get('index');
  }
}
