import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IListSong } from 'app/shared/model/list-song.model';
import { ListSongService } from './list-song.service';

@Component({
  selector: 'jhi-list-song-delete-dialog',
  templateUrl: './list-song-delete-dialog.component.html'
})
export class ListSongDeleteDialogComponent {
  listSong: IListSong;

  constructor(protected listSongService: ListSongService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.listSongService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'listSongListModification',
        content: 'Deleted an listSong'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-list-song-delete-popup',
  template: ''
})
export class ListSongDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ listSong }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ListSongDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.listSong = listSong;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/list-song', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/list-song', { outlets: { popup: null } }]);
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
