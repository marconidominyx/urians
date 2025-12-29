/**
 * Mobile Menu Functionality
 * Handles the mobile menu toggle and related behaviors
 */

document.addEventListener("DOMContentLoaded", function () {
	// Get DOM elements
	const mobileMenuBtn = document.querySelector(".mobile-menu");
	const navMenu = document.querySelector("nav ul");
	const header = document.querySelector("header");

	// Check if elements exist
	if (!mobileMenuBtn || !navMenu || !header) {
		console.warn("Mobile menu elements not found");
		return;
	}

	// Toggle mobile menu
	mobileMenuBtn.addEventListener("click", function (e) {
		e.stopPropagation();
		toggleMobileMenu();
	});

	// Close menu when clicking outside
	document.addEventListener("click", function (e) {
		if (
			!e.target.closest("nav") &&
			!e.target.closest(".mobile-menu") &&
			navMenu.classList.contains("show")
		) {
			closeMobileMenu();
		}
	});

	// Close menu when clicking a link
	navMenu.querySelectorAll("a").forEach(function (link) {
		link.addEventListener("click", function () {
			closeMobileMenu();
		});
	});

	// Add scroll behavior to header
	let lastScroll = 0;
	window.addEventListener("scroll", function () {
		const currentScroll = window.pageYOffset;

		// Add scrolled class when page is scrolled
		if (currentScroll > 50) {
			header.classList.add("scrolled");
		} else {
			header.classList.remove("scrolled");
		}

		if (currentScroll <= 0) {
			header.classList.remove("header-hidden");
			return;
		}

		if (
			currentScroll > lastScroll &&
			!header.classList.contains("header-hidden")
		) {
			// Scrolling down
			header.classList.add("header-hidden");
		} else if (
			currentScroll < lastScroll &&
			header.classList.contains("header-hidden")
		) {
			// Scrolling up
			header.classList.remove("header-hidden");
		}

		lastScroll = currentScroll;
	});

	// Toggle mobile menu function
	function toggleMobileMenu() {
		navMenu.classList.toggle("show");
		mobileMenuBtn.classList.toggle("active");
	}

	// Close mobile menu function
	function closeMobileMenu() {
		navMenu.classList.remove("show");
		mobileMenuBtn.classList.remove("active");
	}
});
