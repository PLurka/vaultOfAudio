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
        path: 'user-equalizer-setting',
        loadChildren: () =>
          import('./user-equalizer-setting/user-equalizer-setting.module').then(m => m.VaultOfAudioUserEqualizerSettingModule)
      },
      {
        path: 'song',
        loadChildren: () => import('./song/song.module').then(m => m.VaultOfAudioSongModule)
      },
      {
        path: 'user-song',
        loadChildren: () => import('./user-song/user-song.module').then(m => m.VaultOfAudioUserSongModule)
      },
      {
        path: 'playlist',
        loadChildren: () => import('./playlist/playlist.module').then(m => m.VaultOfAudioPlaylistModule)
      },
      {
        path: 'user-list',
        loadChildren: () => import('./user-list/user-list.module').then(m => m.VaultOfAudioUserListModule)
      },
      {
        path: 'group',
        loadChildren: () => import('./group/group.module').then(m => m.VaultOfAudioGroupModule)
      },
      {
        path: 'user-group',
        loadChildren: () => import('./user-group/user-group.module').then(m => m.VaultOfAudioUserGroupModule)
      },
      {
        path: 'group-list',
        loadChildren: () => import('./group-list/group-list.module').then(m => m.VaultOfAudioGroupListModule)
      },
      {
        path: 'list-song',
        loadChildren: () => import('./list-song/list-song.module').then(m => m.VaultOfAudioListSongModule)
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
