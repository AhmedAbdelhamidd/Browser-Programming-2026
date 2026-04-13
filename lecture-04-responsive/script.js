// Console messages
console.log("Page loaded successfully");
console.log("Portfolio of Ahmed Abdelhamid");
console.log("JavaScript is working!");

// Variables
const studentName = "Ahmed Abdelhamid";
let isDarkMode = false;
let clickCount = 0;

// Function 1 - Theme Toggle (Feature A)
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark-mode");
    console.log("Theme toggled. Dark mode is: " + isDarkMode);
}

// Function 2 - Click Counter (Feature B)
function countClick() {
    clickCount++;
    console.log("Button clicked! Total clicks: " + clickCount);
    document.getElementById("counter-display").textContent =
        "You liked this project " + clickCount + " time(s)! 🎉";
}
