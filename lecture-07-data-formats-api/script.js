console.log("Portfolio loaded!");
console.log("Student: Ahmed Abdelhamid");
console.log("JavaScript running!");

let isDark = false;

window.onload = function() {
    const savedTheme = localStorage.getItem("portfolio_theme");
    if (savedTheme === "dark") {
        isDark = true;
        document.body.classList.add("dark");
    }
    const today = new Date();
    const formatted = today.toISOString().split("T")[0];
    document.getElementById("last-updated").textContent = "Last updated: " + formatted;
};

function toggleTheme() {
    isDark = !isDark;
    document.body.classList.toggle("dark");
    if (isDark) {
        localStorage.setItem("portfolio_theme", "dark");
    } else {
        localStorage.setItem("portfolio_theme", "light");
    }
}

async function loadData() {
    const display = document.getElementById("data-display");
    display.textContent = "Loading...";
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        if (!response.ok) throw new Error("Response was not ok");
        const user = await response.json();
        display.innerHTML = `
            <div class="card">
                <h3>User Info</h3>
                <p><strong>Name:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Company:</strong> ${user.company.name}</p>
            </div>
        `;
    } catch (error) {
        display.textContent = "Error loading data";
    }
}
