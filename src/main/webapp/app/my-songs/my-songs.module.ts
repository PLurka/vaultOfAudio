import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VaultOfAudioSharedModule } from '../shared/shared.module';

import { MY_SONGS_ROUTE, MySongsComponent } from './';
import { MySongsUpdateComponent } from 'app/my-songs/my-songs-update.component';

const ENTITY_STATES = [...MY_SONGS_ROUTE];

@NgModule({
  imports: [VaultOfAudioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [MySongsComponent, MySongsUpdateComponent],
  entryComponents: [MySongsComponent, MySongsUpdateComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VaultOfAudioAppMySongsModule {}
