function submitForm(){
    var firstname = document.getElementById("firstName").value;
    var lastname = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var gender = document.getElementById("gender").value;
    var phonenumber = document.getElementById("phoneNumber").value;
    var role = document.getElementById("role").value;


    var data = {
        "firstName": firstname,
        "lastName": lastname,
        "email": email,
        "password": password,
        "gender": gender,
        "phoneNumber": phonenumber,
        "role": role
    };debugger
    fetch('http://localhost:8080/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('SignUp failed');
        }
    })
    
    .then(data => {
       // Display a message indicating successful account creation
        alert("Successfully created account!");
        // Redirect to index1.html
        window.location.href = 'index.html';
    })
    .catch(error => {
        alert("SignUp failed. Please check your credentials.");
    });

}