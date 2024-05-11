function logout() {
    // Clear the token from local storage
    localStorage.removeItem("token");

    // Optionally, you can also clear other user-related data from local storage
    // localStorage.removeItem("otherUserData");

    // Redirect the user to the login page or any other page you want after logging out
    window.location.href = 'login.html';
}

// Attach the logout function to the logout button's click event
document.getElementById("logout").addEventListener("click", logout);