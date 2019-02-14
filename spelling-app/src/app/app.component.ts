import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { PubSubService } from './services/pub-sub.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spelling-app';
  enteringAnimation = false;

  breadcrumbComponent: any;

  constructor(private pubSub: PubSubService, private router: Router) {

    pubSub.published.subscribe(event => {
      if (event.eventName = 'navigation-started') {

      }
    });

    this.router.events.subscribe(event => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }

      const myEvent: any = event;
      if (myEvent && myEvent.url && myEvent.url.indexOf('#') === -1) {
        // this.enteringAnimation = true;
      }

      // setTimeout(() => this.enteringAnimation = false, 750);
    });

  }

  onActivate(data: any) {
    if (data.breadcrumbs) {
      this.breadcrumbComponent = data;
    } else {
      this.breadcrumbComponent = null;
    }
  }

  onDeactivate(data: any) {
    this.breadcrumbComponent = null;
  }

}
