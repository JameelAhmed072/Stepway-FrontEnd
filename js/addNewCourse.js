// const apiUrl = process.env.STEPWAY_APP_API_URL;

var getToken = localStorage.getItem("token")
// debugger
if(getToken == null){
    window.location.href = 'index.html';
}




function saveCourse() {
    // Get input values
    const courseName = document.getElementById('courseName').value;
    const discount = document.getElementById('discount').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const price = document.getElementById('price').value;
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;

    // Create JSON object
    const newCourse = {
        courseName: courseName,
        discount: discount,
        startDate: startDate,
        endDate: endDate,
        price: price,
        type: type,
        description: description
    };

    // Convert object to JSON string
    const jsonData = JSON.stringify(newCourse);

    // Fetch API to send data to the backend
    fetch(`http://localhost:8080/api/course`, {
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
         document.getElementById('courseName').value='';
         document.getElementById('discount').value='';
         document.getElementById('startDate').value='';
         document.getElementById('endDate').value='';
         document.getElementById('price').value='';
         document.getElementById('type').value='';
         document.getElementById('description').value='';

         // Remove the Reset button
         const resetButton = document.querySelector('.btn-fill-lg.bg-blue-dark.btn-hover-yellow');
         resetButton.parentNode.removeChild(resetButton);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}