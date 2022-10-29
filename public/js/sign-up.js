const signup = async () => {

    const body = {
        email: document.querySelector('[name=email]').value,
        username: document.querySelector('[name=username]').value,
        password: document.querySelector('[name=password]').value,
        confirm: document.querySelector('[name=confirm]').value,
    }

    if (body.password !== body.confirm) {
        alert('Passwords do not match! Please try again');
        return;
    }

    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
  
    if (response.ok) {
      document.location.replace("/login");
    } else {
      alert(response.statusText);
    }
  };
  
  document.querySelector("#signUp").addEventListener("click", signup);
  