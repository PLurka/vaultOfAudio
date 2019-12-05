import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VaultOfAudioSharedModule } from '../shared/shared.module';

import { PLAYER_ROUTE, PlayerComponent } from './';

@NgModule({
  imports: [VaultOfAudioSharedModule, RouterModule.forRoot([PLAYER_ROUTE], { useHash: true })],
  declarations: [PlayerComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VaultOfAudioAppPlayerModule {}
