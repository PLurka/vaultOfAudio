import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IGroup, Group } from 'app/shared/model/group.model';
import { GroupService } from './group.service';

@Component({
  selector: 'jhi-group-update',
  templateUrl: './group-update.component.html'
})
export class GroupUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    groupId: [null, [Validators.required]],
    groupName: [null, [Validators.required, Validators.maxLength(200)]],
    groupDescription: [null, [Validators.maxLength(2000)]],
    groupPhoto: [],
    groupPhotoContentType: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected groupService: GroupService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ group }) => {
      this.updateForm(group);
    });
  }

  updateForm(group: IGroup) {
    this.editForm.patchValue({
      id: group.id,
      groupId: group.groupId,
      groupName: group.groupName,
      groupDescription: group.groupDescription,
      groupPhoto: group.groupPhoto,
      groupPhotoContentType: group.groupPhotoContentType
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const group = this.createFromForm();
    if (group.id !== undefined) {
      this.subscribeToSaveResponse(this.groupService.update(group));
    } else {
      this.subscribeToSaveResponse(this.groupService.create(group));
    }
  }

  private createFromForm(): IGroup {
    return {
      ...new Group(),
      id: this.editForm.get(['id']).value,
      groupId: this.editForm.get(['groupId']).value,
      groupName: this.editForm.get(['groupName']).value,
      groupDescription: this.editForm.get(['groupDescription']).value,
      groupPhotoContentType: this.editForm.get(['groupPhotoContentType']).value,
      groupPhoto: this.editForm.get(['groupPhoto']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGroup>>) {
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
}
