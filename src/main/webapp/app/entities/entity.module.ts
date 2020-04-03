import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'equalizer-setting',
        loadChildren: () => import('./equalizer-setting/equalizer-setting.module').then(m => m.VaultOfAudioEqualizerSettingModule)
      },
      {
        path: 'song',
        loadChildren: () => import('./song/song.module').then(m => m.VaultOfAudioSongModule)
      },
      {
        path: 'playlist',
        loadChildren: () => import('./playlist/playlist.module').then(m => m.VaultOfAudioPlaylistModule)
      },
      {
        path: 'crowd',
        loadChildren: () => import('./crowd/crowd.module').then(m => m.VaultOfAudioCrowdModule)
      },
      {
        path: 'user-extra',
        loadChildren: () => import('./user-extra/user-extra.module').then(m => m.VaultOfAudioUserExtraModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VaultOfAudioEntityModule {}
