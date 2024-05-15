const checkLog = async () => {
    try {
        const serverAddress = localStorage.getItem('serverAddress');
        const response = await fetch(serverAddress + "/@me", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include credentials in the request
        });
        const data = await response.json(); // Assuming the response contains JSON data
        if (response.status === 401) {
            return false
        } else {
            return data
        }
    } catch (error) {
        return false
    }
};

export default checkLog;