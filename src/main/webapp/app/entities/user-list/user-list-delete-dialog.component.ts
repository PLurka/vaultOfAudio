import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserList } from 'app/shared/model/user-list.model';
import { UserListService } from './user-list.service';

@Component({
  selector: 'jhi-user-list-delete-dialog',
  templateUrl: './user-list-delete-dialog.component.html'
})
export class UserListDeleteDialogComponent {
  userList: IUserList;

  constructor(protected userListService: UserListService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.userListService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'userListListModification',
        content: 'Deleted an userList'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-user-list-delete-popup',
  template: ''
})
export class UserListDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userList }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(UserListDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.userList = userList;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/user-list', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/user-list', { outlets: { popup: null } }]);
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
