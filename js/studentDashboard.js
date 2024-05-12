document.addEventListener('DOMContentLoaded', function() {
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
            const tableBody = document.getElementById('dashboardCoursesTableBody');
    
            const tableHeader = document.createElement('tr'); // Create a header row
    
            tableHeader.innerHTML = `
                <th>ID</th>
                <th>CourseName</th>
    
                <th>Description</th>
                <th>Discount</th>
                
                <th>Start Date</th>
                <th>End Date</th>
                <th>Price</th>
                <th>Type</th>
                <th>Action</th>
    
            `;
            tableBody.appendChild(tableHeader);
            
            tableBody.innerHTML = ''; // Clear the table body
            let id = 1;
            data.forEach(courses => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td> ${id}</td>
                <td>${courses.courseName}</td>
                <td>${courses.description}</td>
                <td>${courses.discount}</td>
                <td>${courses.startDate}</td>
                <td>${courses.endDate}</td>
                <td>${courses.price}</td>
                <td>${courses.type}</td>
    
                `;
                tableBody.appendChild(row);
                id++;
            });
            
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
    
    



});