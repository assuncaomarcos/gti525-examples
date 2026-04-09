import { handleFormSubmit } from "./request.js";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const divAnswer = document.querySelector(".generated_text");
const answerContainer = document.querySelector(".answer_container");

async function handleSubmit(event) {
    const request = { text: event.currentTarget.text.value };
    await handleFormSubmit(event, request, (data) => {
        answerContainer.classList.remove("hide");
        divAnswer.innerHTML = marked.parse(data);
        hljs.highlightAll();
    });
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
