function fetchStudentCount() {
    fetch('http://localhost:8080/api/count')
        .then(response => response.json())
        
        .then(data => {
            const studentCountElement = document.getElementById('studentCount');
            studentCountElement.textContent = data; // Update the content with the fetched number
            console.log(data)
        })
        
        .catch(error => {
            console.error('Error fetching data: ' + error);
        });
}

// Call the function to fetch and update the student count when the page loads
fetchStudentCount();