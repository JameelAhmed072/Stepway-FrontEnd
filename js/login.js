

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
        var token = data.accessToken;
        localStorage.setItem("token",token)

        if(token){
            var userId = token.id;
            var a = parseJwt(token);
            debugger
            const roles = a.ROLES;

            if (roles[0] === "ADMIN") {
                // Render AdminDashboard.html
                window.location.href = 'AdminDashboard.html';
              } else if (roles.includes("STUDENT")) {
                window.location.href = 'StudentDashboard.html';
              }else if(roles.includes("TEACHER")){
                window.location.href = 'TeacherDashboard.html';
            }else{
                console.log('User Not Found');
            }
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