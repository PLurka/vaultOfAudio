import { Component, OnInit, OnDestroy } from '@angular/core';
import { AudioService } from '../services/audio/audio.service';
import { CloudService } from '../services/cloud.service';
import { StreamState } from '../interfaces/stream-state';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { EqualizerSetting, IEqualizerSetting } from 'app/shared/model/equalizer-setting.model';
import { EqualizerSettingService } from 'app/entities/equalizer-setting/equalizer-setting.service';
import { PlaylistService } from 'app/entities/playlist/playlist.service';
import { IPlaylist } from 'app/shared/model/playlist.model';
import { SongService } from 'app/entities/song';
import { ISong } from 'app/shared/model/song.model';
import { CrowdService } from 'app/entities/crowd';
import { ICrowd } from 'app/shared/model/crowd.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { IUserExtra } from 'app/shared/model/user-extra.model';

type EntityResponseType = HttpResponse<IEqualizerSetting>;

@Component({
  selector: 'jhi-player',
  templateUrl: './player.component.html',
  styleUrls: ['player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
  message: string;
  files: Array<any> = [];
  state: StreamState;
  currentFile: any = {};
  fileToUpload: File = null;
  visualization: boolean;
  shuffle: boolean = false;
  auto: boolean = true;
  repeat: boolean = false;
  currentUser: IUserExtra;
  currentLyrics: string = 'No song is playing at the moment...';
  currentState: string;

  audioCtx = this.audioService.audioCtx; //new (window['AudioContext'] || window['webkitAudioContext'])();
  equalizerSettings: IEqualizerSetting[];
  playlists: IPlaylist[];
  crowdPlaylists: IPlaylist[];
  songs: ISong[] = [];
  newEqualizerSettings: IEqualizerSetting = new EqualizerSetting(
    null,
    'newEq',
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    [this.currentUser],
    this.currentUser
  );

  constructor(
    protected crowdService: CrowdService,
    protected playlistService: PlaylistService,
    protected equalizerSettingService: EqualizerSettingService,
    protected jhiAlertService: JhiAlertService,
    public audioService: AudioService,
    public cloudService: CloudService,
    public songService: SongService
  ) {
    // get media files
    cloudService.getFiles().subscribe(files => {
      this.files = files;
    });

    // listen to stream state
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });

    this.songService
      .getLogin()
      .pipe(
        filter((res: HttpResponse<string>) => res.ok),
        map((res: HttpResponse<string>) => res.body)
      )
      .subscribe((res: string) => {
        if (res !== undefined) {
          console.error('getLogin(): ' + res);
          this.songService
            .query()
            .pipe(
              filter((resp: HttpResponse<ISong[]>) => resp.ok),
              map((resp: HttpResponse<ISong[]>) => resp.body)
            )
            .subscribe(
              (resp: ISong[]) => {
                if (resp !== null) {
                  resp.forEach(song => {
                    song.users.forEach(user => {
                      if (user['user']['login'] === res) {
                        this.songs.push(song);
                      }
                    });
                  });
                  this.removeAll();
                  this.loadAll();
                }
              },
              (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
      });
  }

  loadPlaylists() {
    let playlistsTemp: IPlaylist[] = [];
    let crowdPlaylistsTemp: IPlaylist[] = [];
    this.songService
      .getLogin()
      .pipe(
        filter((res: HttpResponse<string>) => res.ok),
        map((res: HttpResponse<string>) => res.body)
      )
      .subscribe((res: string) => {
        if (res != undefined) {
          console.error('getLogin(): ' + res);
          this.playlistService
            .query()
            .pipe(
              filter((resp: HttpResponse<IPlaylist[]>) => resp.ok),
              map((resp: HttpResponse<IPlaylist[]>) => resp.body)
            )
            .subscribe(
              (resp: IPlaylist[]) => {
                this.crowdService
                  .query()
                  .pipe(
                    filter((respo: HttpResponse<ICrowd[]>) => respo.ok),
                    map((respo: HttpResponse<ICrowd[]>) => respo.body)
                  )
                  .subscribe(
                    (respo: ICrowd[]) => {
                      respo.forEach(crowd => {
                        crowd.users.forEach(user => {
                          if (user['user']['login'] === res) {
                            this.currentUser = user;
                            this.equalizerSettings.slice(0).forEach(eqSet => {
                              if (!eqSet.users && eqSet.createdBy.user.login !== 'system') {
                                this.equalizerSettings.splice(this.equalizerSettings.indexOf(eqSet), 1);
                              } else {
                                let currentUserisUser = false;
                                eqSet.users.forEach(eqUser => {
                                  if (eqUser.user.login === this.currentUser.user.login) {
                                    currentUserisUser = true;
                                  }
                                });
                                if (!currentUserisUser && eqSet.createdBy.user.login !== 'system') {
                                  this.equalizerSettings.splice(this.equalizerSettings.indexOf(eqSet), 1);
                                }
                              }
                            });
                            crowd.playlists.forEach(playlist => {
                              resp.forEach(function(playlst) {
                                if (playlist.id === playlst.id) crowdPlaylistsTemp.push(playlst);
                              });
                            });
                          }
                        });
                      });
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                  );
                resp.forEach(function(playlist) {
                  playlist.users.forEach(function(user) {
                    if (user['user']['login'] === res) {
                      playlistsTemp.push(playlist);
                    }
                  });
                });
              },
              (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
      });
    this.playlists = playlistsTemp;
    this.crowdPlaylists = crowdPlaylistsTemp;
  }

  loadEqSettings() {
    this.equalizerSettingService
      .query()
      .pipe(
        filter((res: HttpResponse<IEqualizerSetting[]>) => res.ok),
        map((res: HttpResponse<IEqualizerSetting[]>) => res.body)
      )
      .subscribe(
        (res: IEqualizerSetting[]) => {
          this.equalizerSettings = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.cloudService.addFiles(files);
  }

  removeFile(index: number) {
    this.cloudService.removeFile(index);
    if (index === this.currentFile.index) {
      this.currentFile.index = null;
      this.stop();
    }
  }

  removeAll() {
    this.stop();
    this.currentFile.index = null;
    this.cloudService.removeAll();
  }

  loadFile(path: string) {
    this.songService.pullPromiseFileFromStorage(path).then(blob => {
      let blo = new Blob([blob], { type: 'audio/mp3' });
      let url = URL.createObjectURL(blob);
      let name = path;
      this.cloudService.addFTPFile1(blo, url, name, 'unknown', null);
    });
  }

  loadAll() {
    this.songs.forEach(song => {
      this.cloudService.addFTPFile(song.songName, song.authors, song.songMetadata, song.lyrics);
    });
  }

  loadFromPlaylist(event) {
    this.stop();
    this.currentFile.index = null;
    this.cloudService.removeAll();
    console.error('event.returnValue: ' + event.currentTarget['selectedOptions'][0]['value']);

    let alreadyLoaded = false;
    this.playlists.forEach(playlist => {
      let selectedId = +event.currentTarget['selectedOptions'][0]['value'];
      if (playlist.id === selectedId) {
        playlist.songs.forEach(song => {
          this.cloudService.addFTPFile(song.songName, song.authors, song.songMetadata, song.lyrics);
        });
        alreadyLoaded = true;
      }
    });
    if (alreadyLoaded === false) {
      this.crowdPlaylists.forEach(playlist => {
        let selectedId = +event.currentTarget['selectedOptions'][0]['value'];
        if (playlist.id === selectedId) {
          if (playlist.songs != null)
            playlist.songs.forEach(song => {
              this.cloudService.addFTPFile(song.songName, song.authors, song.songMetadata, song.lyrics);
            });
        }
      });
    }
  }

  setPlayType(event) {
    let selectedValue = event.currentTarget['selectedOptions'][0]['value'];

    if (selectedValue === 'auto') {
      this.auto = true;
      this.repeat = false;
      this.shuffle = false;
    }
    if (selectedValue === 'autoRepeat') {
      this.auto = true;
      this.repeat = true;
      this.shuffle = false;
    }
    if (selectedValue === 'shuffle') {
      this.auto = false;
      this.repeat = false;
      this.shuffle = true;
    }
    if (selectedValue === 'single') {
      this.auto = false;
      this.repeat = false;
      this.shuffle = false;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
    if (this.currentFile.index === event.previousIndex) this.currentFile.index = event.currentIndex;
    else if (this.currentFile.index === event.currentIndex && event.previousIndex < event.currentIndex)
      this.currentFile.index = event.currentIndex - 1;
    else if (this.currentFile.index === event.currentIndex && event.previousIndex > event.currentIndex)
      this.currentFile.index = event.currentIndex + 1;
  }

  saveCurrentEq() /*: Observable<EntityResponseType> */ {
    //let newEq;
    let alreadyExists = false;
    let createdByCurrentUser = false;
    this.equalizerSettings.forEach(equalizerSetting => {
      if (equalizerSetting.equalizerName === this.newEqualizerSettings.equalizerName) {
        if (equalizerSetting.createdBy.user.login === this.currentUser.user.login) {
          this.newEqualizerSettings.id = equalizerSetting.id;
          this.equalizerSettingService
            .update(this.newEqualizerSettings)
            .pipe(
              filter((res: HttpResponse<IEqualizerSetting>) => res.ok),
              map((res: HttpResponse<IEqualizerSetting>) => res.body)
            )
            .subscribe((res: IEqualizerSetting) => {});
          alreadyExists = true;
          createdByCurrentUser = true;
          let settingFound = false;
          let existingIndex: number = this.equalizerSettings.length;
          for (let setting of this.equalizerSettings) {
            if (setting.equalizerName === this.newEqualizerSettings.equalizerName) {
              existingIndex = this.equalizerSettings.indexOf(setting);
              setting = this.newEqualizerSettings;
              settingFound = true;
            }
            if (settingFound) break;
          }
          this.loadEqSettings();
        }
      } else {
        alreadyExists = true;
      }
    });

    if (!alreadyExists || (alreadyExists && !createdByCurrentUser)) {
      if (alreadyExists) {
        this.newEqualizerSettings.equalizerName += '-by-' + this.currentUser.user.login;
      }
      this.equalizerSettingService
        .create(this.newEqualizerSettings)
        .pipe(
          filter((res: HttpResponse<IEqualizerSetting>) => res.ok),
          map((res: HttpResponse<IEqualizerSetting>) => res.body)
        )
        .subscribe((res: IEqualizerSetting) => {});
      this.equalizerSettings.push(this.newEqualizerSettings);
    }

    this.loadEqSettings();
  }

  playStream(url) {
    this.audioService.playStream(url).subscribe(events => {
      this.currentState = events['type'];
      if (events['type'] === 'ended' && this.shuffle.valueOf()) {
        this.next();
      }
      // listening for fun here
      else if (!this.isLastPlaying() && this.auto.valueOf()) {
        if (events['type'] === 'ended') {
          this.next();
        }
      } else {
        if (events['type'] === 'ended' && this.repeat.valueOf()) this.openFile(this.files[0], 0);
      }
    });
  }

  playStreamFromStream(url) {
    this.songService.streamFile(url).subscribe(res => {
      const blobUrl = URL.createObjectURL(res);
      this.audioService.playStream(blobUrl).subscribe(events => {
        this.currentState = events['type'];
        if (events['type'] === 'ended' && this.shuffle.valueOf()) {
          this.next();
        }
        // listening for fun here
        else if (!this.isLastPlaying() && this.auto.valueOf()) {
          if (events['type'] === 'ended') {
            this.next();
          }
        } else {
          if (events['type'] === 'ended' && this.repeat.valueOf()) this.openFile(this.files[0], 0);
        }
      });
    });
  }

  openFile(file, index) {
    this.currentFile = { index, file };
    this.audioService.stop();
    if (file.metaData) {
      this.playStreamFromStream(file.metaData);
      this.currentLyrics = file.lyrics;
    } else if (file.url) this.playStream(file.url);
    else this.playStream(URL.createObjectURL(file));
  }

  pause() {
    this.audioService.pause();
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  play() {
    this.audioService.play();
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    if (!this.shuffle.valueOf()) {
      const index = this.currentFile.index + 1;
      const file = this.files[index];
      this.openFile(file, index);
    } else {
      let rand = Math.floor(Math.random() * this.files.length);
      this.openFile(this.files[rand], rand);
    }
  }

  previous() {
    if (!this.shuffle.valueOf()) {
      const index = this.currentFile.index - 1;
      const file = this.files[index];
      this.openFile(file, index);
    } else {
      let rand = Math.floor(Math.random() * this.files.length);
      this.openFile(this.files[rand], rand);
    }
  }

  showHide() {
    let x = document.getElementById('eq');
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  showHideAdv() {
    let x = document.getElementById('adv');
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  ngOnInit() {
    let dlBtn = <HTMLButtonElement>document.getElementById('downloadAll');

    this.visualization = true;
    // get the audio element
    let audioElement = this.audioService.getElement();

    // pass it into the audio context
    let track = this.audioService.getTrack(); //this.audioCtx.createMediaElementSource(audioElement);

    const gainNode = this.audioCtx.createGain();

    const volumeControl = <HTMLInputElement>document.querySelector('#volume');

    const volumeText = document.querySelector('#volumeText');

    const pannerOptions = { pan: 0 };
    const panner = new StereoPannerNode(this.audioCtx, pannerOptions);

    const pannerControl = <HTMLInputElement>document.querySelector('#panner');

    const balanceText = document.querySelector('#balanceText');

    const audioFile = document.getElementById('file');

    const resetButton = document.getElementById('resetButton');

    const resetFiltersButton = document.getElementById('resetFiltersButton');

    const lyrics = document.getElementById('lyrics');

    lyrics.hidden = true;

    const lyr = document.getElementById('lyr');

    //CREATION OF EQUALIZER FILTERS
    let firstEq = this.audioCtx.createBiquadFilter();
    firstEq.type = 'lowshelf';
    firstEq.frequency.value = 31.0;
    firstEq.gain.value = 1.0;

    let secondEq = this.audioCtx.createBiquadFilter();
    secondEq.type = 'peaking';
    secondEq.frequency.value = 62.0;
    secondEq.gain.value = 1.0;

    let thirdEq = this.audioCtx.createBiquadFilter();
    thirdEq.type = 'peaking';
    thirdEq.frequency.value = 125.0;
    thirdEq.gain.value = 1.0;

    let fourthEq = this.audioCtx.createBiquadFilter();
    fourthEq.type = 'peaking';
    fourthEq.frequency.value = 250.0;
    fourthEq.gain.value = 1.0;

    let fifthEq = this.audioCtx.createBiquadFilter();
    fifthEq.type = 'peaking';
    fifthEq.frequency.value = 500.0;
    fifthEq.gain.value = 1.0;

    let sixthEq = this.audioCtx.createBiquadFilter();
    sixthEq.type = 'peaking';
    sixthEq.frequency.value = 1000.0;
    sixthEq.gain.value = 1.0;

    let seventhEq = this.audioCtx.createBiquadFilter();
    seventhEq.type = 'peaking';
    seventhEq.frequency.value = 2000.0;
    seventhEq.gain.value = 1.0;

    let eightEq = this.audioCtx.createBiquadFilter();
    eightEq.type = 'peaking';
    eightEq.frequency.value = 4000.0;
    eightEq.gain.value = 1.0;

    let ninthEq = this.audioCtx.createBiquadFilter();
    ninthEq.type = 'peaking';
    ninthEq.frequency.value = 8000.0;
    ninthEq.gain.value = 1.0;

    let tenthEq = this.audioCtx.createBiquadFilter();
    tenthEq.type = 'highshelf';
    tenthEq.frequency.value = 16000.0;
    tenthEq.gain.value = 1.0;

    let firstEqControl = <HTMLInputElement>document.getElementById('31');

    let secondEqControl = <HTMLInputElement>document.getElementById('62');

    let thirdEqControl = <HTMLInputElement>document.getElementById('125');

    let fourthEqControl = <HTMLInputElement>document.getElementById('250');

    let fifthEqControl = <HTMLInputElement>document.getElementById('500');

    let sixthEqControl = <HTMLInputElement>document.getElementById('1k');

    let seventhEqControl = <HTMLInputElement>document.getElementById('2k');

    let eightEqControl = <HTMLInputElement>document.getElementById('4k');

    let ninthEqControl = <HTMLInputElement>document.getElementById('8k');

    let tenthEqControl = <HTMLInputElement>document.getElementById('16k');

    let eqChooser = <HTMLSelectElement>document.getElementById('equalizers');

    let playlistChooser = <HTMLSelectElement>document.getElementById('playlists');

    let crowdPlaylistChooser = <HTMLSelectElement>document.getElementById('crowdPlaylists');

    let newEqName = <HTMLInputElement>document.getElementById('newEqName');

    // CREATION OF ALL OTHER FILTERS
    let lowpass = this.audioCtx.createBiquadFilter();
    lowpass.type = 'lowpass';

    let highpass = this.audioCtx.createBiquadFilter();
    highpass.type = 'highpass';

    let bandpass = this.audioCtx.createBiquadFilter();
    highpass.type = 'bandpass';

    let lowshelf = this.audioCtx.createBiquadFilter();
    lowshelf.type = 'lowshelf';

    let highshelf = this.audioCtx.createBiquadFilter();
    highshelf.type = 'highshelf';

    let peaking = this.audioCtx.createBiquadFilter();
    peaking.type = 'peaking';

    let notch = this.audioCtx.createBiquadFilter();
    notch.type = 'notch';

    let allpass = this.audioCtx.createBiquadFilter();
    allpass.type = 'allpass';

    let lpffreq = <HTMLInputElement>document.getElementById('lpffreq');
    let lpffreqi = <HTMLInputElement>document.getElementById('lpffreqi');
    let lpfpeak = <HTMLInputElement>document.getElementById('lpfpeak');
    let lpfpeaki = <HTMLInputElement>document.getElementById('lpfpeaki');
    let lpfcheck = <HTMLInputElement>document.getElementById('lpfcheck');

    let hpffreq = <HTMLInputElement>document.getElementById('hpffreq');
    let hpffreqi = <HTMLInputElement>document.getElementById('hpffreqi');
    let hpfpeak = <HTMLInputElement>document.getElementById('hpfpeak');
    let hpfpeaki = <HTMLInputElement>document.getElementById('hpfpeaki');
    let hpfcheck = <HTMLInputElement>document.getElementById('hpfcheck');

    let bpffreq = <HTMLInputElement>document.getElementById('bpffreq');
    let bpffreqi = <HTMLInputElement>document.getElementById('bpffreqi');
    let bpfbandsize = <HTMLInputElement>document.getElementById('bpfbandsize');
    let bpfbandsizei = <HTMLInputElement>document.getElementById('bpfbandsizei');
    let bpfcheck = <HTMLInputElement>document.getElementById('bpfcheck');

    let lsffreq = <HTMLInputElement>document.getElementById('lsffreq');
    let lsffreqi = <HTMLInputElement>document.getElementById('lsffreqi');
    let lsfgain = <HTMLInputElement>document.getElementById('lsfgain');
    let lsfgaini = <HTMLInputElement>document.getElementById('lsfgaini');
    let lsfcheck = <HTMLInputElement>document.getElementById('lsfcheck');

    let hsffreq = <HTMLInputElement>document.getElementById('hsffreq');
    let hsffreqi = <HTMLInputElement>document.getElementById('hsffreqi');
    let hsfgain = <HTMLInputElement>document.getElementById('hsfgain');
    let hsfgaini = <HTMLInputElement>document.getElementById('hsfgaini');
    let hsfcheck = <HTMLInputElement>document.getElementById('hsfcheck');

    let pffreq = <HTMLInputElement>document.getElementById('pffreq');
    let pffreqi = <HTMLInputElement>document.getElementById('pffreqi');
    let pfgain = <HTMLInputElement>document.getElementById('pfgain');
    let pfgaini = <HTMLInputElement>document.getElementById('pfgaini');
    let pfbandsize = <HTMLInputElement>document.getElementById('pfbandsize');
    let pfbandsizei = <HTMLInputElement>document.getElementById('pfbandsizei');
    let pfcheck = <HTMLInputElement>document.getElementById('pfcheck');

    let nffreq = <HTMLInputElement>document.getElementById('nffreq');
    let nffreqi = <HTMLInputElement>document.getElementById('nffreqi');
    let nfbandsize = <HTMLInputElement>document.getElementById('nfbandsize');
    let nfbandsizei = <HTMLInputElement>document.getElementById('nfbandsizei');
    let nfcheck = <HTMLInputElement>document.getElementById('nfcheck');

    let apffreq = <HTMLInputElement>document.getElementById('apffreq');
    let apffreqi = <HTMLInputElement>document.getElementById('apffreqi');
    let apfpeak = <HTMLInputElement>document.getElementById('apfsharpness');
    let apfpeaki = <HTMLInputElement>document.getElementById('apfsharpnessi');
    let apfcheck = <HTMLInputElement>document.getElementById('apfcheck');

    let filterChooser = <HTMLSelectElement>document.getElementById('filters');

    let analyser2 = this.audioCtx.createAnalyser();
    let canvas2 = document.getElementById('canvas2') as HTMLCanvasElement;
    let canvas2Ctx = canvas2.getContext('2d');

    function draw2() {
      analyser2.fftSize = 256;
      let bufferLength = analyser2.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);

      canvas2Ctx.clearRect(0, 0, canvas2.width, canvas2.height);

      requestAnimationFrame(draw2);

      analyser2.getByteFrequencyData(dataArray);

      canvas2Ctx.fillStyle = 'rgb(50, 50, 50)';
      canvas2Ctx.fillRect(0, 0, canvas2.width, canvas2.height);

      let barWidth = canvas2.width / 156;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        // #5c3e94
        canvas2Ctx.fillStyle = 'rgb(' + (barHeight / 8 + 92) + ',' + (barHeight / 8 + 62) + ',' + (barHeight / 8 + 148) + ')';
        canvas2Ctx.fillRect(x, canvas2.height - barHeight / 2, barWidth, barHeight);

        x += barWidth + 1;
      }
    }
    const self = this;
    this.loadEqSettings();
    this.loadPlaylists();

    lyr.addEventListener(
      'click',
      () => {
        lyrics.hidden = !lyrics.hidden;
      },
      null
    );

    volumeText.addEventListener('click', () => {
      gainNode.gain.value = this.audioCtx.createGain().gain.value;
      volumeControl.value = '1';
      volumeControl.valueAsNumber = 1;
    });

    balanceText.addEventListener('click', () => {
      panner.pan.value = 0;
      pannerControl.value = '0';
      pannerControl.valueAsNumber = 0;
    });

    let thisTemp = this;
    function setNewEq() {
      thisTemp.newEqualizerSettings.first = firstEq.gain.value;
      thisTemp.newEqualizerSettings.second = secondEq.gain.value;
      thisTemp.newEqualizerSettings.third = thirdEq.gain.value;
      thisTemp.newEqualizerSettings.fourth = fourthEq.gain.value;
      thisTemp.newEqualizerSettings.fifth = fifthEq.gain.value;
      thisTemp.newEqualizerSettings.sixth = sixthEq.gain.value;
      thisTemp.newEqualizerSettings.seventh = seventhEq.gain.value;
      thisTemp.newEqualizerSettings.eight = eightEq.gain.value;
      thisTemp.newEqualizerSettings.ninth = ninthEq.gain.value;
      thisTemp.newEqualizerSettings.tenth = tenthEq.gain.value;
      thisTemp.newEqualizerSettings.equalizerName = newEqName.value;
      thisTemp.newEqualizerSettings.createdBy = thisTemp.currentUser;
      thisTemp.newEqualizerSettings.users = [thisTemp.currentUser['user']];
    }

    newEqName.addEventListener(
      'input',
      function() {
        setNewEq();
      },
      null
    );

    // WYBÓR EQUALIZERA
    eqChooser.addEventListener(
      'input',
      () => {
        firstEqControl.value = self.equalizerSettings[eqChooser.selectedIndex].first.toString();
        secondEqControl.value = self.equalizerSettings[eqChooser.selectedIndex].second.toString();
        thirdEqControl.value = self.equalizerSettings[eqChooser.selectedIndex].third.toString();
        fourthEqControl.value = self.equalizerSettings[eqChooser.selectedIndex].fourth.toString();
        fifthEqControl.value = self.equalizerSettings[eqChooser.selectedIndex].fifth.toString();
        sixthEqControl.value = self.equalizerSettings[eqChooser.selectedIndex].sixth.toString();
        seventhEqControl.value = self.equalizerSettings[eqChooser.selectedIndex].seventh.toString();
        eightEqControl.value = self.equalizerSettings[eqChooser.selectedIndex].eight.toString();
        ninthEqControl.value = self.equalizerSettings[eqChooser.selectedIndex].ninth.toString();
        tenthEqControl.value = self.equalizerSettings[eqChooser.selectedIndex].tenth.toString();
        firstEq.gain.value = self.equalizerSettings[eqChooser.selectedIndex].first.toString();
        secondEq.gain.value = self.equalizerSettings[eqChooser.selectedIndex].second.toString();
        thirdEq.gain.value = self.equalizerSettings[eqChooser.selectedIndex].third.toString();
        fourthEq.gain.value = self.equalizerSettings[eqChooser.selectedIndex].fourth.toString();
        fifthEq.gain.value = self.equalizerSettings[eqChooser.selectedIndex].fifth.toString();
        sixthEq.gain.value = self.equalizerSettings[eqChooser.selectedIndex].sixth.toString();
        seventhEq.gain.value = self.equalizerSettings[eqChooser.selectedIndex].seventh.toString();
        eightEq.gain.value = self.equalizerSettings[eqChooser.selectedIndex].eight.toString();
        ninthEq.gain.value = self.equalizerSettings[eqChooser.selectedIndex].ninth.toString();
        tenthEq.gain.value = self.equalizerSettings[eqChooser.selectedIndex].tenth.toString();
        newEqName.value = self.equalizerSettings[eqChooser.selectedIndex].equalizerName.toString();
        setNewEq();
      },
      false
    );

    // WYBÓR FILTRA
    filterChooser.addEventListener(
      'input',
      function() {
        console.error(filterChooser.options[filterChooser.selectedIndex].value.toString());
        let f1 = document.getElementById('lpf');
        let f2 = document.getElementById('hpf');
        let f3 = document.getElementById('bpf');
        let f4 = document.getElementById('lsf');
        let f5 = document.getElementById('hsf');
        let f6 = document.getElementById('pf');
        let f7 = document.getElementById('nf');
        let f8 = document.getElementById('apf');
        f1.style.display = 'none';
        f2.style.display = 'none';
        f3.style.display = 'none';
        f4.style.display = 'none';
        f5.style.display = 'none';
        f6.style.display = 'none';
        f7.style.display = 'none';
        f8.style.display = 'none';
        let selected = document.getElementById(filterChooser.options[filterChooser.selectedIndex].value.toString());
        selected.style.display = 'block';
        console.error(self.playlists);
      },
      false
    );

    // USTAWIENIA FILTROW
    lpffreq.addEventListener(
      'input',
      function() {
        lowpass.frequency.value = this.value;
        lpffreqi.value = this.value;
      },
      false
    );

    lpffreqi.addEventListener(
      'input',
      function() {
        lowpass.frequency.value = this.value;
        lpffreq.value = this.value;
      },
      false
    );

    lpfpeak.addEventListener(
      'input',
      function() {
        lowpass.Q.value = this.value;
        lpfpeaki.value = this.value;
      },
      false
    );

    lpfpeaki.addEventListener(
      'input',
      function() {
        lowpass.Q.value = this.value;
        lpfpeak.value = this.value;
      },
      false
    );

    hpffreq.addEventListener(
      'input',
      function() {
        highpass.frequency.value = this.value;
        hpffreqi.value = this.value;
      },
      false
    );

    hpffreqi.addEventListener(
      'input',
      function() {
        highpass.frequency.value = this.value;
        hpffreq.value = this.value;
      },
      false
    );

    hpfpeak.addEventListener(
      'input',
      function() {
        highpass.Q.value = this.value;
        hpfpeaki.value = this.value;
      },
      false
    );

    hpfpeaki.addEventListener(
      'input',
      function() {
        highpass.Q.value = this.value;
        hpfpeak.value = this.value;
      },
      false
    );

    bpffreq.addEventListener(
      'input',
      function() {
        bandpass.frequency.value = this.value;
        bpffreqi.value = this.value;
      },
      false
    );

    bpffreqi.addEventListener(
      'input',
      function() {
        bandpass.frequency.value = this.value;
        bpffreq.value = this.value;
      },
      false
    );

    bpfbandsize.addEventListener(
      'input',
      function() {
        bandpass.Q.value = this.value;
        bpfbandsizei.value = this.value;
      },
      false
    );

    bpfbandsizei.addEventListener(
      'input',
      function() {
        bandpass.Q.value = this.value;
        bpfbandsize.value = this.value;
      },
      false
    );

    lsffreq.addEventListener(
      'input',
      function() {
        lowshelf.frequency.value = this.value;
        lsffreqi.value = this.value;
      },
      false
    );

    lsffreqi.addEventListener(
      'input',
      function() {
        lowshelf.frequency.value = this.value;
        lsffreq.value = this.value;
      },
      false
    );

    lsfgain.addEventListener(
      'input',
      function() {
        lowshelf.gain.value = this.value;
        lsfgaini.value = this.value;
      },
      false
    );

    lsfgaini.addEventListener(
      'input',
      function() {
        lowshelf.gain.value = this.value;
        lsfgain.value = this.value;
      },
      false
    );

    hsffreq.addEventListener(
      'input',
      function() {
        highshelf.frequency.value = this.value;
        hsffreqi.value = this.value;
      },
      false
    );

    hsffreqi.addEventListener(
      'input',
      function() {
        highshelf.frequency.value = this.value;
        hsffreq.value = this.value;
      },
      false
    );

    hsfgain.addEventListener(
      'input',
      function() {
        highshelf.gain.value = this.value;
        hsfgaini.value = this.value;
      },
      false
    );

    hsfgaini.addEventListener(
      'input',
      function() {
        highshelf.gain.value = this.value;
        hsfgain.value = this.value;
      },
      false
    );

    pffreq.addEventListener(
      'input',
      function() {
        peaking.frequency.value = this.value;
        pffreqi.value = this.value;
      },
      false
    );

    pffreqi.addEventListener(
      'input',
      function() {
        peaking.frequency.value = this.value;
        pffreq.value = this.value;
      },
      false
    );

    pfgain.addEventListener(
      'input',
      function() {
        peaking.gain.value = this.value;
        pfgaini.value = this.value;
      },
      false
    );

    pfgaini.addEventListener(
      'input',
      function() {
        peaking.gain.value = this.value;
        pfgain.value = this.value;
      },
      false
    );

    pfbandsize.addEventListener(
      'input',
      function() {
        peaking.Q.value = this.value;
        pfbandsizei.value = this.value;
      },
      false
    );

    pfbandsizei.addEventListener(
      'input',
      function() {
        peaking.Q.value = this.value;
        pfbandsize.value = this.value;
      },
      false
    );

    nffreq.addEventListener(
      'input',
      function() {
        notch.frequency.value = this.value;
        nffreqi.value = this.value;
      },
      false
    );

    nffreqi.addEventListener(
      'input',
      function() {
        notch.frequency.value = this.value;
        nffreq.value = this.value;
      },
      false
    );

    nfbandsize.addEventListener(
      'input',
      function() {
        notch.Q.value = this.value;
        nfbandsizei.value = this.value;
      },
      false
    );

    nfbandsizei.addEventListener(
      'input',
      function() {
        notch.Q.value = this.value;
        nfbandsize.value = this.value;
      },
      false
    );

    apffreq.addEventListener(
      'input',
      function() {
        allpass.frequency.value = this.value;
        apffreqi.value = this.value;
      },
      false
    );

    apffreqi.addEventListener(
      'input',
      function() {
        allpass.frequency.value = this.value;
        apffreq.value = this.value;
      },
      false
    );

    apfpeak.addEventListener(
      'input',
      function() {
        allpass.Q.value = this.value;
        apfpeaki.value = this.value;
      },
      false
    );

    apfpeaki.addEventListener(
      'input',
      function() {
        allpass.Q.value = this.value;
        apfpeak.value = this.value;
      },
      false
    );

    // USTAWIENIA SUWAKOW EQ
    firstEqControl.addEventListener(
      'input',
      function() {
        firstEq.gain.value = this.value;
        setNewEq();
      },
      false
    );

    secondEqControl.addEventListener(
      'input',
      function() {
        secondEq.gain.value = this.value;
        setNewEq();
      },
      false
    );

    thirdEqControl.addEventListener(
      'input',
      function() {
        thirdEq.gain.value = this.value;
        setNewEq();
      },
      false
    );

    fourthEqControl.addEventListener(
      'input',
      function() {
        fourthEq.gain.value = this.value;
        setNewEq();
      },
      false
    );

    fifthEqControl.addEventListener(
      'input',
      function() {
        fifthEq.gain.value = this.value;
        setNewEq();
      },
      false
    );

    sixthEqControl.addEventListener(
      'input',
      function() {
        sixthEq.gain.value = this.value;
        setNewEq();
      },
      false
    );

    seventhEqControl.addEventListener(
      'input',
      function() {
        seventhEq.gain.value = this.value;
        setNewEq();
      },
      false
    );

    eightEqControl.addEventListener(
      'input',
      function() {
        eightEq.gain.value = this.value;
        setNewEq();
      },
      false
    );

    ninthEqControl.addEventListener(
      'input',
      function() {
        ninthEq.gain.value = this.value;
        setNewEq();
      },
      false
    );

    tenthEqControl.addEventListener(
      'input',
      function() {
        tenthEq.gain.value = this.value;
        setNewEq();
      },
      false
    );

    resetButton.addEventListener(
      'click',
      function() {
        eqChooser.selectedIndex = 0;
        firstEqControl.value = '0';
        secondEqControl.value = '0';
        thirdEqControl.value = '0';
        fourthEqControl.value = '0';
        fifthEqControl.value = '0';
        sixthEqControl.value = '0';
        seventhEqControl.value = '0';
        eightEqControl.value = '0';
        ninthEqControl.value = '0';
        tenthEqControl.value = '0';
        firstEq.gain.value = '0';
        secondEq.gain.value = '0';
        thirdEq.gain.value = '0';
        fourthEq.gain.value = '0';
        fifthEq.gain.value = '0';
        sixthEq.gain.value = '0';
        seventhEq.gain.value = '0';
        eightEq.gain.value = '0';
        ninthEq.gain.value = '0';
        tenthEq.gain.value = '0';
        setNewEq();
      },
      false
    );

    resetFiltersButton.addEventListener(
      'click',
      function() {
        lpfcheck.checked = false;
        lowpass.frequency.value = 20000;
        lpffreqi.valueAsNumber = 20000;
        lpffreq.valueAsNumber = 20000;
        lowpass.Q.value = 0;
        lpfpeaki.valueAsNumber = 0;
        lpfpeak.valueAsNumber = 0;
        hpfcheck.checked = false;
        highpass.frequency.value = 0;
        hpffreqi.valueAsNumber = 0;
        hpffreq.valueAsNumber = 0;
        highpass.Q.value = 0;
        hpfpeaki.valueAsNumber = 0;
        hpfpeak.valueAsNumber = 0;
        bpfcheck.checked = false;
        bandpass.frequency.value = 0;
        bpffreqi.valueAsNumber = 0;
        bpffreq.valueAsNumber = 0;
        bandpass.Q.value = 0;
        bpfbandsizei.valueAsNumber = 0;
        bpfbandsize.valueAsNumber = 0;
        lsfcheck.checked = false;
        lowshelf.frequency.value = 0;
        lsffreqi.valueAsNumber = 0;
        lsffreq.valueAsNumber = 0;
        lowshelf.gain.value = 0;
        lsfgaini.valueAsNumber = 0;
        lsfgain.valueAsNumber = 0;
        hsfcheck.checked = false;
        highshelf.frequency.value = 0;
        hsffreqi.valueAsNumber = 0;
        hsffreq.valueAsNumber = 0;
        highshelf.gain.value = 0;
        hsfgaini.valueAsNumber = 0;
        hsfgain.valueAsNumber = 0;
        pfcheck.checked = false;
        peaking.frequency.value = 0;
        pffreqi.valueAsNumber = 0;
        pffreq.valueAsNumber = 0;
        peaking.gain.value = 0;
        pfgaini.valueAsNumber = 0;
        pfgain.valueAsNumber = 0;
        peaking.Q.value = 0;
        pfbandsizei.valueAsNumber = 0;
        pfbandsize.valueAsNumber = 0;
        nfcheck.checked = false;
        notch.frequency.value = 0;
        nffreqi.valueAsNumber = 0;
        nffreq.valueAsNumber = 0;
        notch.Q.value = 0;
        nfbandsizei.valueAsNumber = 0;
        nfbandsize.valueAsNumber = 0;
        apfcheck.checked = false;
        allpass.frequency.value = 0;
        apffreqi.valueAsNumber = 0;
        apffreq.valueAsNumber = 0;
        allpass.Q.value = 0;
        apfpeaki.valueAsNumber = 0;
        apfpeak.valueAsNumber = 0;
        reconnectFilters();
      },
      false
    );

    pannerControl.addEventListener(
      'input',
      function() {
        panner.pan.value = this.valueAsNumber;
      },
      false
    );

    volumeControl.addEventListener(
      'input',
      function() {
        gainNode.gain.value = this.valueAsNumber;
      },
      false
    );

    audioFile.addEventListener(
      'change',
      function() {
        //console.error('wrzucony plik: ' + audioFile.dir);
        //console.error(audioFile.attributes);
      },
      false
    );

    let destination = this.audioCtx.destination;

    let changedtrack = track
      .connect(gainNode)
      .connect(panner)
      .connect(firstEq)
      .connect(secondEq)
      .connect(thirdEq)
      .connect(sixthEq)
      .connect(seventhEq)
      .connect(eightEq)
      .connect(ninthEq)
      .connect(tenthEq)
      .connect(analyser2) // COMMENTED OUT AS NOT TO CONNECT ALL FILTERS AT START
      /*.connect(lowpass)
      .connect(highpass)
      .connect(bandpass)
      .connect(lowshelf)
      .connect(highshelf)
      .connect(peaking)
      .connect(notch)
      .connect(allpass)*/ .connect(
        destination
      );

    function reconnectFilters() {
      track.disconnect();
      gainNode.disconnect();
      panner.disconnect();
      firstEq.disconnect();
      secondEq.disconnect();
      thirdEq.disconnect();
      fourthEq.disconnect();
      fifthEq.disconnect();
      sixthEq.disconnect();
      seventhEq.disconnect();
      eightEq.disconnect();
      ninthEq.disconnect();
      tenthEq.disconnect();
      analyser2.disconnect();
      lowpass.disconnect();
      highpass.disconnect();
      bandpass.disconnect();
      lowshelf.disconnect();
      highshelf.disconnect();
      peaking.disconnect();
      notch.disconnect();
      allpass.disconnect();
      destination.disconnect();
      let tr = track
        .connect(gainNode)
        .connect(panner)
        .connect(firstEq)
        .connect(secondEq)
        .connect(thirdEq)
        .connect(sixthEq)
        .connect(seventhEq)
        .connect(eightEq)
        .connect(ninthEq)
        .connect(tenthEq);
      if (lpfcheck.checked) {
        tr = tr.connect(lowpass);
      }
      if (hpfcheck.checked) {
        tr = tr.connect(highpass);
      }
      if (bpfcheck.checked) {
        tr = tr.connect(bandpass);
      }
      if (lsfcheck.checked) {
        tr = tr.connect(lowshelf);
      }
      if (hsfcheck.checked) {
        tr = tr.connect(highshelf);
      }
      if (pfcheck.checked) {
        tr = tr.connect(peaking);
      }
      if (nfcheck.checked) {
        tr = tr.connect(notch);
      }
      if (apfcheck.checked) {
        tr = tr.connect(allpass);
      }
      tr = tr.connect(analyser2);
      tr.connect(destination);
      console.error(tr.context);
    }

    // FILTERS CHECKBOXES
    lpfcheck.addEventListener(
      'change',
      function() {
        console.error(lpfcheck.checked);
        reconnectFilters();
      },
      false
    );

    hpfcheck.addEventListener(
      'change',
      function() {
        console.error(hpfcheck.checked);
        reconnectFilters();
      },
      false
    );

    bpfcheck.addEventListener(
      'change',
      function() {
        console.error(bpfcheck.checked);
        reconnectFilters();
      },
      false
    );

    lsfcheck.addEventListener(
      'change',
      function() {
        console.error(lsfcheck.checked);
        reconnectFilters();
      },
      false
    );

    hsfcheck.addEventListener(
      'change',
      function() {
        console.error(hsfcheck.checked);
        reconnectFilters();
      },
      false
    );

    pfcheck.addEventListener(
      'change',
      function() {
        console.error(pfcheck.checked);
        reconnectFilters();
      },
      false
    );

    nfcheck.addEventListener(
      'change',
      function() {
        console.error(nfcheck.checked);
        reconnectFilters();
      },
      false
    );

    apfcheck.addEventListener(
      'change',
      function() {
        console.error(apfcheck.checked);
        reconnectFilters();
      },
      false
    );

    draw2();
  }

  ngOnDestroy() {
    this.stop();
    this.audioCtx.childNodes.forEach(node => {});
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }
}
