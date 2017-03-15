import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
@Injectable()
export class ShoppingListService{

	private shoppingList: Ingredient[] = [];
	
	getItems(){
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
	

}