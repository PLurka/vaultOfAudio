import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEqualizerSetting } from 'app/shared/model/equalizer-setting.model';
import { EqualizerSettingService } from 'app/entities/equalizer-setting/equalizer-setting.service';

@Component({
  selector: 'jhi-my-eq-delete-dialog',
  templateUrl: './my-eq-delete-dialog.component.html'
})
export class MyEqDeleteDialogComponent {
  equalizerSetting: IEqualizerSetting;

  constructor(
    protected equalizerSettingService: EqualizerSettingService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.equalizerSettingService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'equalizerSettingListModification',
        content: 'Deleted an equalizerSetting'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-my-eq-delete-popup',
  template: ''
})
export class MyEqDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ equalizerSetting }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MyEqDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.equalizerSetting = equalizerSetting;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/my-eq', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/my-eq', { outlets: { popup: null } }]);
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
