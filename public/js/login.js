const loginFormHandler = async (event) => {
  event.preventDefault();

  const body = {
    email: document.querySelector("[name=email]").value.trim(),
    password: document.querySelector("[name=password]").value.trim(),
  };

  if (!body.email || !body.password) {
    alert("Failed to log in. Try again.");
    return;
  }

  const response = await fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  console.log('response', response);

  if (!response.ok) {
    alert("Account not found. Please try again, or sign up for an account.");
    document.querySelector('[name=email]').value = '';
    document.querySelector('[name=password]').value = '';
    return;
  }

  document.location.replace("/");


};

document.querySelector(".login-form").addEventListener("submit", loginFormHandler);
