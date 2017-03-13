import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreateRecipePage } from '../create-recipe/create-recipe';
/*
  Generated class for the Recipes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {

	createRecipePage = CreateRecipePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }

}
