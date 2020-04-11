import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { MyEqComponent } from './my-eq.component';

export const MY_EQ_ROUTE: Route = {
  path: 'my-eq',
  component: MyEqComponent,
  data: {
    authorities: [],
    pageTitle: 'my-eq.title'
  },
  canActivate: [UserRouteAccessService]
};
