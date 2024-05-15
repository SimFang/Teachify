async function login(identifier, password){
    const serverAddress = localStorage.getItem('serverAddress');
        try {
            const response = await fetch(serverAddress + "/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include credentials in the request
                body: JSON.stringify({
                    email: identifier,
                    password: password
                })
            });
            if(response.status === 401) return (false)
            return true
        } catch (error) {
            return (false)
        }
}

export default login;