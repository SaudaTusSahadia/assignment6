document.addEventListener("DOMContentLoaded", () => {
    checkLoginStatus();
});

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simple authentication check (for demo, use backend authentication in real projects)
    if (username === "admin" && password === "1234") {
        localStorage.setItem("loggedInUser", username);
        checkLoginStatus();
    } else {
        alert("Invalid username or password!");
    }
}

function logout() {
    localStorage.removeItem("loggedInUser");
    checkLoginStatus();
}

function checkLoginStatus() {
    const user = localStorage.getItem("loggedInUser");

    if (user) {
        document.getElementById("welcomeMessage").innerText = `Welcome, ${user}!`;
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("logoutButton").style.display = "block";
    } else {
        document.getElementById("welcomeMessage").innerText = "Welcome! Please log in.";
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("logoutButton").style.display = "none";
    }
}
