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
import { ShoppingListService } from '../services/shopping-list';
import { RecipeService } from '../services/recipe';

@NgModule({
  declarations: [
    MyApp,
	CreateRecipePage,
	RecipeDetailsPage,
	RecipesPage,
	ShoppingListPage,
	TabsPage,
	LoginPage,
	SignupPage
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
	SignupPage
  ],
  providers: [
	{provide: ErrorHandler, useClass: IonicErrorHandler},
	ShoppingListService,
	RecipeService
  ]
})
export class AppModule {}
