import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
	selector: 'page-recipes-options',
	templateUrl: 'recipes-options.html'
})
export class RecipesOptionsPage {
  
	constructor(public viewCtrl: ViewController){}
	
	onAction(action: string){
		console.log('action', action);
		this.viewCtrl.dismiss({action});
	}
}
