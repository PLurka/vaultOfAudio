import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { MySongsComponent } from './my-songs.component';

export const MY_SONGS_ROUTE: Route = {
  path: 'my-songs',
  component: MySongsComponent,
  data: {
    authorities: [],
    pageTitle: 'my-songs.title'
  },
  canActivate: [UserRouteAccessService]
};
