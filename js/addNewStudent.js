// const apiUrl = process.env.STEPWAY_APP_API_URL;

var getToken = localStorage.getItem("token")
// debugger
if(getToken == null){
    window.location.href = 'index.html';
}




function saveStudent() {
    // Get input values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const gender = document.getElementById('gender').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const role = document.getElementById('role').value;

    // Create JSON object
    const newStudent = {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        role: role
    };

    // Convert object to JSON string
    const jsonData = JSON.stringify(newStudent);

    // Fetch API to send data to the backend
    fetch(`http://localhost:8080/api/user`, {
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
            document.getElementById('firstName').value='';
            document.getElementById('lastName').value=''; 
            document.getElementById('gender').value='';
            document.getElementById('email').value='';
            document.getElementById('password').value='';
            document.getElementById('phoneNumber').value='';
            document.getElementById('role').value='';

         // Remove the Reset button
         const resetButton = document.querySelector('.btn-fill-lg.bg-blue-dark.btn-hover-yellow');
         resetButton.parentNode.removeChild(resetButton);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}