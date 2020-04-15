import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISong } from 'app/shared/model/song.model';
import { SongService } from 'app/entities/song/song.service';

@Component({
  selector: 'jhi-my-songs-delete-dialog',
  templateUrl: './my-songs-delete-dialog.component.html'
})
export class MySongsDeleteDialogComponent {
  song: ISong;

  constructor(protected songService: SongService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.songService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'songListModification',
        content: 'Deleted an song'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-my-songs-delete-popup',
  template: ''
})
export class MySongsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ song }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MySongsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.song = song;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/my-songs', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/my-songs', { outlets: { popup: null } }]);
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
