import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the SlOptions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sl-options',
  templateUrl: 'sl-options.html'
})
export class SlOptionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlOptionsPage');
  }

  onAction(action: string){
	console.log('action', action);
	this.viewCtrl.dismiss({action});
  }
  
}
