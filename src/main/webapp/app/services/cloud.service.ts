// src/app/services/cloud.service.ts
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  files: any = [
    // tslint:disable-next-line: max-line-length
    {
      url: '../../content/audio/8.mp3',
      name: 'Good Time, Bad Times',
      artist: 'The Ace of Void'
    },
    {
      // tslint:disable-next-line: max-line-length
      url: '../../content/audio/5.mp3',
      name: 'Tough Love',
      artist: 'The Ace of Void'
    },
    {
      url: '../../content/audio/12.mp3',
      name: 'Wander',
      artist: 'The Ace of Void'
    },
    {
      url: '../../content/audio/13.mp3',
      name: 'Anywhere',
      artist: 'The Ace of Void'
    }
  ];

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

  addFTPFile(blob: Blob, url: String, name: String) {
    this.files.push({
      url: url,
      name: name,
      artist: 'unknown',
      file: blob
    });
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  removeAll() {
    this.files.length = 0;
  }
}
