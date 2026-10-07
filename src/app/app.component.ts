import { Component } from '@angular/core';
import { Router, RouterEvent, Event, NavigationStart, NavigationCancel, NavigationEnd, NavigationError } from '@angular/router'

@Component({
    selector: 'ca-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {

  showLoading = false;

  constructor(private router: Router){
    router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  navigationInterceptor(event: Event){
    if( event instanceof NavigationStart ){
      this.showLoading = true;
    }
    else if( event instanceof NavigationEnd){
      this.showLoading = false;
    }
    else if( event instanceof NavigationCancel){
      this.showLoading = false;
    }
    else if( event instanceof NavigationError){
      this.showLoading = false;
    }
  }
}
