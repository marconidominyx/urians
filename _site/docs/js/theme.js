// Theme toggle functionality
document.addEventListener("DOMContentLoaded", () => {
	const themeToggle = document.querySelector(".theme-toggle");
	const icon = themeToggle.querySelector("i");
	const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

	// Function to set theme with transition
	const setTheme = (theme) => {
		// Add transition class before changing theme
		document.documentElement.classList.add("theme-transition");

		// Set theme after a small delay to ensure transition is applied
		setTimeout(() => {
			document.documentElement.setAttribute("data-theme", theme);
			localStorage.setItem("theme", theme);

			// Update icon with animation
			icon.style.transform = "rotate(180deg)";
			setTimeout(() => {
				if (theme === "dark") {
					icon.classList.remove("fa-sun");
					icon.classList.add("fa-moon");
				} else {
					icon.classList.remove("fa-moon");
					icon.classList.add("fa-sun");
				}
				icon.style.transform = "rotate(0)";
			}, 150);
		}, 50);

		// Remove transition class
		setTimeout(() => {
			document.documentElement.classList.remove("theme-transition");
		}, 300);
	};

	// Check for saved theme preference
	const savedTheme =
		localStorage.getItem("theme") ||
		(prefersDarkScheme.matches ? "dark" : "light");
	setTheme(savedTheme);

	// Toggle theme on button click
	themeToggle.addEventListener("click", () => {
		const currentTheme = document.documentElement.getAttribute("data-theme");
		const newTheme = currentTheme === "light" ? "dark" : "light";
		setTheme(newTheme);
	});

	// Handle system theme changes
	prefersDarkScheme.addEventListener("change", (e) => {
		if (!localStorage.getItem("theme")) {
			setTheme(e.matches ? "dark" : "light");
		}
	});
});
