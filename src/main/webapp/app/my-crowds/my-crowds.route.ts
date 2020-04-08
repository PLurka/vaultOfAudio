import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { MyCrowdsComponent } from './my-crowds.component';

export const MY_CROWDS_ROUTE: Route = {
  path: 'my-crowds',
  component: MyCrowdsComponent,
  data: {
    authorities: [],
    pageTitle: 'my-crowds.title'
  },
  canActivate: [UserRouteAccessService]
};
