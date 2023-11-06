var getToken = localStorage.getItem("token")
// debugger
if(getToken == null){
    window.location.href = 'index.html';
}


function fetchLogedName() {
    // debugger
    fetch('http://localhost:8080/api/username', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken}`,
          }
    })
        .then(response => response.text())
        .then(data => {
            const UserLoggedName = document.getElementById('UserName');
            UserLoggedName.textContent = data;  // Update the content with the fetched data
            // debugger
        })
        .catch(error => {
            console.error('Error fetching data: ' + error);
        });
}

// Call the function to fetch and update the user's name when the page loads
fetchLogedName();