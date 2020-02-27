import { Component, OnInit } from '@angular/core';
import { AudioService } from '../services/audio/audio.service';
import { CloudService } from '../services/cloud.service';
import { StreamState } from '../interfaces/stream-state';

@Component({
  selector: 'jhi-player',
  templateUrl: './player.component.html',
  styleUrls: ['player.component.scss']
})
export class PlayerComponent implements OnInit {
  message: string;
  files: Array<any> = [];
  state: StreamState;
  currentFile: any = {};
  fileToUpload: File = null;
  visualization: boolean;

  audioCtx = new (window['AudioContext'] || window['webkitAudioContext'])();
  // get the audio element
  audioElement = this.audioService.getElement();

  // pass it into the audio context
  track = this.audioCtx.createMediaElementSource(this.audioElement);

  gainNode = this.audioCtx.createGain();

  volumeControl = document.querySelector('#volume');

  pannerOptions = { pan: 0 };
  panner = new StereoPannerNode(this.audioCtx, this.pannerOptions);

  pannerControl = document.querySelector('#panner');

  audioFile = document.getElementById('file');

  resetButton = document.getElementById('resetButton');

  resetFiltersButton = document.getElementById('resetFiltersButton');

  slider = <HTMLInputElement>document.getElementById('time-slider');

  //CREATION OF EQUALIZER FILTERS
  firstEq = this.audioCtx.createBiquadFilter();
  secondEq = this.audioCtx.createBiquadFilter();
  thirdEq = this.audioCtx.createBiquadFilter();
  fourthEq = this.audioCtx.createBiquadFilter();
  fifthEq = this.audioCtx.createBiquadFilter();
  sixthEq = this.audioCtx.createBiquadFilter();
  seventhEq = this.audioCtx.createBiquadFilter();
  eightEq = this.audioCtx.createBiquadFilter();
  ninthEq = this.audioCtx.createBiquadFilter();
  tenthEq = this.audioCtx.createBiquadFilter();

  //ASSIGNING  EQ CONTROLS
  firstEqControl = <HTMLInputElement>document.getElementById('31');
  secondEqControl = <HTMLInputElement>document.getElementById('62');
  thirdEqControl = <HTMLInputElement>document.getElementById('125');
  fourthEqControl = <HTMLInputElement>document.getElementById('250');
  fifthEqControl = <HTMLInputElement>document.getElementById('500');
  sixthEqControl = <HTMLInputElement>document.getElementById('1k');
  seventhEqControl = <HTMLInputElement>document.getElementById('2k');
  eightEqControl = <HTMLInputElement>document.getElementById('4k');
  ninthEqControl = <HTMLInputElement>document.getElementById('8k');
  tenthEqControl = <HTMLInputElement>document.getElementById('16k');
  eqChooser = <HTMLSelectElement>document.getElementById('equalizers');

  //CREATION OF BIQUAD FILTERS
  lowpass = this.audioCtx.createBiquadFilter();
  highpass = this.audioCtx.createBiquadFilter();
  bandpass = this.audioCtx.createBiquadFilter();
  lowshelf = this.audioCtx.createBiquadFilter();
  highshelf = this.audioCtx.createBiquadFilter();
  peaking = this.audioCtx.createBiquadFilter();
  notch = this.audioCtx.createBiquadFilter();
  allpass = this.audioCtx.createBiquadFilter();

  //ASSIGNING BIQUAD FILTERS CONTROLS
  lpffreq = <HTMLInputElement>document.getElementById('lpffreq');
  lpffreqi = <HTMLInputElement>document.getElementById('lpffreqi');
  lpfpeak = <HTMLInputElement>document.getElementById('lpfpeak');
  lpfpeaki = <HTMLInputElement>document.getElementById('lpfpeaki');
  lpfcheck = <HTMLInputElement>document.getElementById('lpfcheck');

  hpffreq = <HTMLInputElement>document.getElementById('hpffreq');
  hpffreqi = <HTMLInputElement>document.getElementById('hpffreqi');
  hpfpeak = <HTMLInputElement>document.getElementById('hpfpeak');
  hpfpeaki = <HTMLInputElement>document.getElementById('hpfpeaki');
  hpfcheck = <HTMLInputElement>document.getElementById('hpfcheck');

  bpffreq = <HTMLInputElement>document.getElementById('bpffreq');
  bpffreqi = <HTMLInputElement>document.getElementById('bpffreqi');
  bpfbandsize = <HTMLInputElement>document.getElementById('bpfbandsize');
  bpfbandsizei = <HTMLInputElement>document.getElementById('bpfbandsizei');
  bpfcheck = <HTMLInputElement>document.getElementById('bpfcheck');

  lsffreq = <HTMLInputElement>document.getElementById('lsffreq');
  lsffreqi = <HTMLInputElement>document.getElementById('lsffreqi');
  lsfgain = <HTMLInputElement>document.getElementById('lsfgain');
  lsfgaini = <HTMLInputElement>document.getElementById('lsfgaini');
  lsfcheck = <HTMLInputElement>document.getElementById('lsfcheck');

  hsffreq = <HTMLInputElement>document.getElementById('hsffreq');
  hsffreqi = <HTMLInputElement>document.getElementById('hsffreqi');
  hsfgain = <HTMLInputElement>document.getElementById('hsfgain');
  hsfgaini = <HTMLInputElement>document.getElementById('hsfgaini');
  hsfcheck = <HTMLInputElement>document.getElementById('hsfcheck');

  pffreq = <HTMLInputElement>document.getElementById('pffreq');
  pffreqi = <HTMLInputElement>document.getElementById('pffreqi');
  pfgain = <HTMLInputElement>document.getElementById('pfgain');
  pfgaini = <HTMLInputElement>document.getElementById('pfgaini');
  pfbandsize = <HTMLInputElement>document.getElementById('pfbandsize');
  pfbandsizei = <HTMLInputElement>document.getElementById('pfbandsizei');
  pfcheck = <HTMLInputElement>document.getElementById('pfcheck');

  nffreq = <HTMLInputElement>document.getElementById('nffreq');
  nffreqi = <HTMLInputElement>document.getElementById('nffreqi');
  nfbandsize = <HTMLInputElement>document.getElementById('nfbandsize');
  nfbandsizei = <HTMLInputElement>document.getElementById('nfbandsizei');
  nfcheck = <HTMLInputElement>document.getElementById('nfcheck');

  apffreq = <HTMLInputElement>document.getElementById('apffreq');
  apffreqi = <HTMLInputElement>document.getElementById('apffreqi');
  apfpeak = <HTMLInputElement>document.getElementById('apfsharpness');
  apfpeaki = <HTMLInputElement>document.getElementById('apfsharpnessi');
  apfcheck = <HTMLInputElement>document.getElementById('apfcheck');

  filterChooser = <HTMLSelectElement>document.getElementById('filters');

  analyser2 = this.audioCtx.createAnalyser();
  canvas2 = document.getElementById('canvas2') as HTMLCanvasElement;
  canvas2Ctx = this.canvas2.getContext('2d');

  // DRAW FUNCTION
  draw2() {
    this.analyser2.fftSize = 256;
    let bufferLength = this.analyser2.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);

    this.canvas2Ctx.clearRect(0, 0, this.canvas2.width, this.canvas2.height);

    requestAnimationFrame(this.draw2);

    this.analyser2.getByteFrequencyData(dataArray);

    this.canvas2Ctx.fillStyle = 'rgb(50, 50, 50)';
    this.canvas2Ctx.fillRect(0, 0, this.canvas2.width, this.canvas2.height);

    let barWidth = (this.canvas2.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];

      this.canvas2Ctx.fillStyle = 'rgb(' + (barHeight / 2 + 80) + ',50,' + (barHeight / 2 + 80) + ')';
      this.canvas2Ctx.fillRect(x, this.canvas2.height - barHeight / 2, barWidth, barHeight);

      x += barWidth + 1;
    }
  }

  constructor(public audioService: AudioService, public cloudService: CloudService) {
    // get media files
    cloudService.getFiles().subscribe(files => {
      this.files = files;
    });

    // listen to stream state
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.error(URL.createObjectURL(this.fileToUpload));
    this.cloudService.addFiles(files);
    console.error('files: ' + this.cloudService.files);
  }

  removeFile(index: number) {
    this.cloudService.removeFile(index);
  }

  removeAll() {
    this.cloudService.removeAll();
  }

  playStream(url) {
    this.audioService.playStream(url).subscribe(events => {
      // listening for fun here
    });
  }

  openFile(file, index) {
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.url);
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
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
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
    this.visualization = true;

    // CONFIGURING EQ FILTERS
    this.firstEq.type = 'lowshelf';
    this.firstEq.frequency.value = 31.0;
    this.firstEq.gain.value = 1.0;

    this.secondEq.type = 'peaking';
    this.secondEq.frequency.value = 62.0;
    this.secondEq.gain.value = 1.0;

    this.thirdEq.type = 'peaking';
    this.thirdEq.frequency.value = 125.0;
    this.thirdEq.gain.value = 1.0;

    this.fourthEq.type = 'peaking';
    this.fourthEq.frequency.value = 250.0;
    this.fourthEq.gain.value = 1.0;

    this.fifthEq.type = 'peaking';
    this.fifthEq.frequency.value = 500.0;
    this.fifthEq.gain.value = 1.0;

    this.sixthEq.type = 'peaking';
    this.sixthEq.frequency.value = 1000.0;
    this.sixthEq.gain.value = 1.0;

    this.seventhEq.type = 'peaking';
    this.seventhEq.frequency.value = 2000.0;
    this.seventhEq.gain.value = 1.0;

    this.eightEq.type = 'peaking';
    this.eightEq.frequency.value = 4000.0;
    this.eightEq.gain.value = 1.0;

    this.ninthEq.type = 'peaking';
    this.ninthEq.frequency.value = 8000.0;
    this.ninthEq.gain.value = 1.0;

    this.tenthEq.type = 'highshelf';
    this.tenthEq.frequency.value = 16000.0;
    this.tenthEq.gain.value = 1.0;

    // SETTING OF BIQUAD FILTERS

    this.lowpass.type = 'lowpass';
    this.highpass.type = 'highpass';
    this.bandpass.type = 'bandpass';
    this.lowshelf.type = 'lowshelf';
    this.highshelf.type = 'highshelf';
    this.peaking.type = 'peaking';
    this.notch.type = 'notch';
    this.allpass.type = 'allpass';
    var self = this;
    // WYBÓR FILTRA
    this.filterChooser.addEventListener(
      'input',
      function() {
        console.error(self.filterChooser.options[self.filterChooser.selectedIndex].value.toString());
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
        let selected = document.getElementById(self.filterChooser.options[self.filterChooser.selectedIndex].value.toString());
        selected.style.display = 'block';
      },
      false
    );

    // USTAWIENIA FILTROW
    this.lpffreq.addEventListener(
      'input',
      function() {
        self.lowpass.frequency.value = this.value;
        self.lpffreqi.value = this.value;
      },
      false
    );

    this.lpffreqi.addEventListener(
      'input',
      function() {
        self.lowpass.frequency.value = this.value;
        self.lpffreq.value = this.value;
      },
      false
    );

    this.lpfpeak.addEventListener(
      'input',
      function() {
        self.lowpass.Q.value = this.value;
        self.lpfpeaki.value = this.value;
      },
      false
    );

    this.lpfpeaki.addEventListener(
      'input',
      function() {
        self.lowpass.Q.value = this.value;
        self.lpfpeak.value = this.value;
      },
      false
    );

    this.hpffreq.addEventListener(
      'input',
      function() {
        self.highpass.frequency.value = this.value;
        self.hpffreqi.value = this.value;
      },
      false
    );

    this.hpffreqi.addEventListener(
      'input',
      function() {
        self.highpass.frequency.value = this.value;
        self.hpffreq.value = this.value;
      },
      false
    );

    this.hpfpeak.addEventListener(
      'input',
      function() {
        self.highpass.Q.value = this.value;
        self.hpfpeaki.value = this.value;
      },
      false
    );

    this.hpfpeaki.addEventListener(
      'input',
      function() {
        self.highpass.Q.value = this.value;
        self.hpfpeak.value = this.value;
      },
      false
    );

    this.bpffreq.addEventListener(
      'input',
      function() {
        self.bandpass.frequency.value = this.value;
        self.bpffreqi.value = this.value;
      },
      false
    );

    this.bpffreqi.addEventListener(
      'input',
      function() {
        self.bandpass.frequency.value = this.value;
        self.bpffreq.value = this.value;
      },
      false
    );

    this.bpfbandsize.addEventListener(
      'input',
      function() {
        self.bandpass.Q.value = this.value;
        self.bpfbandsizei.value = this.value;
      },
      false
    );

    this.bpfbandsizei.addEventListener(
      'input',
      function() {
        self.bandpass.Q.value = this.value;
        self.bpfbandsize.value = this.value;
      },
      false
    );

    this.lsffreq.addEventListener(
      'input',
      function() {
        self.lowshelf.frequency.value = this.value;
        self.lsffreqi.value = this.value;
      },
      false
    );

    this.lsffreqi.addEventListener(
      'input',
      function() {
        self.lowshelf.frequency.value = this.value;
        self.lsffreq.value = this.value;
      },
      false
    );

    this.lsfgain.addEventListener(
      'input',
      function() {
        self.lowshelf.gain.value = this.value;
        self.lsfgaini.value = this.value;
      },
      false
    );

    this.lsfgaini.addEventListener(
      'input',
      function() {
        self.lowshelf.gain.value = this.value;
        self.lsfgain.value = this.value;
      },
      false
    );

    this.hsffreq.addEventListener(
      'input',
      function() {
        self.highshelf.frequency.value = this.value;
        self.hsffreqi.value = this.value;
      },
      false
    );

    this.hsffreqi.addEventListener(
      'input',
      function() {
        self.highshelf.frequency.value = this.value;
        self.hsffreq.value = this.value;
      },
      false
    );

    this.hsfgain.addEventListener(
      'input',
      function() {
        self.highshelf.gain.value = this.value;
        self.hsfgaini.value = this.value;
      },
      false
    );

    this.hsfgaini.addEventListener(
      'input',
      function() {
        self.highshelf.gain.value = this.value;
        self.hsfgain.value = this.value;
      },
      false
    );

    this.pffreq.addEventListener(
      'input',
      function() {
        self.peaking.frequency.value = this.value;
        self.pffreqi.value = this.value;
      },
      false
    );

    this.pffreqi.addEventListener(
      'input',
      function() {
        self.peaking.frequency.value = this.value;
        self.pffreq.value = this.value;
      },
      false
    );

    this.pfgain.addEventListener(
      'input',
      function() {
        self.peaking.gain.value = this.value;
        self.pfgaini.value = this.value;
      },
      false
    );

    this.pfgaini.addEventListener(
      'input',
      function() {
        self.peaking.gain.value = this.value;
        self.pfgain.value = this.value;
      },
      false
    );

    this.pfbandsize.addEventListener(
      'input',
      function() {
        self.peaking.Q.value = this.value;
        self.pfbandsizei.value = this.value;
      },
      false
    );

    this.pfbandsizei.addEventListener(
      'input',
      function() {
        self.peaking.Q.value = this.value;
        self.pfbandsize.value = this.value;
      },
      false
    );

    this.nffreq.addEventListener(
      'input',
      function() {
        self.notch.frequency.value = this.value;
        self.nffreqi.value = this.value;
      },
      false
    );

    this.nffreqi.addEventListener(
      'input',
      function() {
        self.notch.frequency.value = this.value;
        self.nffreq.value = this.value;
      },
      false
    );

    this.nfbandsize.addEventListener(
      'input',
      function() {
        self.notch.Q.value = this.value;
        self.nfbandsizei.value = this.value;
      },
      false
    );

    this.nfbandsizei.addEventListener(
      'input',
      function() {
        self.notch.Q.value = this.value;
        self.nfbandsize.value = this.value;
      },
      false
    );

    this.apffreq.addEventListener(
      'input',
      function() {
        self.allpass.frequency.value = this.value;
        self.apffreqi.value = this.value;
      },
      false
    );

    this.apffreqi.addEventListener(
      'input',
      function() {
        self.allpass.frequency.value = this.value;
        self.apffreq.value = this.value;
      },
      false
    );

    this.apfpeak.addEventListener(
      'input',
      function() {
        self.allpass.Q.value = this.value;
        self.apfpeaki.value = this.value;
      },
      false
    );

    this.apfpeaki.addEventListener(
      'input',
      function() {
        self.allpass.Q.value = this.value;
        self.apfpeak.value = this.value;
      },
      false
    );

    // USTAWIENIA SUWAKOW EQ
    this.firstEqControl.addEventListener(
      'input',
      function() {
        self.firstEq.gain.value = this.value;
      },
      false
    );

    this.secondEqControl.addEventListener(
      'input',
      function() {
        self.secondEq.gain.value = this.value;
      },
      false
    );

    this.thirdEqControl.addEventListener(
      'input',
      function() {
        self.thirdEq.gain.value = this.value;
      },
      false
    );

    this.fourthEqControl.addEventListener(
      'input',
      function() {
        self.fourthEq.gain.value = this.value;
      },
      false
    );

    this.fifthEqControl.addEventListener(
      'input',
      function() {
        self.fifthEq.gain.value = this.value;
      },
      false
    );

    this.sixthEqControl.addEventListener(
      'input',
      function() {
        self.sixthEq.gain.value = this.value;
      },
      false
    );

    this.seventhEqControl.addEventListener(
      'input',
      function() {
        self.seventhEq.gain.value = this.value;
      },
      false
    );

    this.eightEqControl.addEventListener(
      'input',
      function() {
        self.eightEq.gain.value = this.value;
      },
      false
    );

    this.ninthEqControl.addEventListener(
      'input',
      function() {
        self.ninthEq.gain.value = this.value;
      },
      false
    );

    this.tenthEqControl.addEventListener(
      'input',
      function() {
        self.tenthEq.gain.value = this.value;
      },
      false
    );

    this.resetButton.addEventListener(
      'click',
      function() {
        self.firstEqControl.value = '0';
        self.secondEqControl.value = '0';
        self.thirdEqControl.value = '0';
        self.fourthEqControl.value = '0';
        self.fifthEqControl.value = '0';
        self.sixthEqControl.value = '0';
        self.seventhEqControl.value = '0';
        self.eightEqControl.value = '0';
        self.ninthEqControl.value = '0';
        self.tenthEqControl.value = '0';
        self.firstEq.gain.value = '0';
        self.secondEq.gain.value = '0';
        self.thirdEq.gain.value = '0';
        self.fourthEq.gain.value = '0';
        self.fifthEq.gain.value = '0';
        self.sixthEq.gain.value = '0';
        self.seventhEq.gain.value = '0';
        self.eightEq.gain.value = '0';
        self.ninthEq.gain.value = '0';
        self.tenthEq.gain.value = '0';
      },
      false
    );

    this.resetFiltersButton.addEventListener(
      'click',
      function() {
        self.lpfcheck.checked = false;
        self.lowpass.frequency.value = 20000;
        self.lpffreqi.valueAsNumber = 20000;
        self.lpffreq.valueAsNumber = 20000;
        self.lowpass.Q.value = 0;
        self.lpfpeaki.valueAsNumber = 0;
        self.lpfpeak.valueAsNumber = 0;
        self.hpfcheck.checked = false;
        self.highpass.frequency.value = 0;
        self.hpffreqi.valueAsNumber = 0;
        self.hpffreq.valueAsNumber = 0;
        self.highpass.Q.value = 0;
        self.hpfpeaki.valueAsNumber = 0;
        self.hpfpeak.valueAsNumber = 0;
        self.bpfcheck.checked = false;
        self.bandpass.frequency.value = 0;
        self.bpffreqi.valueAsNumber = 0;
        self.bpffreq.valueAsNumber = 0;
        self.bandpass.Q.value = 0;
        self.bpfbandsizei.valueAsNumber = 0;
        self.bpfbandsize.valueAsNumber = 0;
        self.lsfcheck.checked = false;
        self.lowshelf.frequency.value = 0;
        self.lsffreqi.valueAsNumber = 0;
        self.lsffreq.valueAsNumber = 0;
        self.lowshelf.gain.value = 0;
        self.lsfgaini.valueAsNumber = 0;
        self.lsfgain.valueAsNumber = 0;
        self.hsfcheck.checked = false;
        self.highshelf.frequency.value = 0;
        self.hsffreqi.valueAsNumber = 0;
        self.hsffreq.valueAsNumber = 0;
        self.highshelf.gain.value = 0;
        self.hsfgaini.valueAsNumber = 0;
        self.hsfgain.valueAsNumber = 0;
        self.pfcheck.checked = false;
        self.peaking.frequency.value = 0;
        self.pffreqi.valueAsNumber = 0;
        self.pffreq.valueAsNumber = 0;
        self.peaking.gain.value = 0;
        self.pfgaini.valueAsNumber = 0;
        self.pfgain.valueAsNumber = 0;
        self.peaking.Q.value = 0;
        self.pfbandsizei.valueAsNumber = 0;
        self.pfbandsize.valueAsNumber = 0;
        self.nfcheck.checked = false;
        self.notch.frequency.value = 0;
        self.nffreqi.valueAsNumber = 0;
        self.nffreq.valueAsNumber = 0;
        self.notch.Q.value = 0;
        self.nfbandsizei.valueAsNumber = 0;
        self.nfbandsize.valueAsNumber = 0;
        self.apfcheck.checked = false;
        self.allpass.frequency.value = 0;
        self.apffreqi.valueAsNumber = 0;
        self.apffreq.valueAsNumber = 0;
        self.allpass.Q.value = 0;
        self.apfpeaki.valueAsNumber = 0;
        self.apfpeak.valueAsNumber = 0;
        reconnectFilters();
      },
      false
    );

    this.pannerControl.addEventListener(
      'input',
      function() {
        self.panner.pan.value = this.value;
      },
      false
    );

    this.volumeControl.addEventListener(
      'input',
      function() {
        self.gainNode.gain.value = this.value;
      },
      false
    );

    this.audioFile.addEventListener(
      'change',
      function() {
        //console.error('wrzucony plik: ' + audioFile.dir);
        //console.error(audioFile.attributes);
      },
      false
    );

    self.track
      .connect(self.gainNode)
      .connect(self.panner)
      .connect(self.firstEq)
      .connect(self.secondEq)
      .connect(self.thirdEq)
      .connect(self.sixthEq)
      .connect(self.seventhEq)
      .connect(self.eightEq)
      .connect(self.ninthEq)
      .connect(self.tenthEq)
      .connect(self.analyser2) // COMMENTED OUT AS NOT TO CONNECT ALL FILTERS AT START
      /*.connect(lowpass)
      .connect(highpass)
      .connect(bandpass)
      .connect(lowshelf)
      .connect(highshelf)
      .connect(peaking)
      .connect(notch)
      .connect(allpass)*/ .connect(
        self.audioCtx.destination
      );

    function reconnectFilters() {
      self.track.disconnect();
      self.gainNode.disconnect();
      self.panner.disconnect();
      self.firstEq.disconnect();
      self.secondEq.disconnect();
      self.thirdEq.disconnect();
      self.fourthEq.disconnect();
      self.fifthEq.disconnect();
      self.sixthEq.disconnect();
      self.seventhEq.disconnect();
      self.eightEq.disconnect();
      self.ninthEq.disconnect();
      self.tenthEq.disconnect();
      self.lowpass.disconnect();
      self.highpass.disconnect();
      self.bandpass.disconnect();
      self.lowshelf.disconnect();
      self.highshelf.disconnect();
      self.peaking.disconnect();
      self.notch.disconnect();
      self.allpass.disconnect();
      self.audioCtx.destination.disconnect();
      let tr = self.track
        .connect(self.gainNode)
        .connect(self.panner)
        .connect(self.firstEq)
        .connect(self.secondEq)
        .connect(self.thirdEq)
        .connect(self.sixthEq)
        .connect(self.seventhEq)
        .connect(self.eightEq)
        .connect(self.ninthEq)
        .connect(self.tenthEq);
      if (self.lpfcheck.checked) {
        tr = tr.connect(self.lowpass);
      }
      if (self.hpfcheck.checked) {
        tr = tr.connect(self.highpass);
      }
      if (self.bpfcheck.checked) {
        tr = tr.connect(self.bandpass);
      }
      if (self.lsfcheck.checked) {
        tr = tr.connect(self.lowshelf);
      }
      if (self.hsfcheck.checked) {
        tr = tr.connect(self.highshelf);
      }
      if (self.pfcheck.checked) {
        tr = tr.connect(self.peaking);
      }
      if (self.nfcheck.checked) {
        tr = tr.connect(self.notch);
      }
      if (self.apfcheck.checked) {
        tr = tr.connect(self.allpass);
      }
      tr = tr.connect(self.analyser2);
      tr.connect(self.audioCtx.destination);
      console.error(tr.context);
    }

    // FILTERS CHECKBOXES
    this.lpfcheck.addEventListener(
      'change',
      function() {
        console.error(self.lpfcheck.checked);
        reconnectFilters();
      },
      false
    );

    this.hpfcheck.addEventListener(
      'change',
      function() {
        console.error(self.hpfcheck.checked);
        reconnectFilters();
      },
      false
    );

    this.bpfcheck.addEventListener(
      'change',
      function() {
        console.error(self.bpfcheck.checked);
        reconnectFilters();
      },
      false
    );

    this.lsfcheck.addEventListener(
      'change',
      function() {
        console.error(self.lsfcheck.checked);
        reconnectFilters();
      },
      false
    );

    this.hsfcheck.addEventListener(
      'change',
      function() {
        console.error(self.hsfcheck.checked);
        reconnectFilters();
      },
      false
    );

    this.pfcheck.addEventListener(
      'change',
      function() {
        console.error(self.pfcheck.checked);
        reconnectFilters();
      },
      false
    );

    this.nfcheck.addEventListener(
      'change',
      function() {
        console.error(self.nfcheck.checked);
        reconnectFilters();
      },
      false
    );

    this.apfcheck.addEventListener(
      'change',
      function() {
        console.error(self.apfcheck.checked);
        reconnectFilters();
      },
      false
    );

    this.draw2();
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

  autoPlay(change) {
    console.error(change);
  }
}
