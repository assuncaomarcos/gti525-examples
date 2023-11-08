import { fetchData, sendAsJSON } from "./request.js";

const BUTTON_CLASSES = ["waves-effect", "waves-light", "btn-small", "indigo", "darken-1"];
let itemFields = [];
let accessPoint = "/api";

function setItemFields(fields) {
    itemFields = fields;
}

function setAccessPoint(url) {
    accessPoint = url;
}

function init () {
    activateButtons(".edit_button", handleEditClick);
    activateButtons(".delete_button", handleDeleteClick);
    activateButtons(".add_button", () => {
        createInsertRow(handleSaveClick, handleDeleteClick, itemFields);
    });
}

function handleEditClick (event) {
    const row = event.target.closest("tr");
    itemFields.forEach(field => {
        const cell = row.querySelector(`[data-field=${field}]`);
        const input = document.createElement('input');
        input.value = cell.textContent;
        input.classList.add("validate");
        input.name = field;
        cell.textContent = '';
        cell.appendChild(input);
    });

    const editButton = row.querySelector(".edit_button");
    changeIcon(editButton, "done");
    editButton.removeEventListener('click', handleEditClick);
    editButton.addEventListener('click', handleSaveClick);
}

function handleSaveClick (event) {
    const row = event.target.closest('tr');
    const toUpdate = {};

    itemFields.forEach(field => {
        const cell = row.querySelector(`[data-field=${field}]`);
        const input = cell.querySelector('input');
        toUpdate[field] = input.value;
        cell.textContent = input.value;
    });

    const itemId = row.querySelector("[name='itemId']")?.value;
    let method = "POST";
    let endpoint = accessPoint;
    if (itemId) {
        method = "PUT";
        endpoint += itemId;
        toUpdate._id = itemId
    }

    sendAsJSON(method, endpoint, toUpdate)
        .then(response => {
            if (response.code !== 200) {
                throw new Error(response.message);
            }
            M.toast({html: `Item sauvegardé avec id: ${response?.data?._id}`});
        })
        .catch(error =>
            M.toast({html: `Erreur pour sauvegarder l'item: ${error.message}`})
        );

    const doneButton = row.querySelector(".edit_button");
    changeIcon(doneButton, "edit");

    doneButton.removeEventListener('click', handleSaveClick);
    doneButton.addEventListener('click', handleEditClick);
}

function handleDeleteClick(event) {
    const row = event.target.closest("tr");
    const itemId = row.querySelector("[name='itemId']")?.value;
    if (itemId) {
        fetchData(`${accessPoint}${itemId}`, {method: 'DELETE'})
            .then(response => {
                if (response.code === 200) {
                    row.remove();
                    M.toast({html: `Item ${itemId} supprimé.`});
                } else {
                    throw new Error(response.message);
                }
            })
            .catch(error => M.toast({html: `Erreur pour supprimer un item: ${error.message}`}));
    } else {
        row.remove();
    }
}

function activateButtons(selector, action) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(button => button.addEventListener('click', action));
}

function createButton(classType, icon, action) {
    const a = document.createElement("a");
    a.classList.add(...BUTTON_CLASSES, classType);
    const i = document.createElement("i");
    i.classList.add("material-icons");
    i.textContent = icon;
    a.appendChild(i);
    a.addEventListener('click', action);
    return a;
}

function changeIcon(button, icon) {
    const i = button.querySelector("i");
    i.textContent = icon;
}

function createInsertRow(actionSave, actionDelete, fields) {
    const tableBody = document.getElementById("table_content");
    const row = tableBody.insertRow(0);

    for (const field of fields) {
        const cell = row.insertCell();
        cell.setAttribute("data-field", field);
        const input = document.createElement('input');
        input.classList.add("validate");
        input.name = field;
        cell.appendChild(input);
    }

    const cell = row.insertCell();
    const input = document.createElement('input');
    input.type = "hidden";
    input.className = "itemId";
    cell.classList.add("center-align", "narrow");
    cell.appendChild(input);
    cell.appendChild(createButton("edit_button", "done", actionSave));
    cell.appendChild(createButton("delete_button", "delete_forever", actionDelete));
}

export default {
    init,
    setAccessPoint,
    setItemFields
}