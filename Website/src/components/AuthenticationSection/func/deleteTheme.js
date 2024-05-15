const deleteTheme = async (theme) => {
    const serverAddress = localStorage.getItem('serverAddress');
    try {
        const response = await fetch(serverAddress + "/deletetheme", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include credentials in the request
            body: JSON.stringify({ "theme": theme }), // Fixed missing colon (:) after body
        });
        if (response.status === 401) return false; // Removed unnecessary parentheses
        return response;
    } catch (error) {
        return false; // Removed unnecessary parentheses
    }
};

export default deleteTheme;
