const getUserExercise = async () => {
    const serverAddress = localStorage.getItem('serverAddress');
    try {
        const response = await fetch(serverAddress + "/getuserexercises", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include credentials in the request
        });
        if(response.status === 401) return (false)
        return response
    } catch (error) {
        return (false)
    }
};

export default getUserExercise;