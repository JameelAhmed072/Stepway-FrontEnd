// document.addEventListener('DOMContentLoaded', function() {
    var getToken = localStorage.getItem("token")
    // debugger
    if(getToken == null){
        window.location.href = 'index.html';
    }

    teacherAllCoursesData();
function teacherAllCoursesData() {
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
        // debugger
        // Assuming data is an array of student objects
        const tableBody = document.getElementById('teacherCoursesTableBody');

        const tableHeader = document.createElement('tr'); // Create a header row
        

        // Set the header row content
        tableHeader.innerHTML = `
            <th>No</th>
            <th>CourseID</th>
            <th>CourseName</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
        `;

        tableBody.appendChild(tableHeader);

        tableBody.innerHTML = ''; // Clear the table body
        let id = 1;
        data.forEach(courses => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td> ${id}</td>
            <td>${courses.id}</td>
            <td>${courses.courseName}</td>
            <td>${courses.description}</td>
            <td>${courses.startDate}</td>
            <td>${courses.endDate}</td>
            <td><button class="addAssessmentBtn btn btn-primary btn-lg" data-courseid="${courses.id}">Assessments</button></td>
            `;
            

            tableBody.appendChild(row);
            id++;
        });
        
        // Add event listener to each Assessments button
        const assessmentButtons = document.querySelectorAll('.addAssessmentBtn');
        assessmentButtons.forEach(button => {
            button.addEventListener('click', function() {
                const courseId = this.getAttribute('data-courseid');
                fetchAssessmentDataAndRedirect(courseId);
            });
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function fetchAssessmentDataAndRedirect(courseId) {
    fetch(`http://localhost:8080/api/allAssessments/${courseId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken}`, 
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Redirect to TeacherAssessment.html with courseId as query parameter
        debugger
         const tableBody = document.getElementById('teacherCoursesTableBody');
         
         const tableHeader = document.createElement('tr'); // Create a header row
        tableBody.innerHTML = ''; // Clear the table body
        tableHeader.innerHTML = '';

        // window.location.href = `assesment`;

         // Set the header row content
         tableHeader.innerHTML = `
         <th>ID</th>
         <th>Date</th>
         <th>Description</th>
         <th>Course ID</th>

     `;

     tableBody.appendChild(tableHeader);

        let id = 1;
        console.log("data is : ", data);

        data.forEach(courses => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td> ${id}</td>
            <td>${courses.date}</td>
            <td>${courses.description}</td>
            <td>${courses.courseId}</td>
            `;
            tableBody.appendChild(row);
            id++;
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}


// });