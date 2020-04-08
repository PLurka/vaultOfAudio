import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { MyPlaylistsComponent } from './my-playlists.component';

export const MY_PLAYLISTS_ROUTE: Route = {
  path: 'my-playlists',
  component: MyPlaylistsComponent,
  data: {
    authorities: [],
    pageTitle: 'my-playlists.title'
  },
  canActivate: [UserRouteAccessService]
};
