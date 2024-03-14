
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave = document.getElementById("wave");
let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
  {
    img: "images/Img1.jpeg",
    name: "Kar gayi chull",
    artist: "Badshah",
    music: "music/Kar Gayi Chull.mp3",
  },
  {
    img: "images/img14.jpeg",
    name: "Mauli mauli",
    artist: "CEZA",
    music: "music/mauli-mauli-.mp3",
  },
  {
    img: "images/img7.jpeg",
    name: "Buddhu Sa Mann",
    artist: "Arman malik",
    music: "music/03 Buddhu Sa Mann.mp3",
  },
  {
    img: "images/img11.jpeg",
    name: "Akh Lad Jave",
    artist: "Badshah",
    music:"music/Akh Lad Jave.mp3",
  },
  {
    img: "images/img10.jpeg",
    name: "Kaun Tujhe",
    artist: "Palak Muchhal",
    music:"music/02 Kaun Tujhe.mp3",
  },
  {
    img: "images/img4.jpeg",
    name: "Nasm Nasm",
    artist: "Arko",
    music:"music/02 Nazm Nazm.mp3",
  },
  {
    img: "images/img2.jpeg",
    name: "Kheech Meri Photo",
    artist: "Neeti Mohan",
    music:"music/02. Kheech Meri Photo.mp3",
  },
  {
    img: "images/img13.jpeg",
    name: "Baatein Ye Kabhi Na",
    artist: "Arjit Singh",
    music:"music/03 Baatein Ye Kabhi Na.mp3",
  },
  {
    img: "images/img3.jpeg",
    name: "Long Drive",
    artist: "Neha kakaar",
    music:"music/03 Long Drive.mp3",
  },
  {
    img: "images/img12.jpeg",
    name: "Tera Hua",
    artist: "Atif Aslam",
    music:"music/03 Tera Hua.mp3",
  },
  {
    img: "images/img9.jpeg",
    name: "Lat Lag Gayee",
    artist: "Benny Dayal",
    music:"music/Lat Lag Gayee.mp3",
  },
  {
    img: "images/img5.jpeg",
    name: "Main Hoon Hero Tera",
    artist: "Salman Khan",
    music:"music/Main Hoon Hero Tera.mp3",
  },
  {
    img: "images/img8.jpeg",
    name: "Swag Se Swagat",
    artist: "Vishal Dadlani",
    music:"music/Swag Se Swagat.mp3",
  },

];

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index].music;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;

  now_playing.textContent =
    "Playing music" + (track_index + 1) + " of " + music_list.length;
  updateTimer = setInterval(setUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}
function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}
function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  wave.classList.add("loader");
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  wave.classList.remove("loader");
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekTo = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekTo;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );

    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      (curr_track.duration - durationMinutes * 60)
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}