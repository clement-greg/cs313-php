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

  breadcrumbComponent: any;

  constructor(private pubSub: PubSubService) {

    pubSub.published.subscribe(event => {
      if (event.eventName = 'navigation-started') {

      }
    });

  }

  onActivate(data: any) {
    if(data.breadcrumbs) {
      this.breadcrumbComponent = data;
    } else {
      this.breadcrumbComponent = null;
    }

  }

  onDeactivate(data: any) {
    this.breadcrumbComponent = null;
  }

}
