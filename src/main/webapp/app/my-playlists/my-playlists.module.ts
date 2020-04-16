import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VaultOfAudioSharedModule } from '../shared/shared.module';

import { MY_PLAYLISTS_POPUP_ROUTE, MY_PLAYLISTS_ROUTE, MyPlaylistsComponent } from './';
import { MyPlaylistsDetailComponent } from 'app/my-playlists/my-playlists-detail.component';
import { MyPlaylistsDeleteDialogComponent, MyPlaylistsDeletePopupComponent } from 'app/my-playlists/my-playlists-delete-dialog.component';
import { MyPlaylistsUpdateComponent } from 'app/my-playlists/my-playlists-update.component';

const ENTITY_STATES = [...MY_PLAYLISTS_ROUTE, ...MY_PLAYLISTS_POPUP_ROUTE];

@NgModule({
  imports: [VaultOfAudioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MyPlaylistsComponent,
    MyPlaylistsDetailComponent,
    MyPlaylistsUpdateComponent,
    MyPlaylistsDeleteDialogComponent,
    MyPlaylistsDeletePopupComponent
  ],
  entryComponents: [
    MyPlaylistsComponent,
    MyPlaylistsDetailComponent,
    MyPlaylistsUpdateComponent,
    MyPlaylistsDeleteDialogComponent,
    MyPlaylistsDeletePopupComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VaultOfAudioAppMyPlaylistsModule {}
