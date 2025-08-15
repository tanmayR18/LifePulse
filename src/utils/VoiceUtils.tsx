import SoundPlayer from "react-native-sound-player";


const getSoundPath = (soundName: string) => {
    switch (soundName) {
        case 'laugh':
            return require('../assets/sfx/laugh.mp3')
        case 'meditation':
            return require('../assets/sfx/meditation.mp3')
        case 'motivation':
            return require('../assets/sfx/motivation.mp3')
        case 'ting':
            return require('../assets/sfx/ting.mp3')
        case 'ting2':
            return require('../assets/sfx/ting2.mp3')
        case 'notification':
            return require('../assets/sfx/notification.mp3')
        default:
            throw new Error(`Sound ${soundName} not found`)
    }
}

export const playSound = (soundName: string) => {
    try {
        const soundPath = getSoundPath(soundName)
        SoundPlayer.playAsset(soundPath)
    } catch (error) {
        console.log(error)
    }
}