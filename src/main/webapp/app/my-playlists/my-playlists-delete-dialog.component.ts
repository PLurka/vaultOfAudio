import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlaylist } from 'app/shared/model/playlist.model';
import { PlaylistService } from 'app/entities/playlist/playlist.service';

@Component({
  selector: 'jhi-my-playlists-delete-dialog',
  templateUrl: './my-playlists-delete-dialog.component.html'
})
export class MyPlaylistsDeleteDialogComponent {
  playlist: IPlaylist;

  constructor(protected playlistService: PlaylistService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.playlistService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'playlistListModification',
        content: 'Deleted an playlist'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-my-playlists-delete-popup',
  template: ''
})
export class MyPlaylistsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ playlist }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MyPlaylistsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.playlist = playlist;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/my-playlists', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/my-playlists', { outlets: { popup: null } }]);
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
