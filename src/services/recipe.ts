import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { AuthService } from './auth';
@Injectable()
export class RecipeService{

	constructor(public http: Http, public authService: AuthService){}

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
	
	saveRecipes(token: string){
		const userId = this.authService.getActiveUser().uid;
		return this.http.put('https://ionic2-recipe-book-d0f7a.firebaseio.com/' + userId + '/recipes.json?auth=' + token, this.recipes)
			.map((response: Response) => response.json());
	}
	
	loadRecipes(token: string){
		const userId = this.authService.getActiveUser().uid;
		return this.http.get('https://ionic2-recipe-book-d0f7a.firebaseio.com/' + userId + '/recipes.json?auth=' + token, this.recipes)
			.map((response: Response) => response.json())
			.do((recipes: Recipe[])=> {
				if (recipes){
					this.recipes = recipes;
				}
			});
	}
	
	

}