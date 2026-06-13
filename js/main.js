/*
 * Urian Society — Aurora Edition
 * All interactivity, consolidated. Vanilla ES6+, progressive-enhancement.
 */
(function () {
	"use strict";

	const reduceMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)"
	).matches;

	/* ---------- Header: hide-on-scroll + glass on scroll ---------- */
	const header = document.querySelector(".site-header");
	if (header) {
		let lastY = window.scrollY;
		const onScroll = () => {
			const y = window.scrollY;
			header.classList.toggle("scrolled", y > 24);
			if (y > lastY && y > 240) {
				header.classList.add("hidden");
			} else {
				header.classList.remove("hidden");
			}
			lastY = y;
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
	}

	/* ---------- Mobile navigation ---------- */
	const toggle = document.querySelector(".nav-toggle");
	const mobileNav = document.querySelector(".nav-mobile");
	if (toggle && mobileNav) {
		const setOpen = (open) => {
			toggle.classList.toggle("active", open);
			mobileNav.classList.toggle("open", open);
			toggle.setAttribute("aria-expanded", String(open));
			document.body.style.overflow = open ? "hidden" : "";
		};
		toggle.addEventListener("click", () =>
			setOpen(!mobileNav.classList.contains("open"))
		);
		mobileNav
			.querySelectorAll("a")
			.forEach((a) => a.addEventListener("click", () => setOpen(false)));
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape" && mobileNav.classList.contains("open"))
				setOpen(false);
		});
	}

	/* ---------- Scroll reveal ---------- */
	const revealEls = document.querySelectorAll(".reveal");
	if (revealEls.length) {
		if (reduceMotion || !("IntersectionObserver" in window)) {
			revealEls.forEach((el) => el.classList.add("in"));
		} else {
			const io = new IntersectionObserver(
				(entries, obs) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							entry.target.classList.add("in");
							obs.unobserve(entry.target);
						}
					});
				},
				{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
			);
			revealEls.forEach((el) => io.observe(el));
		}
	}

	/* ---------- Count-up stats ---------- */
	const counters = document.querySelectorAll("[data-count]");
	if (counters.length) {
		const run = (el) => {
			const target = parseFloat(el.dataset.count);
			const suffix = el.dataset.suffix || "";
			const dur = 1500;
			if (reduceMotion) {
				el.textContent = target + suffix;
				return;
			}
			const start = performance.now();
			const tick = (now) => {
				const p = Math.min((now - start) / dur, 1);
				const eased = 1 - Math.pow(1 - p, 3);
				el.textContent = Math.round(target * eased) + suffix;
				if (p < 1) requestAnimationFrame(tick);
			};
			requestAnimationFrame(tick);
		};
		const io = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						run(entry.target);
						obs.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.6 }
		);
		counters.forEach((el) => io.observe(el));
	}

	/* ---------- FAQ accordion ---------- */
	const faqItems = document.querySelectorAll(".faq-item");
	faqItems.forEach((item) => {
		const q = item.querySelector(".faq-q");
		const a = item.querySelector(".faq-a");
		if (!q || !a) return;
		q.setAttribute("aria-expanded", "false");
		q.addEventListener("click", () => {
			const open = item.classList.contains("open");
			faqItems.forEach((other) => {
				other.classList.remove("open");
				const oa = other.querySelector(".faq-a");
				const oq = other.querySelector(".faq-q");
				if (oa) oa.style.maxHeight = null;
				if (oq) oq.setAttribute("aria-expanded", "false");
			});
			if (!open) {
				item.classList.add("open");
				a.style.maxHeight = a.scrollHeight + "px";
				q.setAttribute("aria-expanded", "true");
			}
		});
	});

	/* ---------- Card spotlight (cursor-tracked) ---------- */
	const fine = window.matchMedia("(pointer: fine)").matches;
	if (fine && !reduceMotion) {
		document.querySelectorAll(".card").forEach((card) => {
			card.addEventListener("pointermove", (e) => {
				const r = card.getBoundingClientRect();
				card.style.setProperty("--mx", e.clientX - r.left + "px");
				card.style.setProperty("--my", e.clientY - r.top + "px");
			});
		});

		/* ---------- Ambient cursor glow ---------- */
		const glow = document.createElement("div");
		glow.className = "cursor-glow";
		document.body.appendChild(glow);
		let gx = 0,
			gy = 0,
			cx = 0,
			cy = 0,
			raf = null;
		const render = () => {
			cx += (gx - cx) * 0.15;
			cy += (gy - cy) * 0.15;
			glow.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
			if (Math.abs(gx - cx) > 0.5 || Math.abs(gy - cy) > 0.5) {
				raf = requestAnimationFrame(render);
			} else {
				raf = null;
			}
		};
		window.addEventListener("pointermove", (e) => {
			gx = e.clientX;
			gy = e.clientY;
			glow.style.opacity = "1";
			if (!raf) raf = requestAnimationFrame(render);
		});
		document.addEventListener("pointerleave", () => (glow.style.opacity = "0"));
	}

	/* ---------- Footer year ---------- */
	const yr = document.querySelector("[data-year]");
	if (yr) yr.textContent = new Date().getFullYear();

	/* ---------- Smooth-scroll for in-page anchors ---------- */
	document.querySelectorAll('a[href^="#"]').forEach((a) => {
		a.addEventListener("click", (e) => {
			const id = a.getAttribute("href");
			if (id.length < 2) return;
			const target = document.querySelector(id);
			if (!target) return;
			e.preventDefault();
			target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
		});
	});
})();
