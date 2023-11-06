var getToken = localStorage.getItem("token")
// debugger
if(getToken == null){
    window.location.href = 'index.html';
}



allCoursesData();
function allCoursesData() {
    fetch('http://localhost:8080/api/courses', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', // Example: Sending JSON data
            'Authorization': `Bearer ${getToken}`, // Example: Sending an authorization token
            // Add any other custom headers as needed
          }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Assuming data is an array of student objects
        const tableBody = document.getElementById('coursesTableBody');
        tableBody.innerHTML = ''; // Clear the table body

        data.forEach(courses => {
            const row = document.createElement('tr');
            row.innerHTML = `
                
                <td>${courses.courseName}</td>
                <td>${courses.description}</td>
                <td>${courses.startDate}</td>
                <td>${courses.endDate}</td>
                <td>${courses.type}</td>
                
            `;

            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}