import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IListSong, ListSong } from 'app/shared/model/list-song.model';
import { ListSongService } from './list-song.service';
import { IPlaylist } from 'app/shared/model/playlist.model';
import { PlaylistService } from 'app/entities/playlist';
import { ISong } from 'app/shared/model/song.model';
import { SongService } from 'app/entities/song';

@Component({
  selector: 'jhi-list-song-update',
  templateUrl: './list-song-update.component.html'
})
export class ListSongUpdateComponent implements OnInit {
  isSaving: boolean;

  playlists: IPlaylist[];

  songs: ISong[];

  editForm = this.fb.group({
    id: [],
    listId: [],
    songId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected listSongService: ListSongService,
    protected playlistService: PlaylistService,
    protected songService: SongService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ listSong }) => {
      this.updateForm(listSong);
    });
    this.playlistService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlaylist[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlaylist[]>) => response.body)
      )
      .subscribe((res: IPlaylist[]) => (this.playlists = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.songService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISong[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISong[]>) => response.body)
      )
      .subscribe((res: ISong[]) => (this.songs = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(listSong: IListSong) {
    this.editForm.patchValue({
      id: listSong.id,
      listId: listSong.listId,
      songId: listSong.songId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const listSong = this.createFromForm();
    if (listSong.id !== undefined) {
      this.subscribeToSaveResponse(this.listSongService.update(listSong));
    } else {
      this.subscribeToSaveResponse(this.listSongService.create(listSong));
    }
  }

  private createFromForm(): IListSong {
    return {
      ...new ListSong(),
      id: this.editForm.get(['id']).value,
      listId: this.editForm.get(['listId']).value,
      songId: this.editForm.get(['songId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IListSong>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackPlaylistById(index: number, item: IPlaylist) {
    return item.id;
  }

  trackSongById(index: number, item: ISong) {
    return item.id;
  }
}
