function submitForm() {
    const form = document.getElementById('signupForm');
    const formData = new FormData(form);
    const formObject = {};
    
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    const jsonBody = JSON.stringify(formObject);

    // Replace the URL with the actual endpoint where you want to send the data
    const apiUrl = 'http://localhost:8080/api/user';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonBody,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Handle success, e.g., redirect to a thank-you page
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error, e.g., display an error message to the user
    });
}
