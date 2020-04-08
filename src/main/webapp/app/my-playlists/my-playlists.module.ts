import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VaultOfAudioSharedModule } from '../shared/shared.module';

import { MY_PLAYLISTS_ROUTE, MyPlaylistsComponent } from './';

@NgModule({
  imports: [VaultOfAudioSharedModule, RouterModule.forRoot([MY_PLAYLISTS_ROUTE], { useHash: true })],
  declarations: [MyPlaylistsComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VaultOfAudioAppMyPlaylistsModule {}
