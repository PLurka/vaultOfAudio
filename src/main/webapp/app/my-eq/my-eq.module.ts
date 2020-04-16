import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VaultOfAudioSharedModule } from '../shared/shared.module';

import { MY_EQ_POPUP_ROUTE, MY_EQ_ROUTE, MyEqComponent } from './';
import { MyEqDetailComponent } from 'app/my-eq/my-eq-detail.component';
import { MyEqUpdateComponent } from 'app/my-eq/my-eq-update.component';
import { MyEqDeleteDialogComponent, MyEqDeletePopupComponent } from 'app/my-eq/my-eq-delete-dialog.component';

const ENTITY_STATES = [...MY_EQ_ROUTE, ...MY_EQ_POPUP_ROUTE];

@NgModule({
  imports: [VaultOfAudioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [MyEqComponent, MyEqDetailComponent, MyEqUpdateComponent, MyEqDeleteDialogComponent, MyEqDeletePopupComponent],
  entryComponents: [MyEqComponent, MyEqDetailComponent, MyEqUpdateComponent, MyEqDeleteDialogComponent, MyEqDeletePopupComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VaultOfAudioAppMyEqModule {}
