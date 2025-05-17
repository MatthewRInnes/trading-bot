"use strict";

// Function to set the theme
function setTheme(themeName) {
	localStorage.setItem("theme", themeName);
	document.documentElement.className = themeName === "dark" ? "dark-mode" : "light-mode";
}

// Function to set user preference
function setUserPreference() {
	const theme = localStorage.getItem("theme");
	if (theme) return setTheme(theme);

	const doesUserPreferDarkMode = window.matchMedia(["(prefers-color-scheme: dark)"]).matches;
	doesUserPreferDarkMode ? setTheme("dark") : setTheme("light");
}

// Function to toggle between themes
function toggleTheme() {
	const currentTheme = localStorage.getItem("theme");
	const themeToSet = currentTheme === "dark" ? "light" : "dark";
	setTheme(themeToSet);
}

// Initialise theme on page load
window.addEventListener('load', function() {
	setUserPreference();

	const toggleThemeBtn = document.querySelector(".toggle-theme-btn");

	toggleThemeBtn && toggleThemeBtn.addEventListener("click", toggleTheme);
}) 