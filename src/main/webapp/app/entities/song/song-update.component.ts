import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ISong, Song } from 'app/shared/model/song.model';
import { SongService } from './song.service';

@Component({
  selector: 'jhi-song-update',
  templateUrl: './song-update.component.html'
})
export class SongUpdateComponent implements OnInit {
  isSaving: boolean;

  title = 'File-Upload-Save';
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;

  editForm = this.fb.group({
    id: [],
    songName: [null, [Validators.required, Validators.maxLength(200)]],
    lyrics: [null, [Validators.maxLength(2000)]],
    authors: [null, [Validators.maxLength(100)]],
    songMetadata: [null, [Validators.required, Validators.maxLength(500)]],
    year: [],
    songDescription: [null, [Validators.maxLength(2000)]]
  });

  constructor(protected songService: SongService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  downloadFile() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '_File_Saved_Path');
    link.setAttribute('download', 'file_name.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  change($event) {
    this.changeImage = true;
  }

  changedImage(event) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.songService
      .pushFileToStorage(
        this.currentFileUpload,
        new Song(
          this.editForm.get(['id']).value,
          this.editForm.get(['songName']).value,
          this.editForm.get(['lyrics']).value,
          this.editForm.get(['authors']).value,
          this.editForm.get(['songMetadata']).value,
          this.editForm.get(['year']).value,
          this.editForm.get(['songDescription']).value,
          null,
          null
        )
      )
      .subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          alert('File Successfully Uploaded');
        }
        this.selectedFile = undefined;
      });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ song }) => {
      this.updateForm(song);
    });
  }

  updateForm(song: ISong) {
    this.editForm.patchValue({
      id: song.id,
      songName: song.songName,
      lyrics: song.lyrics,
      authors: song.authors,
      songMetadata: song.songMetadata,
      year: song.year,
      songDescription: song.songDescription
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const song = this.createFromForm();
    if (song.id !== undefined) {
      this.subscribeToSaveResponse(this.songService.update(song));
    } else {
      this.subscribeToSaveResponse(this.songService.create(song));
    }
  }

  private createFromForm(): ISong {
    return {
      ...new Song(),
      id: this.editForm.get(['id']).value,
      songName: this.editForm.get(['songName']).value,
      lyrics: this.editForm.get(['lyrics']).value,
      authors: this.editForm.get(['authors']).value,
      songMetadata: this.editForm.get(['songMetadata']).value,
      year: this.editForm.get(['year']).value,
      songDescription: this.editForm.get(['songDescription']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISong>>) {
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
