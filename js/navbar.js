// hamburger menu for tablet/mobile user
const menuIcon = document.querySelector("#btn-menu");
const menu = document.querySelector(".nav-right-links");
const menuBG = document.querySelector(".nav-bg");
var isMenuActive = false;
menuIcon.addEventListener("click", () => {
	isMenuActive
		? (menuIcon.src = "../asset/menu.svg")
		: (menuIcon.src = "../asset/x.svg");
	isMenuActive = !isMenuActive;
	menu.classList.toggle("active");
});

// login for button register at navbar and footer
const btnRegister = document.getElementsByClassName("btn-register");
for (let i = 0; i < btnRegister.length; i++) {
	btnRegister[i].addEventListener("click", function () {
		window.location.pathname = "../html/register.html";
	});
}

//Mark selected navbar page
const activePage = window.location.pathname;
const navLinks = document
	.querySelectorAll(".nav-right-links a")
	.forEach((link) => {
		if (
			(activePage.endsWith("/html/") && link.href.endsWith("index.html")) ||
			link.href.endsWith(activePage.toString())
		) {
			link.classList.add("selected");
		}
	});

const socials = document.querySelectorAll(".footer-icon img");

const links = [
	"https://www.linkedin.com/in/william-0b6356296?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ",
	"https://www.instagram.com/wllyc.04_?igsh=aGdkaGIwc2hpdDJ0",
];

for (let i = 0; i < socials.length; i++) {
	socials[i].addEventListener("click", function () {
		window.open(links[i], "_blank");
	});
}

// click logo to get to the top of the current page
const logoScroll = document
	.querySelector(".nav-left")
	.addEventListener("click", function () {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});
