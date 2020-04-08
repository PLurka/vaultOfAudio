import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { VaultOfAudioSharedModule } from 'app/shared';
import { VaultOfAudioCoreModule } from 'app/core';
import { VaultOfAudioAppRoutingModule } from './app-routing.module';
import { VaultOfAudioHomeModule } from './home/home.module';
import { VaultOfAudioAccountModule } from './account/account.module';
import { VaultOfAudioEntityModule } from './entities/entity.module';
import * as moment from 'moment';
import { VaultOfAudioAppPlayerModule } from './player/player.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { VaultOfAudioAppMySongsModule } from './my-songs/my-songs.module';
import { VaultOfAudioAppMyPlaylistsModule } from './my-playlists/my-playlists.module';
import { VaultOfAudioAppMyCrowdsModule } from './my-crowds/my-crowds.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ActiveMenuDirective, ErrorComponent } from './layouts';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-' }),
    NgJhipsterModule.forRoot({
      // set below to true to make alerts look like toast
      alertAsToast: false,
      alertTimeout: 5000,
      i18nEnabled: true,
      defaultI18nLang: 'en'
    }),
    VaultOfAudioSharedModule.forRoot(),
    VaultOfAudioCoreModule,
    VaultOfAudioHomeModule,
    VaultOfAudioAccountModule,
    VaultOfAudioAppPlayerModule,
    VaultOfAudioAppMySongsModule,
    VaultOfAudioAppMyPlaylistsModule,
    VaultOfAudioAppMyCrowdsModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    VaultOfAudioEntityModule,
    VaultOfAudioAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    }
  ],
  bootstrap: [JhiMainComponent]
})
export class VaultOfAudioAppModule {
  constructor(private dpConfig: NgbDatepickerConfig) {
    this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
  }
}
