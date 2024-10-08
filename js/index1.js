var getToken = localStorage.getItem("token")
// debugger
if(getToken == null){
    window.location.href = 'index.html';
}


function fetchStudentCount() {
    // debugger
    fetch('http://localhost:8080/api/count',{
        
        headers: {
            'Content-Type': 'application/json', // Example: Sending JSON data
            'Authorization': `Bearer ${getToken}`, // Example: Sending an authorization token
            // Add any other custom headers as needed
          }
    })
        .then(response => response.text()
        
        )
        .then(data => {
            const studentCountElement = document.getElementById('studentCount');
            studentCountElement.textContent = data; 
        })
        
        .catch(error => {
            console.error('Error fetching data: ' + error);
        });
}

// Call the function to fetch and update the student count when the page loads
fetchStudentCount();

// ----------------------------------    total teachers   --------------------------------

function fetchTeacherCount() {
    // debugger
    fetch('http://localhost:8080/api/countTeachers',{
        
        headers: {
            'Content-Type': 'application/json', // Example: Sending JSON data
            'Authorization': `Bearer ${getToken}`, // Example: Sending an authorization token
            // Add any other custom headers as needed
          }
    })
        .then(response => response.text()
        
        )
        .then(data => {
            const studentCountElement = document.getElementById('teacherCount');
            studentCountElement.textContent = data; 
        })
        
        .catch(error => {
            console.error('Error fetching data: ' + error);
        });
}
fetchTeacherCount();

// -----------------------------------    Total Courses    -------------------------------------

function fetchCoursesCount() {
    // debugger
    fetch('http://localhost:8080/api/totalCourses',{
        
        headers: {
            'Content-Type': 'application/json', // Example: Sending JSON data
            'Authorization': `Bearer ${getToken}`, // Example: Sending an authorization token
            // Add any other custom headers as needed
          }
    })
        .then(response => response.text()
        
        )
        .then(data => {
            const studentCountElement = document.getElementById('coursesCount');
            studentCountElement.textContent = data; 
        })
        
        .catch(error => {
            console.error('Error fetching data: ' + error);
        });
}
fetchCoursesCount();




function fetchTotalEarning() {
    fetch('http://localhost:8080/api/earning',{
        
        headers: {
            'Content-Type': 'application/json', // Example: Sending JSON data
            'Authorization': `Bearer ${getToken}`, // Example: Sending an authorization token
            // Add any other custom headers as needed
          }
    })
        .then(response => response.text())
        
        .then(data => {
            var studentCountElement = document.getElementById('earning');
            studentCountElement.textContent = data; // Update the content with the fetched number
            // console.log(data);
        })
        
        .catch(error => {
            console.error('Error fetching data: ' + error);
        });
}

// Call the function to fetch and update the student count when the page loads
fetchTotalEarning();


function fetchFemaleStudents() {
    fetch('http://localhost:8080/api/femaleStudents',{
        
        headers: {
            'Content-Type': 'application/json', // Example: Sending JSON data
            'Authorization': `Bearer ${getToken}`, // Example: Sending an authorization token
            // Add any other custom headers as needed
          }
    })
        .then(response => response.text())
        
        .then(data => {
            const studentCountElement = document.getElementById('countFemaleStudents');
            studentCountElement.textContent = data; // Update the content with the fetched number
            // console.log(data);
        })
        
        .catch(error => {
            console.error('Error fetching data: ' + error);
        });
}

// Call the function to fetch and update the student count when the page loads
fetchFemaleStudents();


function fetchMaleStudents() {
    fetch('http://localhost:8080/api/maleStudents',{
        
        headers: {
            'Content-Type': 'application/json', // Example: Sending JSON data
            'Authorization': `Bearer ${getToken}`, // Example: Sending an authorization token
            // Add any other custom headers as needed
          }
    })
        .then(response => response.text())
        
        .then(data => {
            const studentCountElement = document.getElementById('countMaleStudents');
            studentCountElement.textContent = data; // Update the content with the fetched number
            // console.log(data);
        })
        
        .catch(error => {
            console.error('Error fetching data: ' + error);
        });
}

// Call the function to fetch and update the student count when the page loads
fetchMaleStudents();




function certificationCount() {
    fetch('http://localhost:8080/api/countTotalCertifications',{
        
        headers: {
            'Content-Type': 'application/json', // Example: Sending JSON data
            'Authorization': `Bearer ${getToken}`, // Example: Sending an authorization token
            // Add any other custom headers as needed
          }
    })
        .then(response => response.text())
        
        .then(data => {
            const studentCountElement = document.getElementById('certificationCount');
            studentCountElement.textContent = data; // Update the content with the fetched number
            // console.log(data);
        })
        
        .catch(error => {
            console.error('Error fetching data: ' + error);
        });
}

// Call the function to fetch and update the student count when the page loads
certificationCount();



function totalRegistrations() {
    fetch('http://localhost:8080/api/countTotalEnrollments',{
        
        headers: {
            'Content-Type': 'application/json', // Example: Sending JSON data
            'Authorization': `Bearer ${getToken}`, // Example: Sending an authorization token
            // Add any other custom headers as needed
          }
    })
        .then(response => response.text())
        
        .then(data => {
            const studentCountElement = document.getElementById('totalRegistrations');
            studentCountElement.textContent = data; // Update the content with the fetched number
            // console.log(data);
        })
        
        .catch(error => {
            console.error('Error fetching data: ' + error);
        });
}

// Call the function to fetch and update the student count when the page loads
totalRegistrations();



