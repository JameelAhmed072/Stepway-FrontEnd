document.addEventListener("DOMContentLoaded", function() {
var getToken = localStorage.getItem("token")
// debugger
if(getToken == null){
    window.location.href = 'index.html';
}

var currentPageNumber = 0; // Starting from the first page (0-indexed)
const pageSize = 10;


function allStudentData(pageNumber = currentPageNumber) {
    fetch(`http://localhost:8080/api/students?pageNumber=${pageNumber}`, {
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
        console.log(data);
        
        // Assuming data is an array of student objects
        
        

        const tableBody = document.getElementById('studentTableBody');
        tableBody.innerHTML = ''; // Clear the table body

        data.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>ID # ${student.id}</td>
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
                <td>${student.email}</td>
                <td>${student.phoneNumber}</td>
                
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
       
         allStudentData(currentPageNumber - 1);
         currentPageNumber--;
         console.log("current page at prevBtn click ",currentPageNumber);
     }
 });

 nextButton.addEventListener('click', () => {
     if (currentPageNumber >= 0) {
        
         allStudentData(currentPageNumber + 1);
         currentPageNumber++;
         console.log("current page at nextBtn click ",currentPageNumber);
     }
 });

 // Initial fetch for the first page
 allStudentData();
// console.log(currentPageNumber);
});