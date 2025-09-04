import Tts from 'react-native-tts';

export const initializeTtsListeners = async () => {
  Tts.getInitStatus().then(
    () => {
      console.log('All OK TTS');
    },
    err => {
      if (err.code === 'no_engine') {
        console.log('NO ENGINE TTS');
        Tts.requestInstallEngine();
      }
    },
  );

  Tts.setDefaultRate(1, true);
  Tts.setIgnoreSilentSwitch('ignore');
  Tts.setDefaultPitch(0.7);

  Tts.addEventListener('tts-start', event => console.log('start', event));
  Tts.addEventListener('tts-progress', () => {});
  Tts.addEventListener('tts-finish', event => console.log('finish', event));
  Tts.addEventListener('tts-cancel', event => console.log('cancel', event));
};
