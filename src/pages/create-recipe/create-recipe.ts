import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the CreateRecipe page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-recipe',
  templateUrl: 'create-recipe.html'
})
export class CreateRecipePage {

	difficulty: string = "easy";

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	addIngredients(){
		console.log('adding ingredients');
	}
	
	addRecipe(){
		console.log('trying to add recipe');
	}

}
