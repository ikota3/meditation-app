'use strict';

const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    // Time select
    const timeSelect = document.querySelectorAll('.time-select button');
    // Sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    // Time Display
    const timeDisplay = document.querySelector('.time-display');
    // Get the length of the outline
    const outlineLength = outline.getTotalLength();
    // Duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Select time
    timeSelect.forEach(option => {
        option.addEventListener('click', function () {
            song.currentTime = 0;
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60).toString().padStart(2, '0')}:${Math.floor(fakeDuration % 60).toString().padStart(2, '0')}`;
        });
    });

    // Pick sound
    sounds.forEach(sound => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound');
            song.play();
            const videoRegex = RegExp(this.getAttribute('data-video') + '$');
            if (!videoRegex.test(video.src)) {
                video.src = this.getAttribute('data-video');
            }
            video.play();
            play.src = './svg/pause.svg';
        });
    });

    // Play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    // Function for stop or play the sounds
    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };

    // Animate circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsedTime = fakeDuration - currentTime;
        let minutes = Math.floor(elapsedTime / 60);
        let seconds = Math.floor(elapsedTime % 60);

        // 描画する円周の長さ = 円周の長さ - (円周の長さ × (現在の時間 / 全体の時間))
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength
        outline.style.strokeDashoffset = progress;

        timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg'
            video.pause();
        }
    };

};

app();
