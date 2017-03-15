import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreateRecipePage } from '../create-recipe/create-recipe';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {

	//createRecipePage = CreateRecipePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }
  
  onNewRecipe(){
	  this.navCtrl.push(CreateRecipePage, {mode: 'New'});
  }

}
