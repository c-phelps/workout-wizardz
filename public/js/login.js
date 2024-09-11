const login = async () => {
  const username = document.getElementById("usernameInput").value; 
  const password = document.getElementById("passwordInput").value; 

  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    // Redirect to the workout page on successful login
    document.location.replace("/workout");
  } else {
    const errorData = await response.json();
    alert(errorData.message); // Show error message from the server
  }
};

const signup = () => {
  // Redirect to the sign-up page
  document.location.replace("/signup");
};

document.querySelector("#login").addEventListener("click", login);
document.querySelector("#signup").addEventListener("click", signup);
