import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICrowd } from 'app/shared/model/crowd.model';
import { CrowdService } from './crowd.service';

@Component({
  selector: 'jhi-crowd-delete-dialog',
  templateUrl: './crowd-delete-dialog.component.html'
})
export class CrowdDeleteDialogComponent {
  crowd: ICrowd;

  constructor(protected crowdService: CrowdService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.crowdService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'crowdListModification',
        content: 'Deleted an crowd'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-crowd-delete-popup',
  template: ''
})
export class CrowdDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ crowd }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CrowdDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.crowd = crowd;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/crowd', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/crowd', { outlets: { popup: null } }]);
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
