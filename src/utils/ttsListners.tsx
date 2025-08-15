import Tts from "react-native-tts";

export const initializeTtsListners = async () => {
    Tts.getInitStatus().then(() => {
        console.log("TTS Initialized");
    }).catch((error) => {
        if (error.code === 'no_engine') {
            console.log('No TTS engine found, installing...');
            Tts.requestInstallEngine();
        }
    });

    Tts.setDefaultRate(0.5, true);
    // Tts.voices().then(voices => console.log(voices));
    Tts.setDefaultVoice('com.apple.speech.synthesis.voice.Zarvox');
    Tts.setDefaultPitch(0.7);
    Tts.setIgnoreSilentSwitch('ignore');
    Tts.addEventListener('tts-start', (event) => {
        // console.log('tts-start', event);
    });
    Tts.addEventListener('tts-progress', (event) => {
        // console.log('tts-progress', event);
    });
    Tts.addEventListener('tts-finish', (event) => {
        // console.log('tts-finish', event);
    });
    Tts.addEventListener('tts-cancel', (event) => {
        // console.log('tts-cancel', event);
    });
}

export const playTTS = async (message: string) => {
    Tts.getInitStatus().then(() => {
        console.log("TTS Initialized");
    }).catch((error) => {
        if (error.code === 'no_engine') {
            console.log('No TTS engine found, installing...');
            Tts.requestInstallEngine();
        }
    });
    Tts.speak(message);
}
