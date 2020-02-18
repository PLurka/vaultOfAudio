import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IGroupList, GroupList } from 'app/shared/model/group-list.model';
import { GroupListService } from './group-list.service';
import { IGroup } from 'app/shared/model/group.model';
import { GroupService } from 'app/entities/group';
import { IPlaylist } from 'app/shared/model/playlist.model';
import { PlaylistService } from 'app/entities/playlist';

@Component({
  selector: 'jhi-group-list-update',
  templateUrl: './group-list-update.component.html'
})
export class GroupListUpdateComponent implements OnInit {
  isSaving: boolean;

  groups: IGroup[];

  playlists: IPlaylist[];

  editForm = this.fb.group({
    id: [],
    groupId: [],
    listId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected groupListService: GroupListService,
    protected groupService: GroupService,
    protected playlistService: PlaylistService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ groupList }) => {
      this.updateForm(groupList);
    });
    this.groupService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IGroup[]>) => mayBeOk.ok),
        map((response: HttpResponse<IGroup[]>) => response.body)
      )
      .subscribe((res: IGroup[]) => (this.groups = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.playlistService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlaylist[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlaylist[]>) => response.body)
      )
      .subscribe((res: IPlaylist[]) => (this.playlists = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(groupList: IGroupList) {
    this.editForm.patchValue({
      id: groupList.id,
      groupId: groupList.groupId,
      listId: groupList.listId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const groupList = this.createFromForm();
    if (groupList.id !== undefined) {
      this.subscribeToSaveResponse(this.groupListService.update(groupList));
    } else {
      this.subscribeToSaveResponse(this.groupListService.create(groupList));
    }
  }

  private createFromForm(): IGroupList {
    return {
      ...new GroupList(),
      id: this.editForm.get(['id']).value,
      groupId: this.editForm.get(['groupId']).value,
      listId: this.editForm.get(['listId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGroupList>>) {
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

  trackGroupById(index: number, item: IGroup) {
    return item.id;
  }

  trackPlaylistById(index: number, item: IPlaylist) {
    return item.id;
  }
}
