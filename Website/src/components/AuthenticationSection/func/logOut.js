const logOut = async () => {
    const serverAddress = localStorage.getItem('serverAddress');
    await fetch(serverAddress + "/logout", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials in the request
    });
};

export default logOut;