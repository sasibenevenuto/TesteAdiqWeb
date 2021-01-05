import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from './services/user.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Web';

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {    

    iconRegistry.addSvgIcon('print',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/icon/ic-print.svg'));

    iconRegistry.addSvgIcon('account_balance',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/icon/account_balance-24px.svg'));

    iconRegistry.addSvgIcon('list',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/icon/list-24px.svg'));

    iconRegistry.addSvgIcon('launch',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/icon/launch-24px.svg'));

    iconRegistry.addSvgIcon('text_snippet',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/icon/text_snippet-24px.svg'));

    iconRegistry.addSvgIcon('search',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/icon/search-24px.svg'));

      iconRegistry.addSvgIcon('sair',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/icon/power_settings_new-24px.svg'));
  }
}
