var getToken = localStorage.getItem("token")
// debugger
if(getToken == null){
    window.location.href = 'index.html';
}




// New js file with data fetched from a backend API with headers and method
const apiUrl = "http://localhost:8080/api/allCourses"; // Replace with your actual API endpoint

// Function to fetch course data from the API
async function fetchCourses() {
    try {
        const response = await fetch(apiUrl, {
            method: "GET", // Specify the HTTP method (GET, POST, etc.)
            headers: {
                'Content-Type': 'application/json', // Example: Sending JSON data
                'Authorization': `Bearer ${getToken}`, // Example: Sending an authorization token
                // Add any other custom headers as needed
              },
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching course data:", error);
        return [];
    }
}

// Function to render course cards
async function renderCourses() {
    const container = document.getElementById("course-container");
    const courses = await fetchCourses();

    courses.forEach((course, index) => {
        const card = document.createElement("div");
        card.classList.add("course-card");
        card.addEventListener("click", () => openPopup(index));

        const title = document.createElement("div");
        title.classList.add("course-title");
        title.textContent = course.courseName;

        const description = document.createElement("div");
        description.classList.add("course-description");
        description.textContent = course.description;

        const enrollBtn = document.createElement("a");
        enrollBtn.classList.add("course-enroll-btn");
        // enrollBtn.href = course.enrollLink;
        // enrollBtn.textContent = "Enroll Now";

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(enrollBtn);
        container.appendChild(card);
    });
}

// Call the function to render courses
renderCourses();
// Function to open the popup with course details
async function openPopup(index) {
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popup-title");
    const popupDescription = document.getElementById("popup-description");
    const popupPrice = document.getElementById("popup-price");
    const popupDiscount = document.getElementById("popup-discount");
    const popupStartDate = document.getElementById("popup-start-date");
    const popupEndDate = document.getElementById("popup-end-date");
    const popupType = document.getElementById("popup-type");
    const enrollBtn = document.getElementById("popup-enroll-btn");

    const courses = await fetchCourses(); // Assuming fetchCourses returns the same data structure as in the renderCourses function
    const selectedCourse = courses[index];



    // popupTitle.textContent = selectedCourse.courseName;
    
    // Displaying additional details
    popupDescription.innerHTML = `
        <p>Description: ${selectedCourse.description}</p>
        <p>Discount: ${selectedCourse.discount}%</p>
        <p>Start Date: ${selectedCourse.startDate}</p>
        <p>End Date: ${selectedCourse.endDate}</p>
        <p>Price: ${selectedCourse.price}</p>
        <p>Type: ${selectedCourse.type}</p>
    `;
    
    // enrollBtn.href = selectedCourse.enrollLink;

    popup.style.display = "block";

    
}
// ----------------------------------------  Enroll in Course  ----------------------------------------------




allAvalableCoursesForEnrollment();
function allAvalableCoursesForEnrollment() {
    fetch(`http://localhost:8080/api/enrollcourses`, {
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
        // console.log("courses : ", data);
        // Assuming data is an array of student objects
        const tableBody = document.getElementById('availableCoursesTableBody');
        tableBody.innerHTML = ''; // Clear the table body
        let id = 1;
        data.forEach(course => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${id}</td>
            <td>${course.courseName}</td>
            <td>${course.description}</td>
            <td>${course.discount}</td>
            <td>${course.startDate}</td>
            <td>${course.endDate}</td>
            <td>${course.price}</td>
            <td>${course.type}</td>
            <td><button type="button" class="btn btn-primary btn-lg" alert("Register") data-course-id="${course.id}">Register Course</button></td>
            `;
            tableBody.appendChild(row);
            id++;
        });

        // Add event listeners to all "Register Course" buttons
        const buttons = document.querySelectorAll('.btn-primary');
        buttons.forEach(button => {
            button.addEventListener('click', handleRegisterCourse);
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function handleRegisterCourse(event) {
    const button = event.target;
    const courseId = button.getAttribute('data-course-id');

    // Prepare data to be sent in the POST request
    const requestData = {
        courseId: courseId,
        // Add any other data needed for the POST request here
    };

    // Send the POST request
    fetch(`http://localhost:8080/api/available-enrollment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken}`,
            // Add any other headers as needed
        },
        body: JSON.stringify(requestData) // Convert the requestData object to JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // console.log('Course registered successfully:', data);
        // You can add additional logic here, e.g., showing a success message to the user

        allAvalableCoursesForEnrollment();
    })
    .catch(error => {
        console.error('There was a problem with the POST operation:', error);
    });
}


