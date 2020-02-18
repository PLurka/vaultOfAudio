import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IUserSong, UserSong } from 'app/shared/model/user-song.model';
import { UserSongService } from './user-song.service';
import { ISong } from 'app/shared/model/song.model';
import { SongService } from 'app/entities/song';
import { IUser, UserService } from 'app/core';

@Component({
  selector: 'jhi-user-song-update',
  templateUrl: './user-song-update.component.html'
})
export class UserSongUpdateComponent implements OnInit {
  isSaving: boolean;

  songs: ISong[];

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    song: [],
    user: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected userSongService: UserSongService,
    protected songService: SongService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ userSong }) => {
      this.updateForm(userSong);
    });
    this.songService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISong[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISong[]>) => response.body)
      )
      .subscribe((res: ISong[]) => (this.songs = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(userSong: IUserSong) {
    this.editForm.patchValue({
      id: userSong.id,
      song: userSong.song,
      user: userSong.user
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const userSong = this.createFromForm();
    if (userSong.id !== undefined) {
      this.subscribeToSaveResponse(this.userSongService.update(userSong));
    } else {
      this.subscribeToSaveResponse(this.userSongService.create(userSong));
    }
  }

  private createFromForm(): IUserSong {
    return {
      ...new UserSong(),
      id: this.editForm.get(['id']).value,
      song: this.editForm.get(['song']).value,
      user: this.editForm.get(['user']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserSong>>) {
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

  trackSongById(index: number, item: ISong) {
    return item.id;
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
