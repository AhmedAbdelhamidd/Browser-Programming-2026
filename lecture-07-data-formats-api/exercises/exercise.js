const output = document.getElementById("output");
const userList = document.getElementById("userList");

function log(text) {
    output.textContent += text + "\n";
}

function clearOutput() {
    output.textContent = "";
}

document.getElementById("btnLoadUsers").onclick = loadUsers;

async function loadUsers() {
    clearOutput();
    userList.innerHTML = "";

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("HTTP error: " + response.status);
        }

        const users = await response.json();

        console.log(users);

        users.forEach(function (user) {
            const name = user.name;
            const email = user.email;
            const city = user.address.city;

            const line = name + " - " + email + " - " + city;

            // Print to <pre>
            log(line);

            // Optional: also display in webpage
            const li = document.createElement("li");
            li.textContent = line;
            userList.appendChild(li);
        });

    } catch (error) {
        log("Error: " + error.message);
    }
}