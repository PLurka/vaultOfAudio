import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VaultOfAudioSharedModule } from '../shared/shared.module';

import { MY_SONGS_POPUP_ROUTE, MY_SONGS_ROUTE, MySongsComponent } from './';
import { MySongsUpdateComponent } from 'app/my-songs/my-songs-update.component';
import { MySongsDeleteDialogComponent, MySongsDeletePopupComponent } from 'app/my-songs/my-songs-delete-dialog.component';
import { MySongsDetailComponent } from 'app/my-songs/my-songs-detail.component';

const ENTITY_STATES = [...MY_SONGS_ROUTE, ...MY_SONGS_POPUP_ROUTE];

@NgModule({
  imports: [VaultOfAudioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MySongsComponent,
    MySongsDetailComponent,
    MySongsUpdateComponent,
    MySongsDeleteDialogComponent,
    MySongsDeletePopupComponent
  ],
  entryComponents: [
    MySongsComponent,
    MySongsDetailComponent,
    MySongsUpdateComponent,
    MySongsDeleteDialogComponent,
    MySongsDeletePopupComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VaultOfAudioAppMySongsModule {}
