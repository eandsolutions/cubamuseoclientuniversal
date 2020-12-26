import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {ToastService} from 'ng-uikit-pro-standard'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  static isBrowser = new BehaviorSubject<boolean>(null);

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private toast: ToastService
  ) {
    AppComponent.isBrowser.next(isPlatformBrowser(platformId));

  }
}
