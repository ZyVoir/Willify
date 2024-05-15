const btnLinks = document
	.querySelectorAll(".about-links img")
	.forEach((btn, index) => {
		btn.addEventListener("click", function () {
			window.open(links[index], "_blank");
		});
	});
