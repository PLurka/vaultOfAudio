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

  handleFileInput(files: FileList) {}

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

  ngOnInit() {
    // get the audio element
    let audioElement = this.audioService.getElement();

    // pass it into the audio context
    let track = this.audioCtx.createMediaElementSource(audioElement);

    const gainNode = this.audioCtx.createGain();

    const volumeControl = document.querySelector('#volume');

    const pannerOptions = { pan: 0 };
    const panner = new StereoPannerNode(this.audioCtx, pannerOptions);

    const pannerControl = document.querySelector('#panner');

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

    track
      .connect(gainNode)
      .connect(panner)
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
}
