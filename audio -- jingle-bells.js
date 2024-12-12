// Audio Setup
const audio = new Audio('C:\Users\alban\Downloads\jingle-bells.mp3');

function toggleMusic() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}
