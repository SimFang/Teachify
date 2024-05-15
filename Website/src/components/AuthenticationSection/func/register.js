async function register(email, password, username){
    const serverAddress = localStorage.getItem('serverAddress');
    const response = await fetch(serverAddress + "/register", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        credentials : "include",
        body : JSON.stringify({
            email: email,
            password : password,
            username : username,
        })
    });
    const data = await response.json(); // Assuming the response contains JSON data
    console.log(data)
}

export default register;