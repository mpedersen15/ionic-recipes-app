import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';

@Injectable()
export class RecipeService{

	private recipes: Recipe[] = [];
	
	getRecipes(){
		return this.recipes.slice(0);
	}
	
	addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]){
		console.log('in service add recipe', title, description, difficulty, ingredients);
		this.recipes.push(new Recipe(title, description, difficulty, ingredients));
	}
	
	/* addItems(items: Ingredient[]){
		this.shoppingList.push(...items);
	} */
	
	removeRecipe(index){
		console.log('deleting in service', index, this.recipes);
		this.recipes.splice(index, 1);
	}
	
	updateRecipe(index, title: string, description: string, difficulty: string, ingredients: Ingredient[]){
		this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
	}
	

}