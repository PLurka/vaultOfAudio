import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserEqualizerSetting } from 'app/shared/model/user-equalizer-setting.model';
import { UserEqualizerSettingService } from './user-equalizer-setting.service';

@Component({
  selector: 'jhi-user-equalizer-setting-delete-dialog',
  templateUrl: './user-equalizer-setting-delete-dialog.component.html'
})
export class UserEqualizerSettingDeleteDialogComponent {
  userEqualizerSetting: IUserEqualizerSetting;

  constructor(
    protected userEqualizerSettingService: UserEqualizerSettingService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.userEqualizerSettingService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'userEqualizerSettingListModification',
        content: 'Deleted an userEqualizerSetting'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-user-equalizer-setting-delete-popup',
  template: ''
})
export class UserEqualizerSettingDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userEqualizerSetting }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(UserEqualizerSettingDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.userEqualizerSetting = userEqualizerSetting;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/user-equalizer-setting', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/user-equalizer-setting', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
