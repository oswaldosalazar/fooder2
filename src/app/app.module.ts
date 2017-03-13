import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { Ng2SwipeCardsComponent } from './components/ng2-swipe-cards/ng2-swipe-cards.component';

import { Ng2SwipeCardsDirective } from './directives/ng2-swipe-cards.directive';
import { GeolocationService } from '../app/services/geolocation.service';

const appRoutes: Routes = [
  { path: '', component: SearchComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    Ng2SwipeCardsComponent,
    Ng2SwipeCardsDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    GeolocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
