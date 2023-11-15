import { sendJSON } from "./request.js";
const divAnswer = document.querySelector(".answer");
const answerContainer = document.querySelector(".answer_container");

async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const request = {
        context: form.context.value,
        question: form.question.value
    };
    try {
        const response = await sendJSON(form.method, form.action, request);
        if (!response.error && response?.data?.answer) {
            const { answer, score } = response.data;
            answerContainer.classList.remove("hide");
            divAnswer.textContent = `${answer} avec une certitude de ${Math.round(score * 100)}%`;
        } else {
            M.toast({html: `Erreur: ${response.message}`});
        }
    } catch (error) {
        M.toast({html: `Erreur: ${error.message}`});
    }
}

const hideAnswer = () => {
    answerContainer.classList.add("hide");
}

const form = document.querySelector("form");
form.addEventListener('submit', handleSubmit);

const fields = document.querySelectorAll(".materialize-textarea");
fields.forEach(field => {
    field.addEventListener("input", hideAnswer);
})
