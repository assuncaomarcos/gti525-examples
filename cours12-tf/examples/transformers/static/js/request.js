export async function fetchData(endpoint, options = {}) {
    try {
        const response = await fetch(endpoint, options);
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || `Error ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export async function sendJSON(action, endpoint, data) {
    const options = {
        method: action.toUpperCase(),
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            'Accept': "application/json"
        },
        body: JSON.stringify(data),
    }
    return fetchData(endpoint, options);
}

/**
 * Common helper to handle form submissions and API responses
 * @param {Event} event - The form submit event
 * @param {Object} requestData - Data to be sent
 * @param {Function} onSuccess - Callback for successful response
 */
export async function handleFormSubmit(event, requestData, onSuccess) {
    event.preventDefault();
    const form = event.currentTarget;
    try {
        const response = await sendJSON(form.method, form.action, requestData);
        if (!response.error && response.data) {
            onSuccess(response.data);
        } else {
            M.toast({ html: `Erreur: ${response.message || 'Unknown error'}` });
        }
    } catch (error) {
        M.toast({ html: `Erreur: ${error.message}` });
    }
}