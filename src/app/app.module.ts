import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CreateRecipePage } from '../pages/create-recipe/create-recipe';
import { RecipeDetailsPage } from '../pages/recipe-details/recipe-details';
import { RecipesPage } from '../pages/recipes/recipes';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SlOptionsPage } from '../pages/sl-options/sl-options';
import { RecipesOptionsPage } from '../pages/recipes-options/recipes-options';
import { ShoppingListService } from '../services/shopping-list';
import { RecipeService } from '../services/recipe';
import { AuthService } from '../services/auth';

@NgModule({
  declarations: [
    MyApp,
	CreateRecipePage,
	RecipeDetailsPage,
	RecipesPage,
	ShoppingListPage,
	TabsPage,
	LoginPage,
	SignupPage,
	SlOptionsPage,
	RecipesOptionsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
	CreateRecipePage,
	RecipeDetailsPage,
	RecipesPage,
	ShoppingListPage,
	TabsPage,
	LoginPage,
	SignupPage,
	SlOptionsPage,
	RecipesOptionsPage
  ],
  providers: [
	{provide: ErrorHandler, useClass: IonicErrorHandler},
	ShoppingListService,
	RecipeService,
	AuthService
  ]
})
export class AppModule {}
