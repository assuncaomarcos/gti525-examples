import {sendForm} from "./request.js";

async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    try {
        const response = await sendForm(form, form.method, form.action);
        if (!response.error && response?.data?.id) {
            window.location.href = "/login";
        } else {
            M.toast({html: response.message});
        }
    } catch (error) {
        M.toast({html: error.message});
    }
}

const signupForm = document.querySelector(".signup_form");
signupForm.addEventListener('submit', handleSubmit);
