
document.addEventListener("DOMContentLoaded", function() {

var getToken = localStorage.getItem("token")
// debugger
if(getToken == null){
    window.location.href = 'index.html';
}


var currentPageNumber = 0; // Starting from the first page (0-indexed)
const pageSize = 10;


function allCoursesData(pageNumber = currentPageNumber) {
    fetch(`http://localhost:8080/api/allCourses?pageNumber=${pageNumber}`, {
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
                <td>ID # ${courses.id}</td>
                <td>${courses.courseName}</td>
                <td>${courses.description}</td>
                <td>${courses.discount}</td>
                <td>${courses.startDate}</td>
                <td>${courses.endDate}</td>
                <td>${courses.price}</td>
                <td>${courses.type}</td>
            `;

            tableBody.appendChild(row);
        });

         // Enable/disable pagination buttons based on the current page number
         const previousButton = document.getElementById('preBtn');
         const nextButton = document.getElementById('nextBtn');
         
 
         // Enable/disable previous button
         if (pageNumber > 0) {
             previousButton.disabled = false;
         } else {
             previousButton.disabled = true;
         }
         // Enable/disable next button based on whether there are more pages to load
         // nextButton.disabled = !data.hasMorePages;
 
         // Update the current page number
         currentPageNumber = pageNumber;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

// Event listeners for pagination buttons
const previousButton = document.getElementById('preBtn');
const nextButton = document.getElementById('nextBtn');

previousButton.addEventListener('click', () => {
   
    if (currentPageNumber > 0) {
      
        allCoursesData(currentPageNumber - 1);
        currentPageNumber--;
        console.log("current page at prevBtn click ",currentPageNumber);
    }
});

nextButton.addEventListener('click', () => {
    if (currentPageNumber >= 0) {
       
        allCoursesData(currentPageNumber + 1);
        currentPageNumber++;
        console.log("current page at nextBtn click ",currentPageNumber);
    }
});

// Initial fetch for the first page
allCoursesData();
// console.log(currentPageNumber);

allCoursesForTeacher();
function allCoursesForTeacher() {
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
        const tableBody = document.getElementById('teacherCoursesTableBody');
        tableBody.innerHTML = ''; // Clear the table body
        debugger
        data.forEach(courses => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>ID # ${courses.id}</td>
                <td>${courses.courseName}</td>
                <td>${courses.description}</td>
                <td>${courses.startDate}</td>
                <td>${courses.endDate}</td>
            `;

            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

});