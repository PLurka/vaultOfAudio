import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IUserList, UserList } from 'app/shared/model/user-list.model';
import { UserListService } from './user-list.service';
import { IPlaylist } from 'app/shared/model/playlist.model';
import { PlaylistService } from 'app/entities/playlist';
import { IUser, UserService } from 'app/core';

@Component({
  selector: 'jhi-user-list-update',
  templateUrl: './user-list-update.component.html'
})
export class UserListUpdateComponent implements OnInit {
  isSaving: boolean;

  playlists: IPlaylist[];

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    listId: [],
    userId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected userListService: UserListService,
    protected playlistService: PlaylistService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ userList }) => {
      this.updateForm(userList);
    });
    this.playlistService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlaylist[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlaylist[]>) => response.body)
      )
      .subscribe((res: IPlaylist[]) => (this.playlists = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(userList: IUserList) {
    this.editForm.patchValue({
      id: userList.id,
      listId: userList.listId,
      userId: userList.userId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const userList = this.createFromForm();
    if (userList.id !== undefined) {
      this.subscribeToSaveResponse(this.userListService.update(userList));
    } else {
      this.subscribeToSaveResponse(this.userListService.create(userList));
    }
  }

  private createFromForm(): IUserList {
    return {
      ...new UserList(),
      id: this.editForm.get(['id']).value,
      listId: this.editForm.get(['listId']).value,
      userId: this.editForm.get(['userId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserList>>) {
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

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
