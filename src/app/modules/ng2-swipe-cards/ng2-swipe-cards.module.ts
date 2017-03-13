// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @NgModule({
//   imports: [
//     CommonModule
//   ],
//   declarations: []
// })
// export class Ng2SwipeCardsModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Ng2SwipeCardsComponent  } from '../../components/ng2-swipe-cards/ng2-swipe-cards.component';
import { Ng2SwipeCardsDirective } from '../../directives/ng2-swipe-cards.directive';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

export class HammerConfig extends HammerGestureConfig {
    overrides = <any>{
        'pan': { enable: true }
    }
}

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        Ng2SwipeCardsComponent,
        Ng2SwipeCardsDirective
    ],
    exports: [
        Ng2SwipeCardsComponent,
        Ng2SwipeCardsDirective
    ],
    entryComponents: [
        Ng2SwipeCardsComponent
    ],
    providers: [{
        provide: HAMMER_GESTURE_CONFIG,
        useClass: HammerConfig
    }]
})
export class SwipeCardsModule { }