import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { PlayerComponent } from './player.component';

export const PLAYER_ROUTE: Route = {
  path: 'player',
  component: PlayerComponent,
  data: {
    authorities: [],
    pageTitle: 'player.title'
  },
  canActivate: [UserRouteAccessService]
};
