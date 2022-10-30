const signup = async () => {

  /**
   * query for inputs in the form and save them to a JSON payload
   */
    const body = {
        email: document.querySelector('[name=email]').value.trim(),
        username: document.querySelector('[name=username]').value.trim(),
        password: document.querySelector('[name=password]').value.trim(),
        confirm: document.querySelector('[name=confirm]').value.trim()
    }

    /**
     * check if the password matches the confirm password
     */
    if (body.password !== body.confirm) {
        alert('Passwords do not match! Please try again');
        return;
    }

    /**
     * send the payload to the server
     */
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    /**
     * check for a message in the response
     */
    const message = await response.json().then((data) => data.message);
    if (message) alert(message);
  
    /**
     * if the request failes, clear inputs
     */
    if (!response.ok) {
      document.querySelector('[name=email]').value = '';
      document.querySelector('[name=username]').value = '';
      return;
    }

    /**
     * if the request is successful, redirect to the login page for first time login
    */
    document.location.replace('/login');
  };
  
  document.querySelector("#signUp").addEventListener("click", signup);
  