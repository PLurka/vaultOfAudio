import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IEqualizerSetting, EqualizerSetting } from 'app/shared/model/equalizer-setting.model';
import { EqualizerSettingService } from './equalizer-setting.service';

@Component({
  selector: 'jhi-equalizer-setting-update',
  templateUrl: './equalizer-setting-update.component.html'
})
export class EqualizerSettingUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    equalizerName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    first: [null, [Validators.required]],
    second: [null, [Validators.required]],
    third: [null, [Validators.required]],
    fourth: [null, [Validators.required]],
    fifth: [null, [Validators.required]],
    sixth: [null, [Validators.required]],
    seventh: [null, [Validators.required]],
    eight: [null, [Validators.required]],
    ninth: [null, [Validators.required]],
    tenth: [null, [Validators.required]]
  });

  constructor(
    protected equalizerSettingService: EqualizerSettingService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ equalizerSetting }) => {
      this.updateForm(equalizerSetting);
    });
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
      tenth: equalizerSetting.tenth
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
      tenth: this.editForm.get(['tenth']).value
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
}
