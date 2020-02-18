import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IUserGroup, UserGroup } from 'app/shared/model/user-group.model';
import { UserGroupService } from './user-group.service';
import { IGroup } from 'app/shared/model/group.model';
import { GroupService } from 'app/entities/group';
import { IUser, UserService } from 'app/core';

@Component({
  selector: 'jhi-user-group-update',
  templateUrl: './user-group-update.component.html'
})
export class UserGroupUpdateComponent implements OnInit {
  isSaving: boolean;

  groups: IGroup[];

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    group: [],
    user: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected userGroupService: UserGroupService,
    protected groupService: GroupService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ userGroup }) => {
      this.updateForm(userGroup);
    });
    this.groupService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IGroup[]>) => mayBeOk.ok),
        map((response: HttpResponse<IGroup[]>) => response.body)
      )
      .subscribe((res: IGroup[]) => (this.groups = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(userGroup: IUserGroup) {
    this.editForm.patchValue({
      id: userGroup.id,
      group: userGroup.group,
      user: userGroup.user
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const userGroup = this.createFromForm();
    if (userGroup.id !== undefined) {
      this.subscribeToSaveResponse(this.userGroupService.update(userGroup));
    } else {
      this.subscribeToSaveResponse(this.userGroupService.create(userGroup));
    }
  }

  private createFromForm(): IUserGroup {
    return {
      ...new UserGroup(),
      id: this.editForm.get(['id']).value,
      group: this.editForm.get(['group']).value,
      user: this.editForm.get(['user']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserGroup>>) {
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

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
