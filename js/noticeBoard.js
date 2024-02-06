var getToken = localStorage.getItem("token")
// debugger
if(getToken == null){
    window.location.href = 'index.html';
}



        fetch('http://localhost:8080/api/allNotices' ,{
            method: 'GET',
                headers: {
                    'Content-Type': 'application/json', // Example: Sending JSON data
                    'Authorization': `Bearer ${getToken}`, // Example: Sending an authorization token
                    // Add any other custom headers as needed
                }
        })
        .then(response => response.json())
        .then(data => {
            // Assuming data is an array of notices
            const noticeBoard = document.getElementById('noticeBoard');

            // Loop through the data and create HTML elements dynamically
            data.forEach(notice => {
                const noticeItem = document.createElement('div');
                noticeItem.className = 'notice-list';

                noticeItem.innerHTML = `
                    <div class="post-date bg-skyblue">${notice.date}</div>
                    <h3>${notice.title}</h3>
                    <h6 class="notice-title"><a href="#">${notice.details}</a></h6>
                    <div class="entry-meta">${notice.postedBy}</div>
                `;

                // Append the dynamically created notice item to the notice board
                noticeBoard.appendChild(noticeItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));


// -----------------------------    create Notice    -----------------------------------

function saveNotice() {
    // Get input values
    const title = document.getElementById('title').value;
    const details = document.getElementById('details').value;
    const postedBy = document.getElementById('postedBy').value;
    const date = document.getElementById('date').value;

    // Create JSON object
    const noticeData = {
        title: title,
        details: details,
        postedBy: postedBy,
        date: date
    };

    // Convert object to JSON string
    const jsonData = JSON.stringify(noticeData);

    // Fetch API to send data to the backend
    fetch('http://localhost:8080/api/noticeboard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Example: Sending JSON data
            'Authorization': `Bearer ${getToken}`, // Example: Sending an authorization token
            // Add any other custom headers as needed
          },
        body: jsonData
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        console.log('Success:', data);
         // Reset form fields
         document.getElementById('title').value = '';
         document.getElementById('details').value = '';
         document.getElementById('postedBy').value = '';
         document.getElementById('date').value = '';

         // Remove the Reset button
         const resetButton = document.querySelector('.btn-fill-lg.bg-blue-dark.btn-hover-yellow');
         resetButton.parentNode.removeChild(resetButton);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}