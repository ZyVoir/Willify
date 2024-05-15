import {
	allSong,
	bestSellerIndex,
	recommendationIndex,
} from "./data/songData.js";

// best seller header button (more) -> songs page
const moreButton = document
	.querySelector(".best-seller-header button")
	.addEventListener("click", function (e) {
		window.location.pathname = "/html/songs.html";
	});

// populate best seller ul with li
function createBestSellerInstance(song) {
	return `<li>
						<div class="best-seller-song">
							<img
								src="${song.img}"
								class="song-img-blur"
								alt=""
							/>
							<img
								src="${song.img}"
								class="song-img"
								alt=""
							/>
							<div class="best-seller-hover">
								<div class="best-seller-playbtn">
									<img src="/asset/play-solid.svg" alt="" />
								</div>
							</div>
							<h2>${song.name}</h2>
							<h4>${song.artist}</h4>
						</div>
					</li>`;
}

function renderBestSeller() {
	var bestSellerList = document.querySelector(".best-seller-list");
	bestSellerList.innerHTML = "";
	bestSellerIndex.forEach((index) => {
		var itemSong = createBestSellerInstance(allSong[index]);
		bestSellerList.innerHTML += itemSong;
	});
}
renderBestSeller();

// click best seller -> Song Detail
const bestSellerList = document
	.querySelector(".best-seller-list")
	.querySelectorAll("li")
	.forEach((item, index) => {
		item.addEventListener("click", function () {
			// console.log("Allsong CLicked:", allSong[bestSellerIndex[index]]);
			window.open(
				`/html/songDetail.html?idx=${bestSellerIndex[index]}`,
				"_self"
			);
		});
	});

// populate recommendation ul with li
function createRecommendationInstance(song, num) {
	return `<li>
							<div class="recommendation-song">
								<img
									class="recommendation-playbtn"
									src="/asset/play-solid-black.svg"
									alt=""
								/>
								<h5>${num}</h5>
								<img
									src="${song.img}"
									alt=""
								/>
								<div class="recommendation-song-title">
									<h3>${song.name}</h3>
									<h4>${song.artist}</h4>
								</div>
							</div>
						</li>`;
}

function renderRecommendation() {
	var recommendationList = document.querySelector(".recommendation-list");
	recommendationList.innerHTML = "";
	for (var i = 0; i < recommendationIndex.length; i++) {
		var itemSong = createRecommendationInstance(
			allSong[recommendationIndex[i]],
			i + 1
		);
		recommendationList.innerHTML += itemSong;
	}
}

renderRecommendation();

// click recommendation -> Song Detail
const recommendationList = document
	.querySelector(".recommendation-list")
	.querySelectorAll("li")
	.forEach((item, index) => {
		item.addEventListener("click", function () {
			window.open(
				`/html/songDetail.html?idx=${recommendationIndex[index]}`,
				"_self"
			);
		});
	});

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
var randomSongIdx = -1;
function generateRandomRecSong() {
	randomSongIdx = getRandomInt(0, allSong.length - 1);
	const song = allSong[randomSongIdx];
	return `<img
								src="${song.img}"
								alt=""
							/>
							<div class="surprise-song-title">
								<h3>${song.name}</h3>
								<h4>${song.artist}</h4>
							</div>`;
}

var surprisePlaceHolder = document.querySelector(
	".recommendation-surprise-placeholder"
);

// surprise button
const surpriseBtn = document
	.querySelector(".recommendation-surprise .black-button")
	.addEventListener("click", function (e) {
		surprisePlaceHolder.classList.remove("noitem");
		surprisePlaceHolder.innerHTML = generateRandomRecSong();
	});

surprisePlaceHolder.addEventListener("click", function (e) {
	window.open(`/html/songDetail.html?idx=${randomSongIdx}`, "_self");
});
