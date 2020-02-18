import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserGroup } from 'app/shared/model/user-group.model';
import { UserGroupService } from './user-group.service';

@Component({
  selector: 'jhi-user-group-delete-dialog',
  templateUrl: './user-group-delete-dialog.component.html'
})
export class UserGroupDeleteDialogComponent {
  userGroup: IUserGroup;

  constructor(protected userGroupService: UserGroupService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.userGroupService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'userGroupListModification',
        content: 'Deleted an userGroup'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-user-group-delete-popup',
  template: ''
})
export class UserGroupDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userGroup }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(UserGroupDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.userGroup = userGroup;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/user-group', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/user-group', { outlets: { popup: null } }]);
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
