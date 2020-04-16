import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IEqualizerSetting, EqualizerSetting } from 'app/shared/model/equalizer-setting.model';
import { EqualizerSettingService } from 'app/entities/equalizer-setting/equalizer-setting.service';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from 'app/entities/user-extra';

@Component({
  selector: 'jhi-my-eq-update',
  templateUrl: './my-eq-update.component.html'
})
export class MyEqUpdateComponent implements OnInit {
  isSaving: boolean;

  userextras: IUserExtra[];

  editForm = this.fb.group({
    id: [],
    equalizerName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    first: [null, [Validators.required, Validators.min(-15), Validators.max(15)]],
    second: [null, [Validators.required, Validators.min(-15), Validators.max(15)]],
    third: [null, [Validators.required, Validators.min(-15), Validators.max(15)]],
    fourth: [null, [Validators.required, Validators.min(-15), Validators.max(15)]],
    fifth: [null, [Validators.required, Validators.min(-15), Validators.max(15)]],
    sixth: [null, [Validators.required, Validators.min(-15), Validators.max(15)]],
    seventh: [null, [Validators.required, Validators.min(-15), Validators.max(15)]],
    eight: [null, [Validators.required, Validators.min(-15), Validators.max(15)]],
    ninth: [null, [Validators.required, Validators.min(-15), Validators.max(15)]],
    tenth: [null, [Validators.required, Validators.min(-15), Validators.max(15)]],
    users: [],
    createdBy: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected equalizerSettingService: EqualizerSettingService,
    protected userExtraService: UserExtraService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ equalizerSetting }) => {
      this.updateForm(equalizerSetting);
    });
    this.userExtraService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUserExtra[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUserExtra[]>) => response.body)
      )
      .subscribe((res: IUserExtra[]) => (this.userextras = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(equalizerSetting: IEqualizerSetting) {
    this.editForm.patchValue({
      id: equalizerSetting.id,
      equalizerName: equalizerSetting.equalizerName,
      first: equalizerSetting.first,
      second: equalizerSetting.second,
      third: equalizerSetting.third,
      fourth: equalizerSetting.fourth,
      fifth: equalizerSetting.fifth,
      sixth: equalizerSetting.sixth,
      seventh: equalizerSetting.seventh,
      eight: equalizerSetting.eight,
      ninth: equalizerSetting.ninth,
      tenth: equalizerSetting.tenth,
      users: equalizerSetting.users,
      createdBy: equalizerSetting.createdBy
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const equalizerSetting = this.createFromForm();
    if (equalizerSetting.id !== undefined) {
      this.subscribeToSaveResponse(this.equalizerSettingService.update(equalizerSetting));
    } else {
      this.subscribeToSaveResponse(this.equalizerSettingService.create(equalizerSetting));
    }
  }

  private createFromForm(): IEqualizerSetting {
    return {
      ...new EqualizerSetting(),
      id: this.editForm.get(['id']).value,
      equalizerName: this.editForm.get(['equalizerName']).value,
      first: this.editForm.get(['first']).value,
      second: this.editForm.get(['second']).value,
      third: this.editForm.get(['third']).value,
      fourth: this.editForm.get(['fourth']).value,
      fifth: this.editForm.get(['fifth']).value,
      sixth: this.editForm.get(['sixth']).value,
      seventh: this.editForm.get(['seventh']).value,
      eight: this.editForm.get(['eight']).value,
      ninth: this.editForm.get(['ninth']).value,
      tenth: this.editForm.get(['tenth']).value,
      users: this.editForm.get(['users']).value,
      createdBy: this.editForm.get(['createdBy']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEqualizerSetting>>) {
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
