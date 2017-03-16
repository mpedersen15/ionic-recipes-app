import {
	Component
}
from '@angular/core';
import {
	NgForm
}
from '@angular/forms';
import {
	NavController,
	NavParams,
	LoadingController,
	AlertController
}
from 'ionic-angular';
import {
	AuthService
}
from '../../services/auth';

 @ Component({
	selector: 'page-signup',
	templateUrl: 'signup.html'
})
export class SignupPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SignupPage');
	}

	onSignup(form: NgForm) {
		console.log('on signup', form);
		let loading = this.loadingCtrl.create({
				content: 'Signing up...'
			});

		loading.present();

		this.authService.signup(form.value.email, form.value.password)
		.then((data) => {
			console.log('success', data);
			loading.dismiss();
		})
		.catch ((error) => {
			console.log(error);
			loading.dismiss();

			let alert = this.alertCtrl.create({
					title: 'Sign Up Failed',
					subTitle: error.message,
					buttons: ['Ok']
				});
			alert.present();

		});
	}

}
