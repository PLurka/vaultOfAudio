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

  ngOnInit() {
    this.visualization = true;
    // get the audio element
    let audioElement = this.audioService.getElement();

    // pass it into the audio context
    let track = this.audioCtx.createMediaElementSource(audioElement);

    const gainNode = this.audioCtx.createGain();

    const volumeControl = document.querySelector('#volume');

    const pannerOptions = { pan: 0 };
    const panner = new StereoPannerNode(this.audioCtx, pannerOptions);

    const pannerControl = document.querySelector('#panner');

    const audioFile = document.getElementById('file');

    const resetButton = document.getElementById('resetButton');

    let slider = <HTMLInputElement>document.getElementById('time-slider');

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

      let barWidth = (canvas2.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        canvas2Ctx.fillStyle = 'rgb(' + (barHeight / 2 + 80) + ',50,' + (barHeight / 2 + 80) + ')';
        canvas2Ctx.fillRect(x, canvas2.height - barHeight / 2, barWidth, barHeight);

        x += barWidth + 1;
      }
    }

    firstEqControl.addEventListener(
      'input',
      function() {
        firstEq.gain.value = this.value;
      },
      false
    );

    secondEqControl.addEventListener(
      'input',
      function() {
        secondEq.gain.value = this.value;
      },
      false
    );

    thirdEqControl.addEventListener(
      'input',
      function() {
        thirdEq.gain.value = this.value;
      },
      false
    );

    fourthEqControl.addEventListener(
      'input',
      function() {
        fourthEq.gain.value = this.value;
      },
      false
    );

    fifthEqControl.addEventListener(
      'input',
      function() {
        fifthEq.gain.value = this.value;
      },
      false
    );

    sixthEqControl.addEventListener(
      'input',
      function() {
        sixthEq.gain.value = this.value;
      },
      false
    );

    seventhEqControl.addEventListener(
      'input',
      function() {
        seventhEq.gain.value = this.value;
      },
      false
    );

    eightEqControl.addEventListener(
      'input',
      function() {
        eightEq.gain.value = this.value;
      },
      false
    );

    ninthEqControl.addEventListener(
      'input',
      function() {
        ninthEq.gain.value = this.value;
      },
      false
    );

    tenthEqControl.addEventListener(
      'input',
      function() {
        tenthEq.gain.value = this.value;
      },
      false
    );

    resetButton.addEventListener(
      'click',
      function() {
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
      },
      false
    );

    pannerControl.addEventListener(
      'input',
      function() {
        panner.pan.value = this.value;
      },
      false
    );

    volumeControl.addEventListener(
      'input',
      function() {
        gainNode.gain.value = this.value;
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

    track
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
      .connect(analyser2)
      .connect(this.audioCtx.destination);

    draw2();
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
