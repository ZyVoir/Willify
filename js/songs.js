import { allSong } from "./data/songData.js";
const searchInput = document.querySelector("#search-input");
const searchIcon = document.querySelector(".search-icon");

searchInput.addEventListener("input", (e) => {
	const input = e.target.value.toLocaleLowerCase();
	if (input.length === 0) {
		// change back the x into search button
		searchIcon.src = "/asset/magnifying-glass-solid.svg";
	} else {
		// Change the search icon into x button
		searchIcon.src = "/asset/xmark-solid.svg";
	}

	// toggle hide-song class based on the search input
	const list = document
		.querySelector(".search-list")
		.querySelectorAll("li")
		.forEach((song) => {
			// title text contains both song's name and artist
			const titleText = song.querySelector(".search-title").innerText;
			const isVisible = titleText.toLocaleLowerCase().includes(input);
			song.classList.toggle("hide-song", !isVisible);
		});
});

searchIcon.addEventListener("click", function () {
	// if the button of x in the search bar is clicked, remove all hide song to view all songs again
	if (this.src.toString().includes("xmark")) {
		searchInput.value = "";
		searchInput.blur();
		searchIcon.src = "/asset/magnifying-glass-solid.svg";
		// unhide all of the songs
		const list = document
			.querySelector(".search-list")
			.querySelectorAll("li")
			.forEach((song) => {
				song.classList.remove("hide-song");
			});
	} else {
		searchInput.focus();
	}
});

// render all the song
function renderOneSong(song, num) {
	return `<li class="search-content content">
					<img id="search-playbtn" src="/asset/play-solid-black.svg" alt="" />
					<h2>${num}</h2>
					<div class="search-title">
						<img
							src="${song.img}"
							alt=""
						/>
						<div>
							<h3>${song.name}</h3>
							<h4>${song.artist}</h4>
						</div>
					</div>
					<h2>${song.genre}</h2>
					<h2>${song.duration}</h2>
				</li>`;
}

function renderAllSong() {
	const songList = document.querySelector(".search-list");
	for (let i = 0; i < allSong.length; i++) {
		var songItem = renderOneSong(allSong[i], i + 1);
		songList.innerHTML += songItem;
	}
}

renderAllSong();

// function for the list click listener
const songListClick = document
	.querySelector(".search-list")
	.querySelectorAll("li")
	.forEach((item, index) => {
		item.addEventListener("click", function () {
			window.open(`/html/songDetail.html?idx=${index}`, "_self");
		});
	});
