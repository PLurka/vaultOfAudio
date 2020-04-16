import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VaultOfAudioSharedModule } from '../shared/shared.module';

import { MY_CROWDS_POPUP_ROUTE, MY_CROWDS_ROUTE, MyCrowdsComponent } from './';
import { MyCrowdsDetailComponent } from 'app/my-crowds/my-crowds-detail.component';
import { MyCrowdsUpdateComponent } from 'app/my-crowds/my-crowds-update.component';
import { MyCrowdsDeleteDialogComponent, MyCrowdsDeletePopupComponent } from 'app/my-crowds/my-crowds-delete-dialog.component';

const ENTITY_STATES = [...MY_CROWDS_ROUTE, ...MY_CROWDS_POPUP_ROUTE];

@NgModule({
  imports: [VaultOfAudioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MyCrowdsComponent,
    MyCrowdsDetailComponent,
    MyCrowdsUpdateComponent,
    MyCrowdsDeleteDialogComponent,
    MyCrowdsDeletePopupComponent
  ],
  entryComponents: [
    MyCrowdsComponent,
    MyCrowdsDetailComponent,
    MyCrowdsUpdateComponent,
    MyCrowdsDeleteDialogComponent,
    MyCrowdsDeletePopupComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VaultOfAudioAppMyCrowdsModule {}
