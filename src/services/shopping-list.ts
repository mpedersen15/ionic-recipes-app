import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.interface';
@Injectable()
export class ShoppingListService{

	private shoppingList: Ingredient[] = [];
	
	getShoppingList(){
		return this.shoppingList.slice(0);
	}
	
	addIngredientToList(item: Ingredient){
		this.shoppingList.push(item);
	}
	
	addMultipleIngredients(items: Ingredient[]){
		items.forEach(function(item){
			this.addIngredientToList(item);
		});
	}
	
	removeIngredientFromList(index){
		console.log('in service delete', index , JSON.stringify(this.shoppingList));
	
		/* var indexOfItem = this.shoppingList.findIndex(function(itemEl){
			return itemEl.name === item.name;
		});
		console.log('index of item to delete', indexOfItem); */

		this.shoppingList.splice(index, 1);
		console.log('in service, shoppingList', JSON.stringify(this.getShoppingList()));
		
		
		
	}
	

}