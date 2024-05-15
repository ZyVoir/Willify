import { allSong } from "./data/songData.js";

// helper function
// For determining overflow of the name of the selected song
function isOverflowing(element) {
	return element.offsetWidth > element.parentElement.offsetWidth;
}

// get selected song in the param
const params = new URLSearchParams(window.location.search);
const idx = parseInt(params.get("idx"));
const selectedSong = allSong[idx];

// set name of the page title
document.title = "Willify - " + selectedSong.name;

// slider progress
const slider = document.getElementById("slider-progress");
const player = document.getElementById("audio-player");
const btns = document.querySelectorAll(".content-icon img");

// change the song to the selected song
player.src = selectedSong.src;

// set slider initial duration
player.onloadedmetadata = function () {
	slider.max = player.duration;
	slider.value = player.currentTime;
};

// volume set on 1/4 by default
player.volume = 0.25;

// on change the slider
slider.addEventListener("input", function () {
	player.play();
	player.currentTime = slider.value;
	btns[1].src = "/asset/pause-solid.svg";
});

// set the moving slider
player.addEventListener("timeupdate", function () {
	slider.value = player.currentTime;
});

// forward, play, and backward button

// backward btn -> move to the previous song by directing the page to go to another detail page with the previous index
btns[0].addEventListener("click", function () {
	const before = idx == 0 ? allSong.length - 1 : idx - 1;
	window.open(`/html/songDetail.html?idx=${before}`, "_self");
});

// play -> Play button only change icon, does not play the actual music
btns[1].addEventListener("click", function () {
	if (this.src.toString().includes("play")) {
		this.src = "/asset/pause-solid.svg";
		player.play();
	} else {
		this.src = "/asset/play-solid-black.svg";
		player.pause();
	}
});

// forward btn -> move to the next song by directing the page to go to another detail page with the next index
btns[2].addEventListener("click", function () {
	window.open(
		`/html/songDetail.html?idx=${(idx + 1) % allSong.length}`,
		"_self"
	);
});

// replace placeholder with the data
const showImg = document.getElementById("playing-img");
showImg.src = selectedSong.img;

const showImgBG = document.getElementById("playing-img-bg");
showImgBG.src = selectedSong.img;

const showName = document.getElementById("playing-name");
showName.innerText = selectedSong.name;

// if the text width > the div's width, make it marquee (Animation like a running text)
if (isOverflowing(showName)) {
	showName.classList.add("marquee");
}

const showArtist = document.getElementById("playing-artist");
showArtist.innerText = "Artist : " + selectedSong.artist;

const showGenre = document.getElementById("playing-genre");
showGenre.innerText = "Genre : " + selectedSong.genre;

const showDuration = document.getElementById("playing-duration");
showDuration.innerText = selectedSong.duration;

//lyric
const lyric = document.querySelector(".tabs-content.content-lyric");
lyric.innerText = selectedSong.lyric;
