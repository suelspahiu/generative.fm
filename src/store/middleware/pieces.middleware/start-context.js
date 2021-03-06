import { context } from 'tone';

const SILENT_SOUND_URL =
  'data:audio/mp3;base64,//MkxAAHiAICWABElBeKPL/RANb2w+yiT1g/gTok//lP/W/l3h8QO/OCdCqCW2Cw//MkxAQHkAIWUAhEmAQXWUOFW2dxPu//9mr60ElY5sseQ+xxesmHKtZr7bsqqX2L//MkxAgFwAYiQAhEAC2hq22d3///9FTV6tA36JdgBJoOGgc+7qvqej5Zu7/7uI9l//MkxBQHAAYi8AhEAO193vt9KGOq+6qcT7hhfN5FTInmwk8RkqKImTM55pRQHQSq//MkxBsGkgoIAABHhTACIJLf99nVI///yuW1uBqWfEu7CgNPWGpUadBmZ////4sL//MkxCMHMAH9iABEmAsKioqKigsLCwtVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVV//MkxCkECAUYCAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
let shouldPlaySilence = true;

// "inspired by" (read: ripped off) https://github.com/tambien/StartAudioContext/blob/master/StartAudioContext.js
const startAudioContext = () => {
  if (context.state && context.state !== 'running') {
    // this accomplishes the iOS specific requirement
    const buffer = context.createBuffer(1, 1, context.sampleRate);
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(0);

    // resume the audio context
    if (context.resume) {
      context.resume();
    }

    if (shouldPlaySilence) {
      shouldPlaySilence = false;
      // Play a silent sound via an HTML audio element to enable proper audio playback in iOS
      const audio = document.createElement('audio');
      if (audio.canPlayType('audio/mp3') !== '') {
        audio.controls = false;
        audio.preload = 'auto';
        audio.loop = false;
        audio.src = SILENT_SOUND_URL;
        audio.play();
      }
    }
  }
};

export default startAudioContext;
