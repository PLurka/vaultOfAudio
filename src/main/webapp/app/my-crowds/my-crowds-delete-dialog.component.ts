import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICrowd } from 'app/shared/model/crowd.model';
import { CrowdService } from 'app/entities/crowd/crowd.service';

@Component({
  selector: 'jhi-my-crowds-delete-dialog',
  templateUrl: './my-crowds-delete-dialog.component.html'
})
export class MyCrowdsDeleteDialogComponent {
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
  selector: 'jhi-my-crowds-delete-popup',
  template: ''
})
export class MyCrowdsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ crowd }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MyCrowdsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.crowd = crowd;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/my-crowds', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/my-crowds', { outlets: { popup: null } }]);
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
