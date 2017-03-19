import { Component, ViewEncapsulation, ViewChild, TemplateRef, EventEmitter, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Ng2SwipeCardsModule } from '../../components/ng2-swipe-cards/index';

@Component({
  selector: 'app-fooder-main',
  // encapsulation: ViewEncapsulation.None,
  templateUrl: './fooder-main.component.html',
  styleUrls: ['./fooder-main.component.css']
})

export class FooderMainComponent {
  @ViewChild('cardLog') cardLogContainer: any;
  @ViewChild('tinderCardLog') tinderCardLogContainer: any;


  cards: any[] = [];
  cardCursor: number = 0;
  orientation: string = "x";
  overlay: any = {
    like: {
      backgroundColor: '#28e93b'
    },
    dislike: {
      backgroundColor: '#e92828'
    }
  };

  cardLogs: any = [];
  tinderCardLogs: any = [];


  constructor() {
    for (var i = 0; i < 50; i++) {
      this.cards.push({
        id: i + 1,
        likeEvent: new EventEmitter(),
        destroyEvent: new EventEmitter(),
        url: this.getKittenUrl()
      });
    }
  }

  like(like) {
    var self = this;
    if (this.cards.length > 0) {
      self.cards[this.cardCursor++].likeEvent.emit({ like });
      // DO STUFF WITH YOUR CARD
      this.tinderCardLogs.push("callLike(" + JSON.stringify({ like }) + ")");
      this.scrollToBottom(this.tinderCardLogContainer);
    }
  }

  onCardLike(event) {
    var item = this.cards[this.cardCursor++];
    // DO STUFF WITH YOUR CARD
    this.tinderCardLogs.push("onLike(" + JSON.stringify(event) + ")");
    this.scrollToBottom(this.tinderCardLogContainer);
  }

  getKittenUrl() {
    var w = 500 - Math.floor((Math.random() * 100) + 1);
    var h = 500 - Math.floor((Math.random() * 100) + 1);
    return "https://placekitten.com/" + w + "/" + h;
  }

  onRelease(event) {
    this.cardLogs.push("onRelease(event)");
    this.scrollToBottom(this.cardLogContainer);

  }

  onAbort(event) {
    this.cardLogs.push("onAbort(event)");
    this.scrollToBottom(this.cardLogContainer);
  }

  onSwipe(event) {
    this.cardLogs.push("onSwipe(event)");
    this.scrollToBottom(this.cardLogContainer);
  }

  scrollToBottom(el) {
    setTimeout(() => {
      el.nativeElement.scrollTop = el.nativeElement.scrollHeight;
    }, 100);
  }
}

// @NgModule({
//   imports: [BrowserModule, FormsModule, Ng2SwipeCardsModule],
//   declarations: [FooderMainComponent],
//   bootstrap: [FooderMainComponent]
// })
// export class AppModule { }

