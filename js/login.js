// document.getElementById('login-form').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent the default form submission

//     const email = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     console.log(email);
//     console.log(password);
//     // Create a JSON object to send to the server
//     const loginData = {
//         email: email,
//         password: password
//     };

//     console.log('Sending login request...');

//     fetch('http://localhost:8080/api/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(loginData)
//     })
//     .then(response => {
//         console.log('Received response:', response);

//         if (response.ok) {
//             return response.json();
//         } else {
//             console.error('Response not OK:', response);
//             throw new Error('Network response was not ok');
//         }
//     })
//     .then(data => {
//         console.log('Received data:', data);

//         if (data.accessToken) {
//             // Save the token in local storage
//             localStorage.setItem('token', data.accessToken);
            
//             // Redirect to the desired page (index1.html in this case)
//             window.location.href = 'index1.html';
//         } else {
//             // Handle login error (e.g., show an error message)
//             console.error('Login failed. Incorrect email or password.');
//         }
//     })
//     .catch(error => {
//         console.error('An error occurred:', error);
//     });
// });

function login() {
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
        debugger
        var token = data.accessToken;
        localStorage.setItem("token",token)
        if(token){
            window.location.href = 'index1.html';
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