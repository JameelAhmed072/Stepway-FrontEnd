// const apiUrl = process.env.STEPWAY_APP_API_URL;

var getToken = localStorage.getItem("token")
// debugger
if(getToken == null){
    window.location.href = 'index.html';
}

function saveAssessment() {
    // Get input values
    const date = document.getElementById('date').value;
    const courseId = document.getElementById('courseId').value;
    const description = document.getElementById('description').value;

    // Create JSON object
    const newCourse = {
       
        date: date,
        courseId: courseId,
        description: description
    };

    // Convert object to JSON string
    const jsonData = JSON.stringify(newCourse);

    // Fetch API to send data to the backend
    fetch(`http://localhost:8080/api/assessment`, {
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
         document.getElementById('date').value='';
         document.getElementById('courseId').value='';
         document.getElementById('description').value='';

         // Remove the Reset button
         const resetButton = document.querySelector('.btn-fill-lg.bg-blue-dark.btn-hover-yellow');
         resetButton.parentNode.removeChild(resetButton);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}