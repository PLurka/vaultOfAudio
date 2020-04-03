import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IUserExtra, UserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from './user-extra.service';
import { IUser, UserService } from 'app/core';
import { IEqualizerSetting } from 'app/shared/model/equalizer-setting.model';
import { EqualizerSettingService } from 'app/entities/equalizer-setting';
import { ISong } from 'app/shared/model/song.model';
import { SongService } from 'app/entities/song';
import { IPlaylist } from 'app/shared/model/playlist.model';
import { PlaylistService } from 'app/entities/playlist';
import { ICrowd } from 'app/shared/model/crowd.model';
import { CrowdService } from 'app/entities/crowd';

@Component({
  selector: 'jhi-user-extra-update',
  templateUrl: './user-extra-update.component.html'
})
export class UserExtraUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  equalizersettings: IEqualizerSetting[];

  songs: ISong[];

  playlists: IPlaylist[];

  crowds: ICrowd[];

  editForm = this.fb.group({
    id: [],
    user: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected userExtraService: UserExtraService,
    protected userService: UserService,
    protected equalizerSettingService: EqualizerSettingService,
    protected songService: SongService,
    protected playlistService: PlaylistService,
    protected crowdService: CrowdService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ userExtra }) => {
      this.updateForm(userExtra);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.equalizerSettingService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEqualizerSetting[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEqualizerSetting[]>) => response.body)
      )
      .subscribe((res: IEqualizerSetting[]) => (this.equalizersettings = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.songService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISong[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISong[]>) => response.body)
      )
      .subscribe((res: ISong[]) => (this.songs = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.playlistService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlaylist[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlaylist[]>) => response.body)
      )
      .subscribe((res: IPlaylist[]) => (this.playlists = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.crowdService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICrowd[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICrowd[]>) => response.body)
      )
      .subscribe((res: ICrowd[]) => (this.crowds = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(userExtra: IUserExtra) {
    this.editForm.patchValue({
      id: userExtra.id,
      user: userExtra.user
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const userExtra = this.createFromForm();
    if (userExtra.id !== undefined) {
      this.subscribeToSaveResponse(this.userExtraService.update(userExtra));
    } else {
      this.subscribeToSaveResponse(this.userExtraService.create(userExtra));
    }
  }

  private createFromForm(): IUserExtra {
    return {
      ...new UserExtra(),
      id: this.editForm.get(['id']).value,
      user: this.editForm.get(['user']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserExtra>>) {
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

  trackUserById(index: number, item: IUser) {
    return item.id;
  }

  trackEqualizerSettingById(index: number, item: IEqualizerSetting) {
    return item.id;
  }

  trackSongById(index: number, item: ISong) {
    return item.id;
  }

  trackPlaylistById(index: number, item: IPlaylist) {
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
