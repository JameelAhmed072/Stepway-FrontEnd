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

// Function to close the popup
function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}
closePopup();



// ----------------------------------------  Enroll in Course  ----------------------------------------------

//   code above the line is working, 
// Now I have to take the id of current logged in user then I can implement the Enroll Now action


document.addEventListener('DOMContentLoaded', function () {
    // Add an event listener to the Enroll Now button
    var enrollBtn = document.getElementById('popup-enroll-btn');
    enrollBtn.addEventListener('click', enrollCourse);
});

// Function to handle the Enroll Now button click event
function enrollCourse() {
    // Get the current user id and course id
    var userId = getCurrentUserId();
    var courseId = getClickedCourseId();
    enrollBtn.addEventListener("click", () => getClickedCourseId(selectedCourse));

    // Prepare data to send to the backend
    var data = {
        userId: userId,
        courseId: courseId
    };

    // Make a fetch request to your backend API
    fetch('http://localhost:8080/api/enrollment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Example: Sending JSON data
            'Authorization': `Bearer ${getToken}`, // Example: Sending an authorization token
            // Add any other custom headers as needed
          },
        body: JSON.stringify(data),
    })
    .then(response => response.json()
    )
    .then(data => {
        var token = data.accessToken;
        localStorage.setItem("token",token)

        if(token){
            var a = parseJwt(token);
            
            const userId = a.id;
            
           
        }
        else{
            console.log("Token Not Found");
        }
        console.log(token);
        // You can save the token in local storage or as needed
        // Redirect to index1.html
        
    })
    .catch(error => {
        console.error('Error during enrollment:', error.message);
    });
}

function getCurrentUserId(){

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    var data = {
        "email": username,
        "password": password
    };

    fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json()
        
    )
    .then(data => {
        var token = data.accessToken;
        localStorage.setItem("token",token)

        if(token){
            var a = parseJwt(token);

            const id = a.userId;
            
        }
        else{
            console.log("Token Not Found");
        }
        console.log(token);
        // You can save the token in local storage or as needed
        // Redirect to index1.html
        
    })
    .catch(error => {
        alert("Login failed. Please check your credentials.");
    });
}

function parseJwt (token) {

    var base64Url = token.split('.')[1];
    var base64 = decodeURIComponent(atob(base64Url).split('').map((c)=>{
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(base64);
};

function getClickedCourseId(selectedCourse) {
     // Extract the ID or other relevant information from the selectedCourse
    const courseId = selectedCourse.id;
    
    
    const enrollApiUrl = `http://localhost:8080/api/enrollment/${courseId}`;
        fetch(enrollApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Enrollment successful:', data);
        })
        .catch(error => {
            console.error('Error enrolling in the course:', error);
        });
    closePopup();
}