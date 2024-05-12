var getToken = localStorage.getItem("token")
// debugger
if(getToken == null){
    window.location.href = 'index.html';
}



allCoursesData();
function allCoursesData() {
    fetch(`http://localhost:8080/api/studentCertification`, {
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
        console.log("certificate : ", data);
        // Assuming data is an array of student objects
        const tableBody = document.getElementById('certificationTableBody');
        tableBody.innerHTML = ''; // Clear the table body
        let id = 1;
        data.forEach(certificate => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${id}</td>
            <td>${certificate.name}</td>
            <td>${certificate.dateEarned}</td>
            <td>${certificate.courseId}</td>
            `;
            tableBody.appendChild(row);
            id++;
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

    
function fetchStudentCertificationCount() {
    // debugger
    fetch('http://localhost:8080/api/countCurrentUserCertificates',{
        
        headers: {
            'Content-Type': 'application/json', // Example: Sending JSON data
            'Authorization': `Bearer ${getToken}`, // Example: Sending an authorization token
            // Add any other custom headers as needed
          }
    })
        .then(response => response.text()
        
        )
        .then(data => {
            console.log(data);
            const studentCountElement = document.getElementById('certificationsCount');
            studentCountElement.textContent = data; 
        })
        
        .catch(error => {
            console.error('Error fetching data: ' + error);
        });
}

// Call the function to fetch and update the student count when the page loads
fetchStudentCertificationCount();




