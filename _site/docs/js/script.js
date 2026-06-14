/**
 * Urian Society Community Website
 * Main JavaScript File - 2025 Edition
 */

document.addEventListener("DOMContentLoaded", function () {
	// Theme Toggle Functionality
	const themeToggle = document.querySelector(".theme-toggle");
	const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

	// Set initial theme based on system preference or stored preference
	const savedTheme = localStorage.getItem("theme");
	if (savedTheme) {
		document.documentElement.setAttribute("data-theme", savedTheme);
		updateThemeIcon(savedTheme);
	} else if (prefersDarkScheme.matches) {
		document.documentElement.setAttribute("data-theme", "dark");
		updateThemeIcon("dark");
	}

	// Theme toggle click handler
	themeToggle.addEventListener("click", () => {
		const currentTheme = document.documentElement.getAttribute("data-theme");
		const newTheme = currentTheme === "dark" ? "light" : "dark";

		document.documentElement.setAttribute("data-theme", newTheme);
		localStorage.setItem("theme", newTheme);
		updateThemeIcon(newTheme);
	});

	// Update theme icon based on current theme
	function updateThemeIcon(theme) {
		const icon = themeToggle.querySelector("i");
		if (theme === "dark") {
			icon.className = "fas fa-sun";
		} else {
			icon.className = "fas fa-moon";
		}
	}

	// Intersection Observer for animations
	const animatedElements = document.querySelectorAll(
		".fade-in, .slide-up, .scale-in"
	);

	const animationObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.style.opacity = "1";
					entry.target.style.transform = "none";
				}
			});
		},
		{
			threshold: 0.1,
			rootMargin: "50px",
		}
	);

	animatedElements.forEach((el) => {
		el.style.opacity = "0";
		el.style.transform = el.classList.contains("slide-up")
			? "translateY(20px)"
			: el.classList.contains("scale-in")
			? "scale(0.95)"
			: "none";
		el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
		animationObserver.observe(el);
	});

	// Active link highlighting
	const currentPath = window.location.pathname;
	const navLinks = document.querySelectorAll("nav ul li a");

	navLinks.forEach((link) => {
		if (link.getAttribute("href") === currentPath.split("/").pop()) {
			link.classList.add("active");
		}
	});

	// Smooth scroll for anchor links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute("href"));
			if (target) {
				const headerOffset = 100;
				const elementPosition = target.getBoundingClientRect().top;
				const offsetPosition =
					elementPosition + window.pageYOffset - headerOffset;

				window.scrollTo({
					top: offsetPosition,
					behavior: "smooth",
				});
			}
		});
	});

	// Event card hover effect
	const eventCards = document.querySelectorAll(".event-card");

	eventCards.forEach((card) => {
		card.addEventListener("mouseenter", () => {
			card.style.transform = "translateY(-10px)";
			card.style.boxShadow = "0 20px 25px rgba(0, 0, 0, 0.1)";
		});

		card.addEventListener("mouseleave", () => {
			card.style.transform = "translateY(0)";
			card.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
		});
	});

	// Form submission with loading state
	const forms = document.querySelectorAll("form");

	forms.forEach((form) => {
		form.addEventListener("submit", async function (e) {
			e.preventDefault();

			const submitBtn = form.querySelector('button[type="submit"]');
			const originalText = submitBtn.innerHTML;

			// Add loading state
			submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
			submitBtn.disabled = true;

			// Simulate form submission (replace with actual API call)
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Success state
			submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
			form.reset();

			// Reset button after 2 seconds
			setTimeout(() => {
				submitBtn.innerHTML = originalText;
				submitBtn.disabled = false;
			}, 2000);
		});
	});

	// Lazy loading images
	const images = document.querySelectorAll('img[loading="lazy"]');

	if ("loading" in HTMLImageElement.prototype) {
		images.forEach((img) => {
			img.src = img.dataset.src;
		});
	} else {
		// Fallback for browsers that don't support lazy loading
		const script = document.createElement("script");
		script.src =
			"https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
		document.body.appendChild(script);
	}

	// Theme preference detection and application
	if (
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
	) {
		document.body.classList.add("dark-theme");
	}

	// Listen for theme changes
	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", (e) => {
			if (e.matches) {
				document.body.classList.add("dark-theme");
			} else {
				document.body.classList.remove("dark-theme");
			}
		});

	// FAQ Accordion
	const faqItems = document.querySelectorAll(".faq-item");

	if (faqItems.length > 0) {
		faqItems.forEach((item) => {
			const question = item.querySelector(".faq-question");

			question.addEventListener("click", () => {
				const isActive = item.classList.contains("active");

				// Close all other items
				faqItems.forEach((otherItem) => {
					if (otherItem !== item) {
						otherItem.classList.remove("active");
					}
				});

				// Toggle current item
				item.classList.toggle("active");
			});
		});
	}

	// Event Filtering
	const filterButtons = document.querySelectorAll(".filter-btn");
	const eventCards = document.querySelectorAll(".event-card");

	if (filterButtons.length > 0 && eventCards.length > 0) {
		filterButtons.forEach((button) => {
			button.addEventListener("click", () => {
				// Update active class on buttons
				filterButtons.forEach((btn) => btn.classList.remove("active"));
				button.classList.add("active");

				const filterValue = button.getAttribute("data-filter");

				// Show/hide events based on filter
				eventCards.forEach((card) => {
					if (
						filterValue === "all" ||
						card.getAttribute("data-category") === filterValue
					) {
						card.style.display = "flex";
					} else {
						card.style.display = "none";
					}
				});
			});
		});
	}

	// Article Expand/Collapse
	const articleExpanders = document.querySelectorAll(".article-expand");

	if (articleExpanders.length > 0) {
		articleExpanders.forEach((expander) => {
			expander.addEventListener("click", function (e) {
				e.preventDefault();

				const article = this.closest(".news-article");
				article.classList.toggle("expanded");

				// Change icon and text
				const icon = this.querySelector("i");
				if (article.classList.contains("expanded")) {
					this.textContent = "Show Less ";
					this.appendChild(icon);
					icon.classList.remove("fa-chevron-down");
					icon.classList.add("fa-chevron-up");
				} else {
					this.textContent = "Read Full Article ";
					this.appendChild(icon);
					icon.classList.remove("fa-chevron-up");
					icon.classList.add("fa-chevron-down");
				}
			});
		});
	}

	// Back to Top Button
	const backToTopButton = document.querySelector(".back-to-top");

	if (backToTopButton) {
		backToTopButton.addEventListener("click", function (e) {
			e.preventDefault();
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		});

		// Show/hide button based on scroll position
		window.addEventListener("scroll", function () {
			if (window.scrollY > 300) {
				backToTopButton.style.opacity = "1";
				backToTopButton.style.visibility = "visible";
			} else {
				backToTopButton.style.opacity = "0";
				backToTopButton.style.visibility = "hidden";
			}
		});
	}

	// Add to Calendar functionality
	const calendarButtons = document.querySelectorAll(".add-calendar-btn");

	if (calendarButtons.length > 0) {
		calendarButtons.forEach((button) => {
			button.addEventListener("click", function () {
				const eventName = this.getAttribute("data-event");
				alert(`Event "${eventName}" has been added to your calendar!`);
				// In a real implementation, this would integrate with actual calendar APIs
			});
		});
	}

	// Newsletter subscription
	const subscribeForm = document.querySelector(".subscribe-form");

	if (subscribeForm) {
		subscribeForm.addEventListener("submit", function (e) {
			e.preventDefault();

			const emailInput = this.querySelector('input[type="email"]');

			if (emailInput && emailInput.value) {
				alert(
					`Thank you for subscribing with ${emailInput.value}! You'll receive our newsletter soon.`
				);
				emailInput.value = "";
			} else {
				alert("Please enter a valid email address.");
			}
		});
	}
});
