import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CreateRecipePage } from '../pages/create-recipe/create-recipe';
import { RecipeDetailsPage } from '../pages/recipe-details/recipe-details';
import { RecipesPage } from '../pages/recipes/recipes';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
	CreateRecipePage,
	RecipeDetailsPage,
	RecipesPage,
	ShoppingListPage,
	TabsPage
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
	TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}