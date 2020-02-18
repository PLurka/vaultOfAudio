import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserSong } from 'app/shared/model/user-song.model';
import { UserSongService } from './user-song.service';

@Component({
  selector: 'jhi-user-song-delete-dialog',
  templateUrl: './user-song-delete-dialog.component.html'
})
export class UserSongDeleteDialogComponent {
  userSong: IUserSong;

  constructor(protected userSongService: UserSongService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.userSongService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'userSongListModification',
        content: 'Deleted an userSong'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-user-song-delete-popup',
  template: ''
})
export class UserSongDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userSong }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(UserSongDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.userSong = userSong;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/user-song', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/user-song', { outlets: { popup: null } }]);
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
