// const apiUrl = process.env.STEPWAY_APP_API_URL;

var getToken = localStorage.getItem("token")
// debugger
if(getToken == null){
    window.location.href = 'index.html';
}




function saveInstitute() {
    // Get input values
    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;
    const type = document.getElementById('type').value;

    // Create JSON object
    const newInstitute = {
        name: name,
        location: location,
        type: type
    };

    // Convert object to JSON string
    const jsonData = JSON.stringify(newInstitute);

    // Fetch API to send data to the backend
    fetch(`http://localhost:8080/api/institute`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Example: Sending JSON data
            'Authorization': `Bearer ${getToken}`, // Example: Sending an authorization token
            // Add any other custom headers as needed
          },
        body: jsonData
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        console.log('Success:', data);
         // Reset form fields
            document.getElementById('name').value='';
            document.getElementById('location').value=''; 
            document.getElementById('type').value='';
            
         // Remove the Reset button
         const resetButton = document.querySelector('.btn-fill-lg.bg-blue-dark.btn-hover-yellow');
         resetButton.parentNode.removeChild(resetButton);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}