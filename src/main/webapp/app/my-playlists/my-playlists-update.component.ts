import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPlaylist, Playlist } from 'app/shared/model/playlist.model';
import { PlaylistService } from 'app/entities/playlist/playlist.service';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from 'app/entities/user-extra';
import { ISong } from 'app/shared/model/song.model';
import { SongService } from 'app/entities/song';
import { ICrowd } from 'app/shared/model/crowd.model';
import { CrowdService } from 'app/entities/crowd';

@Component({
  selector: 'jhi-my-playlists-update',
  templateUrl: './my-playlists-update.component.html'
})
export class MyPlaylistsUpdateComponent implements OnInit {
  isSaving: boolean;

  userextras: IUserExtra[];

  playlistUserExtras: IUserExtra[] = [];

  songs: ISong[];

  crowds: ICrowd[];

  editForm = this.fb.group({
    id: [],
    listName: [null, [Validators.required, Validators.maxLength(200)]],
    listDescription: [null, [Validators.maxLength(2000)]],
    users: [],
    songs: [],
    createdBy: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected playlistService: PlaylistService,
    protected userExtraService: UserExtraService,
    protected songService: SongService,
    protected http: HttpClient,
    protected https: HttpClient,
    protected crowdService: CrowdService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ playlist }) => {
      this.updateForm(playlist);
    });
    this.userExtraService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUserExtra[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUserExtra[]>) => response.body)
      )
      .subscribe((res: IUserExtra[]) => (this.userextras = res), (res: HttpErrorResponse) => this.onError(res.message));
    new SongService(this.http, this.https, this.userExtraService)
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISong[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISong[]>) => response.body)
      )
      .subscribe((res: ISong[]) => (this.songs = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.crowdService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICrowd[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICrowd[]>) => response.body)
      )
      .subscribe((res: ICrowd[]) => (this.crowds = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(playlist: IPlaylist) {
    if (playlist.users) this.playlistUserExtras = playlist.users;
    this.editForm.patchValue({
      id: playlist.id,
      listName: playlist.listName,
      listDescription: playlist.listDescription,
      users: playlist.users,
      songs: playlist.songs,
      createdBy: playlist.createdBy
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
    let userExt: IUserExtra[] = this.playlistUserExtras;
    userExt.push(this.songService.currentUserExtra);
    return {
      ...new Playlist(),
      id: this.editForm.get(['id']).value,
      listName: this.editForm.get(['listName']).value,
      listDescription: this.editForm.get(['listDescription']).value,
      users: userExt,
      songs: this.editForm.get(['songs']).value,
      createdBy: this.songService.currentUserExtra
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
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserExtraById(index: number, item: IUserExtra) {
    return item.id;
  }

  trackSongById(index: number, item: ISong) {
    return item.id;
  }

  trackCrowdById(index: number, item: ICrowd) {
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
