import {sendForm} from "./request.js";

async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    try {
        const response = await sendForm(form, form.method, form.action);
        if (!response.error && response?.data?.token) {
            sessionStorage.setItem("apiKey", response.data.token);
            window.location.href = "/";
        } else {
            M.toast({html: response.message});
        }
    } catch (error) {
        M.toast({html: error.message});
    }
}

const loginForm = document.querySelector(".login_form");
loginForm.addEventListener('submit', handleSubmit);
