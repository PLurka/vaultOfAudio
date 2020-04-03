import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISong, Song } from 'app/shared/model/song.model';
import { SongService } from './song.service';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from 'app/entities/user-extra';
import { IPlaylist } from 'app/shared/model/playlist.model';
import { PlaylistService } from 'app/entities/playlist';

@Component({
  selector: 'jhi-song-update',
  templateUrl: './song-update.component.html'
})
export class SongUpdateComponent implements OnInit {
  isSaving: boolean;

  userextras: IUserExtra[];

  playlists: IPlaylist[];

  editForm = this.fb.group({
    id: [],
    songName: [null, [Validators.required, Validators.maxLength(200)]],
    lyrics: [null, [Validators.maxLength(2000)]],
    authors: [null, [Validators.maxLength(100)]],
    songMetadata: [null, [Validators.required, Validators.maxLength(500)]],
    year: [],
    songDescription: [null, [Validators.maxLength(2000)]],
    users: [],
    createdBy: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected songService: SongService,
    protected userExtraService: UserExtraService,
    protected playlistService: PlaylistService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ song }) => {
      this.updateForm(song);
    });
    this.userExtraService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUserExtra[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUserExtra[]>) => response.body)
      )
      .subscribe((res: IUserExtra[]) => (this.userextras = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.playlistService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlaylist[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlaylist[]>) => response.body)
      )
      .subscribe((res: IPlaylist[]) => (this.playlists = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(song: ISong) {
    this.editForm.patchValue({
      id: song.id,
      songName: song.songName,
      lyrics: song.lyrics,
      authors: song.authors,
      songMetadata: song.songMetadata,
      year: song.year,
      songDescription: song.songDescription,
      users: song.users,
      createdBy: song.createdBy
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const song = this.createFromForm();
    if (song.id !== undefined) {
      this.subscribeToSaveResponse(this.songService.update(song));
    } else {
      this.subscribeToSaveResponse(this.songService.create(song));
    }
  }

  private createFromForm(): ISong {
    return {
      ...new Song(),
      id: this.editForm.get(['id']).value,
      songName: this.editForm.get(['songName']).value,
      lyrics: this.editForm.get(['lyrics']).value,
      authors: this.editForm.get(['authors']).value,
      songMetadata: this.editForm.get(['songMetadata']).value,
      year: this.editForm.get(['year']).value,
      songDescription: this.editForm.get(['songDescription']).value,
      users: this.editForm.get(['users']).value,
      createdBy: this.editForm.get(['createdBy']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISong>>) {
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

  trackUserExtraById(index: number, item: IUserExtra) {
    return item.id;
  }

  trackPlaylistById(index: number, item: IPlaylist) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
