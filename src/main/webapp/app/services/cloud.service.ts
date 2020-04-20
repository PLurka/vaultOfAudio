// src/app/services/cloud.service.ts
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  files: any = [];

  getFiles() {
    return of(this.files);
  }

  addFiles(files: FileList) {
    for (let i = 0; i < files.length; ++i) {
      this.files.push({
        url: URL.createObjectURL(files.item(i)),
        name: files.item(i).name,
        artist: 'unknown',
        file: files.item(i)
      });
    }
  }

  addFTPFile(name: string, artist: string, metaData: string, lyrics: string) {
    this.files.push({
      name: name,
      artist: artist,
      metaData: metaData,
      lyrics: lyrics
    });
  }

  addFTPFile1(blob: Blob, url: string, name: string, artist: string, metaData: string) {
    this.files.push({
      url: url,
      name: name,
      artist: artist,
      file: blob,
      metaData: metaData
    });
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  removeAll() {
    this.files.length = 0;
  }
}
