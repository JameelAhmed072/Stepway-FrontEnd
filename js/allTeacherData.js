var getToken = localStorage.getItem("token")
// debugger
if(getToken == null){
    window.location.href = 'index.html';
}

allTeacherData();
function allTeacherData() {
    fetch('http://localhost:8080/api/teachers', {
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
        const tableBody = document.getElementById('teacherTableBody');
        tableBody.innerHTML = ''; // Clear the table body

        data.forEach(teacher => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>ID # ${teacher.id}</td>
                <td>${teacher.firstName}</td>
                <td>${teacher.lastName}</td>
                <td>${teacher.email}</td>
                <td>${teacher.phoneNumber}</td>
                
            `;

            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}