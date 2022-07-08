/*
 * Fonction pour publier des données au format JSON et récupérer la
 * réponse envoyée par le serveur.
 *
 * @param url - URL de la ressource
 * @param formData - instance de `FormData`
 * @return {Object} - Réponse envoyée par le serveur
 */
async function postAsJSON(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries());
    const jsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': "application/json",
            'Accept': "application/json"
        },
        body: jsonString,
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}

/* Gestionnaire d'événements pour un événement de soumission de formulaire. */
async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const url = form.getAttribute("action");

    try {
        const formData = new FormData(form);
        const response = await postAsJSON(url, formData);
        if (!response.error) {
            // Verifier s'il est une réponse de login
            if (response.data && response.data.token) {
                sessionStorage.setItem("apiKey", response.data.token);
            }
            window.location.href = "/";
        }
    } catch (error) {
        console.error(error);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById("user_form");
    userForm.addEventListener('submit', handleSubmit);
});