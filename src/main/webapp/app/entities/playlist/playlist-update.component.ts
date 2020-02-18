import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPlaylist, Playlist } from 'app/shared/model/playlist.model';
import { PlaylistService } from './playlist.service';

@Component({
  selector: 'jhi-playlist-update',
  templateUrl: './playlist-update.component.html'
})
export class PlaylistUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    listId: [null, [Validators.required]],
    listName: [null, [Validators.required, Validators.maxLength(200)]],
    listDescription: [null, [Validators.maxLength(2000)]]
  });

  constructor(protected playlistService: PlaylistService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ playlist }) => {
      this.updateForm(playlist);
    });
  }

  updateForm(playlist: IPlaylist) {
    this.editForm.patchValue({
      id: playlist.id,
      listId: playlist.listId,
      listName: playlist.listName,
      listDescription: playlist.listDescription
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const playlist = this.createFromForm();
    if (playlist.id !== undefined) {
      this.subscribeToSaveResponse(this.playlistService.update(playlist));
    } else {
      this.subscribeToSaveResponse(this.playlistService.create(playlist));
    }
  }

  private createFromForm(): IPlaylist {
    return {
      ...new Playlist(),
      id: this.editForm.get(['id']).value,
      listId: this.editForm.get(['listId']).value,
      listName: this.editForm.get(['listName']).value,
      listDescription: this.editForm.get(['listDescription']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlaylist>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
