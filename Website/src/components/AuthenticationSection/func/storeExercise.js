const storeExercise = async (theme, input_type, input, exercise_type, content, correction, result, language, level) => {
    const serverAddress = localStorage.getItem('serverAddress');
    await fetch(serverAddress + "/storeexercise", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials in the request
        body : JSON.stringify({
            theme: theme,
            input_type: input_type,
            input: input,
            exercise_type: exercise_type,
            content: content,
            correction: correction,
            result: result,
            language: language,
            level: level
        })
    });
};

export default storeExercise;
