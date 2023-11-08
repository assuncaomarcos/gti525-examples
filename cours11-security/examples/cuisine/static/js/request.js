export async function fetchData(endpoint, options = {}) {
    // 'Authorization' : 'Bearer ' + sessionStorage.getItem("apiKey")
    const apiKey = sessionStorage.getItem('apiKey');
    if (apiKey) {
        options.headers = {...options?.headers, 'Authorization' : 'Bearer ' + apiKey};
    }
    const response = await fetch(endpoint, options);
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response.json();
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

export async function sendForm(form, action, endpoint) {
    const formAsObj = Object.fromEntries(new FormData(form));
    return sendJSON(action, endpoint, formAsObj);
}