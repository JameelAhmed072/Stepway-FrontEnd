// Define an interceptor function that adds the token to the request and handles redirection if necessary
function fetchWithToken(url, options) {
    var token = localStorage.getItem("token");
  
    if (!token) {
      // If the token is not available, redirect to 'index.html'
      window.location.href = 'index.html';
    } else {
      // If the token is available, add it to the request headers
      options = options || {};
      options.headers = options.headers || {};
      options.headers['Authorization'] = `Bearer ${token}`;
    }
  
    return fetch(url, options);
  }
  
  // Replace the global fetch function with your interceptor
  const originalFetch = window.fetch;
  window.fetch = function(url, options) {
    // Intercept and modify the request using your custom function
    return fetchWithToken(url, options);
  };
  