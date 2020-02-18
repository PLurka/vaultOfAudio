import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IUserEqualizerSetting, UserEqualizerSetting } from 'app/shared/model/user-equalizer-setting.model';
import { UserEqualizerSettingService } from './user-equalizer-setting.service';
import { IEqualizerSetting } from 'app/shared/model/equalizer-setting.model';
import { EqualizerSettingService } from 'app/entities/equalizer-setting';
import { IUser, UserService } from 'app/core';

@Component({
  selector: 'jhi-user-equalizer-setting-update',
  templateUrl: './user-equalizer-setting-update.component.html'
})
export class UserEqualizerSettingUpdateComponent implements OnInit {
  isSaving: boolean;

  equalizersettings: IEqualizerSetting[];

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    equalizerSetting: [],
    user: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected userEqualizerSettingService: UserEqualizerSettingService,
    protected equalizerSettingService: EqualizerSettingService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ userEqualizerSetting }) => {
      this.updateForm(userEqualizerSetting);
    });
    this.equalizerSettingService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEqualizerSetting[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEqualizerSetting[]>) => response.body)
      )
      .subscribe((res: IEqualizerSetting[]) => (this.equalizersettings = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(userEqualizerSetting: IUserEqualizerSetting) {
    this.editForm.patchValue({
      id: userEqualizerSetting.id,
      equalizerSetting: userEqualizerSetting.equalizerSetting,
      user: userEqualizerSetting.user
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const userEqualizerSetting = this.createFromForm();
    if (userEqualizerSetting.id !== undefined) {
      this.subscribeToSaveResponse(this.userEqualizerSettingService.update(userEqualizerSetting));
    } else {
      this.subscribeToSaveResponse(this.userEqualizerSettingService.create(userEqualizerSetting));
    }
  }

  private createFromForm(): IUserEqualizerSetting {
    return {
      ...new UserEqualizerSetting(),
      id: this.editForm.get(['id']).value,
      equalizerSetting: this.editForm.get(['equalizerSetting']).value,
      user: this.editForm.get(['user']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserEqualizerSetting>>) {
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

  trackEqualizerSettingById(index: number, item: IEqualizerSetting) {
    return item.id;
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
