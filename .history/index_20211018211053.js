// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
//import { firestore } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js'
// import {  getFirestore, collection, getDocs  } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js'
import {  getFirestore, collection, getDocs, updateDoc , doc  } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js'
//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBt_8_xWyk2bFakexqfM7ZkXFTRCx42OKI",
  authDomain: "touche-1c021.firebaseapp.com",
  projectId: "touche-1c021",
  storageBucket: "touche-1c021.appspot.com",
  messagingSenderId: "166127349399",
  appId: "1:166127349399:web:3ff697a006ca3cfdc2c3d2"
};

// Device Mapping
const device_dict = {
    "lenovo": 1,
    "iphone": 2,
    "surface": 3,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 2;
var playing = 0;
var forcePause = 0;
var firstPause = 1;
let cur_id;

// Initially load song details into DOM
loadSong(songs[songIndex]);


// Update song details
function loadSong(song) {
    title.innerHTML = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

function playSongAtCurr(timestamp) {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    if (playing === 0){
        audio.currentTime = timestamp;
    }
    audio.play();
    //console.log(audio.currentTime);
}

function updateTimestamp (timestamp){
    updateDoc (doc(db, "touche_data", "lJkUHbTaA7x5zyxnQCap"),{
        timestamp: timestamp
  });
}

// play song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

// pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
    // if (firstPause === 1) {
    //     updateDoc(doc(db, "touche_data", "lJkUHbTaA7x5zyxnQCap"), {
    //         timestamp: audio.currentTime
    //     });
    //     firstPause = 0;
    // }
}

// previous song
function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


// next song
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// update progress bar 
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = clickX / width * duration;
}

// Find browser type

function findBrowser() {
    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';
    // Safari 3.0+ "[object HTMLElementConstructor]"
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1 - 79
    var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    // Edge (based on chromium) detection
    var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);
    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    var output = 'Detecting browsers by ducktyping:<hr>';
    output += 'isFirefox: ' + isFirefox + '<br>';
    output += 'isChrome: ' + isChrome + '<br>';
    output += 'isSafari: ' + isSafari + '<br>';
    output += 'isOpera: ' + isOpera + '<br>';
    output += 'isIE: ' + isIE + '<br>';
    output += 'isEdge: ' + isEdge + '<br>';
    output += 'isEdgeChromium: ' + isEdgeChromium + '<br>';
    output += 'isBlink: ' + isBlink + '<br>';
    console.log(output);

    if (isEdgeChromium) {
        return device_dict["lenovo"];
    } else if (!isEdgeChromium && isChrome) {
        return device_dict["surface"];
    } else {
        return device_dict["iphone"];
    }
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying) {
        pauseSong();
        forcePause = 1;
    } else {
        // updateDoc(doc(db, "touche_data", "lJkUHbTaA7x5zyxnQCap"), {
        //     device_id: 2
        // });
        playSong();
        forcePause = 0;
    }
});

// playBtn.addEventListener('click', () => {
//     updateData();
// });

//change songs
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)


// Time/song update event
audio.addEventListener('timeupdate', updateProgress);

// click on progress bar
progressContainer.addEventListener('click', setProgress);

// song ends
audio.addEventListener('ended', nextSong);


pauseSong();
cur_id = findBrowser();
console.log(cur_id);
//var firstPlay = 1;
while (true){
      const querySnapshot = await getDocs(collection(db, "touche_data"));
      var device_id = 0;
      var timestamp = -1;
      var music_id = 1;
      querySnapshot.forEach((doc) => {
          device_id = doc.data().device_id;
          console.log(`$device_id => ${device_id}`);
          timestamp = doc.data().timestamp;
          music_id = doc.data().music_id;
          console.log(`music_id => ${music_id}`);
      });

      
      if (device_id === cur_id && forcePause === 0){
          if (playing === 0) {
              playSongAtCurr(timestamp);
              playing = 1;
          } else {
              playSong();
          }
          updateTimestamp(audio.currentTime);
          //firstPlay = 0;
      }else if (device_id !== cur_id){
          pauseSong();
          playing = 0;
          //firstPlay = 1;
      }

      
      await new Promise(r => setTimeout(r, 500));
}