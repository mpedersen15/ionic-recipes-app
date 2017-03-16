import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Ingredient } from '../models/ingredient.model';
import { AuthService } from './auth';
import 'rxjs/Rx';

@Injectable()
export class ShoppingListService{

	constructor(public http: Http, public authService: AuthService){}

	private shoppingList: Ingredient[] = [];
	
	getItems(){
		console.log('in getItems service', this.shoppingList);
		return this.shoppingList.slice(0);
	}
	
	addItem(name: string, quantity: number){
		this.shoppingList.push(new Ingredient(name, quantity));
	}
	
	addItems(items: Ingredient[]){
		this.shoppingList.push(...items);
	}
	
	removeItem(index){
		this.shoppingList.splice(index, 1);
	}
	
	saveList(token: string){
		const userId = this.authService.getActiveUser().uid;
		return this.http.put('https://ionic2-recipe-book-d0f7a.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token, this.shoppingList)
			.map((response: Response) => response.json());
	}
	
	loadList(token: string){
		const userId = this.authService.getActiveUser().uid;
		return this.http.get('https://ionic2-recipe-book-d0f7a.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token, this.shoppingList)
			.map((response: Response) => response.json())
			.do( (ingredients: Ingredient[])=> {
				if (ingredients){
					this.shoppingList = ingredients;
				}	
			});
	}

}