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
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}

	onLogin(form: NgForm) {
		console.log('on login', form);

		let loading = this.loadingCtrl.create({
				content: 'Logging in...'
			});

		loading.present();

		this.authService.login(form.value.email, form.value.password)
		.then(data => {
			console.log(data);
			loading.dismiss();
		})
		.catch (error => {
			console.log(error);
			loading.dismiss();

			let alert = this.alertCtrl.create({
					title: 'Login Failed',
					subTitle: error.message,
					buttons: ['Ok']
				});
			alert.present();
		});
	}

}
