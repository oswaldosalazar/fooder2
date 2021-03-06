import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { FooderMainComponent } from './components/fooder-main/fooder-main.component';
import { Ng2SwipeCardsComponent } from './components/ng2-swipe-cards/ng2-swipe-cards.component';
import { SelectedComponent } from './components/selected/selected.component';

import { Ng2SwipeCardsDirective } from './directives/ng2-swipe-cards.directive';
import { GeolocationService } from '../app/services/geolocation.service';
import { SendSelectedService } from '../app/services/send-selected.service';

const appRoutes: Routes = [
  { path: 'search', component: SearchComponent},
  { path: 'selected', component: SelectedComponent},
  { path: '', component: FooderMainComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    Ng2SwipeCardsComponent,
    Ng2SwipeCardsDirective,
    FooderMainComponent,
    SelectedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    GeolocationService,
    SendSelectedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
