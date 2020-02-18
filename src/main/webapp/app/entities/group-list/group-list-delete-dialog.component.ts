import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGroupList } from 'app/shared/model/group-list.model';
import { GroupListService } from './group-list.service';

@Component({
  selector: 'jhi-group-list-delete-dialog',
  templateUrl: './group-list-delete-dialog.component.html'
})
export class GroupListDeleteDialogComponent {
  groupList: IGroupList;

  constructor(protected groupListService: GroupListService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.groupListService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'groupListListModification',
        content: 'Deleted an groupList'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-group-list-delete-popup',
  template: ''
})
export class GroupListDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ groupList }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(GroupListDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.groupList = groupList;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/group-list', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/group-list', { outlets: { popup: null } }]);
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
