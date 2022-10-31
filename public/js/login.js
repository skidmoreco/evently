const loginFormHandler = async (event) => {
  event.preventDefault();

  const body = {
    email: document.querySelector("[name=email]").value.trim(),
    password: document.querySelector("[name=password]").value.trim(),
  };

  if (!body.email || !body.password) {
    alert("The information provided is incomplete. Please try again.");
    return;
  }

  const response = await fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  console.log(response);

  if (!response.ok) {
    alert("Failed to log in");
    return;
  }

  document.location.replace("/");
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
