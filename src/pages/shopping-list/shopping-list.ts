import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Ingredient } from '../../models/ingredient.interface';
import { ShoppingListService } from '../../services/shopping-list';
/*
  Generated class for the ShoppingList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {

	shoppingList: Ingredient[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public shoppingListService: ShoppingListService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }
  
	onAddItem(form){
		console.log(form);

		let newItem: Ingredient = {
			name: form.value.ingredientName,
			quantity: form.value.ingredientQuantity
		}
		
		this.shoppingListService.addIngredientToList(newItem);
		
		this.shoppingList = this.shoppingListService.getShoppingList();
		
	}
	
	deleteItem(index){
		console.log('need to delete item', index);
		this.shoppingListService.removeIngredientFromList(index);
		this.shoppingList = this.shoppingListService.getShoppingList();
		
		console.log('component shopping list', JSON.stringify(this.shoppingList));
	}

}
