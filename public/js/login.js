const loginFormHandler = async (event) => {
  event.preventDefault();

  const body = {
    email: document.querySelector("[name=email]").value.trim(),
    password: document.querySelector("[name=password]").value.trim(),
  };

  if (!body.email || !body.password) {
    alert("Failed to log in. Try again.");
    document.querySelector('[name=email]').value = '';
    document.querySelector('[name=password]').value = '';

    console.log('cheese');
    return;
  }

  const response = await fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

 
  if (!response.ok) {
    alert("You are NOT logged in");
    document.querySelector('[name=email]').value = '';
    document.querySelector('[name=password]').value = '';
    
    return;

  } else {
    alert('You have successfully logged in!');
   
  }

  document.location.replace("/");


};

document.querySelector(".login-form").addEventListener("submit", loginFormHandler);
