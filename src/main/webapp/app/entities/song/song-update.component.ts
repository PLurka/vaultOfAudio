import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
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

  editForm = this.fb.group({
    id: [],
    songId: [null, [Validators.required]],
    songName: [null, [Validators.required, Validators.maxLength(200)]],
    lyrics: [null, [Validators.maxLength(2000)]],
    authors: [null, [Validators.maxLength(100)]],
    songMetadata: [null, [Validators.required, Validators.maxLength(500)]],
    year: [],
    songDescription: [null, [Validators.maxLength(2000)]]
  });

  constructor(protected songService: SongService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ song }) => {
      this.updateForm(song);
    });
  }

  updateForm(song: ISong) {
    this.editForm.patchValue({
      id: song.id,
      songId: song.songId,
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
      songId: this.editForm.get(['songId']).value,
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
