import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Ingredient } from '../../models/ingredient.model';
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
export class ShoppingListPage implements OnInit {

	shoppingList: Ingredient[];

	constructor(public navCtrl: NavController, public navParams: NavParams, public shoppingListService: ShoppingListService) {}
  
	onAddItem(form: NgForm){
		this.shoppingListService.addItem(form.value.ingredientName, form.value.ingredientQuantity);
		
		// Refresh the list
		this.loadItems();
		form.reset();
	}
	
	onDeleteItem(index: number){
		this.shoppingListService.removeItem(index);
		
		// Refresh the list
		this.loadItems();
	}
	private loadItems(){
		this.shoppingList = this.shoppingListService.getItems();
	}
	
	ionViewWillEnter(){
		this.loadItems();
	}
	
	ngOnInit(){
		this.loadItems();
	}

}
