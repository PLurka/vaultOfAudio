import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ICrowd, Crowd } from 'app/shared/model/crowd.model';
import { CrowdService } from 'app/entities/crowd/crowd.service';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from 'app/entities/user-extra';
import { IPlaylist } from 'app/shared/model/playlist.model';
import { PlaylistService } from 'app/entities/playlist';
import { SongService } from 'app/entities/song';

@Component({
  selector: 'jhi-my-crowds-update',
  templateUrl: './my-crowds-update.component.html'
})
export class MyCrowdsUpdateComponent implements OnInit {
  isSaving: boolean;

  userextras: IUserExtra[];

  crowdUserExtras: IUserExtra[];

  playlists: IPlaylist[];

  imageUrl;

  editForm = this.fb.group({
    id: [],
    crowdName: [null, [Validators.required, Validators.maxLength(200)]],
    crowdDescription: [null, [Validators.maxLength(2000)]],
    crowdPhoto: [],
    crowdPhotoContentType: [],
    users: [],
    accepteds: [],
    playlists: [],
    createdBy: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected crowdService: CrowdService,
    protected userExtraService: UserExtraService,
    protected songService: SongService,
    protected playlistService: PlaylistService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ crowd }) => {
      this.updateForm(crowd);
    });
    this.userExtraService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUserExtra[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUserExtra[]>) => response.body)
      )
      .subscribe((res: IUserExtra[]) => (this.userextras = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.playlistService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlaylist[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlaylist[]>) => response.body)
      )
      .subscribe((res: IPlaylist[]) => (this.playlists = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.imageUrl = 'data:' + this.editForm.get('crowdPhotoContentType').value + ';base64,' + this.editForm.get('crowdPhoto').value;
  }

  updateForm(crowd: ICrowd) {
    if (crowd.users) this.crowdUserExtras = crowd.users;
    this.editForm.patchValue({
      id: crowd.id,
      crowdName: crowd.crowdName,
      crowdDescription: crowd.crowdDescription,
      crowdPhoto: crowd.crowdPhoto,
      crowdPhotoContentType: crowd.crowdPhotoContentType,
      users: crowd.users,
      accepteds: crowd.accepteds,
      playlists: crowd.playlists,
      createdBy: crowd.createdBy
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
    const crowd = this.createFromForm();
    if (crowd.id !== undefined) {
      this.subscribeToSaveResponse(this.crowdService.update(crowd));
    } else {
      this.subscribeToSaveResponse(this.crowdService.create(crowd));
    }
  }

  private createFromForm(): ICrowd {
    let userExt: IUserExtra[] = this.crowdUserExtras;
    userExt.push(this.songService.currentUserExtra);
    return {
      ...new Crowd(),
      id: this.editForm.get(['id']).value,
      crowdName: this.editForm.get(['crowdName']).value,
      crowdDescription: this.editForm.get(['crowdDescription']).value,
      crowdPhotoContentType: this.editForm.get(['crowdPhotoContentType']).value,
      crowdPhoto: this.editForm.get(['crowdPhoto']).value,
      users: userExt,
      accepteds: this.editForm.get(['accepteds']).value,
      playlists: this.editForm.get(['playlists']).value,
      createdBy: this.songService.currentUserExtra
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrowd>>) {
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

  trackPlaylistById(index: number, item: IPlaylist) {
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
