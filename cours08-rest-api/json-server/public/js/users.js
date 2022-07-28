async function fetchAndCheck(url, requestInfo={}) {
    const response = await fetch(url, requestInfo);
    if (!response.ok) {
        const errorMessage = await response.text();
        showMessage(errorMessage);
        throw new Error(errorMessage);
    }
    return response.json();
}

/**
 * Pour construire la liste d'utilisateurs
 */
async function refreshUserList() {
    const userList = document.querySelector("tbody");
    userList.innerText = "";
    const users = await fetchAndCheck("/users");

    for (const user of users) {
        updateUserDetails(userList, user);
    }
}

function createTableCell(text){
    let td = document.createElement("td");
    td.innerText = text;
    return td;
}

function createButton(iconType) {
    const i = document.createElement("i");
    i.classList.add("material-icons");
    i.innerText = iconType;
    const a = document.createElement("a");
    a.classList.add("btn-floating", "btn-small");
    a.appendChild(i);
    return a;
}

function updateUserDetails(table, user, update) {
    const tr = update ?
        document.getElementById("user_row_" + user.id) :
        document.createElement("tr");

    // On va créer un ID pour la ligne pour la mettre à jour au cas d'un update
    tr.id = "user_row_" + user.id;
    tr.innerText = "";

    tr.appendChild(createTableCell(`${user.lastname}, ${user.firstname}`));
    tr.appendChild(createTableCell(`${user.address}, ${user.city}, ${user.province}`));
    tr.appendChild(createTableCell(user.phone));

    const td = document.createElement("td");
    const editBtn = createButton('edit');
    const deleteBtn = createButton('delete');

    // Enregistrer les gestionnaires pour modifier / supprimer un utilisateur
    editBtn.addEventListener("click", async () => {
        const userInfo = await fetchAndCheck(`/users/${user.id}`);
        showEditSection(userInfo);
    });

    deleteBtn.addEventListener("click", async() => {
        const fetchOptions = {
            method: "DELETE",
            mode: "cors"
        };
        await fetchAndCheck(`/users/${user.id}`, fetchOptions);
        tr.remove();
    });

    td.append(editBtn, document.createTextNode(" "), deleteBtn);
    tr.append(td);

    if (!update) {
        table.appendChild(tr);
    }
}

/**
 * Afficher le formulaire pour ajouter/enlever un utilisateur
 * @param userInfo objet utilisateur ou null s'il s'agit d'un ajout
 */
function showEditSection(userInfo) {
    document.getElementById("edit_section").classList.remove("hide");

    if (userInfo) {
        for (const key of Object.keys(userInfo)) {
            const field = document.getElementById(key);
            if (field) {
                field.value = userInfo[key];
            }
        }
        document.getElementById("province").dispatchEvent(new Event('change'));
    } else {
        resetUserForm();
    }
    M.updateTextFields(); // Mise à jour des champs par materialize
}

function resetUserForm() {
    document.getElementById("form-user").reset();
    document.getElementById("id").value = "-1";
}

/**
 * Méthode por afficher pour quelques seconds la section que contient le
 * message de réponse ou erreur
 */
function showMessage(message) {
    const msgSection = document.getElementById("message_section");
    const msgDiv = document.getElementById("api_message");
    msgSection.classList.remove("hide");
    msgDiv.innerText = "";
    msgDiv.appendChild(document.createTextNode(message));
    // Afficher le message pour 5 seconds
    setTimeout(() => {
        msgSection.classList.add("hide");
    }, 5000);
}

/**
 * Gestionnaire d'événements pour un événement de soumission de formulaire.
 * Le code JavaScript pour soumettre un JSON est adapté de l'exemple disponible sur:
 * https://simonplend.com/how-to-use-fetch-to-post-form-data-as-json-to-your-api/
 * Pour plus d'information sur FormData:
 * https://developer.mozilla.org/fr/docs/Web/API/FormData
 * @param {SubmitEvent} événement
 */
async function handleFormSubmit(event) {
    event.preventDefault();     // On va soumettre un JSON
    const form = event.currentTarget;

    try {
        const formData = new FormData(form);
        const formEntries = Object.fromEntries(formData.entries());

        // Vérifie s'il s'agit d'une mise à jour
        const update = formEntries.id && Number(formEntries.id) > 0;
        let httpMethod = "POST";
        let url = "/users/";

        if (update) {
            httpMethod = "PUT";
            url += formEntries.id;  // Le PUT est vers /users/:id
        } else {
            delete formEntries.id;  // On n'a pas besoin d'ID pour un ajout
        }

        // Convertir les champs de formulaire en JSON
        const jsonString = JSON.stringify(formEntries);

        const fetchOptions = {
            method: httpMethod,
            mode: "cors",
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json"
            },
            body: jsonString,
        };

        const user = await fetchAndCheck(url, fetchOptions);

        if (!update) {
            showMessage(`Utilisateur ajouté avec ID: ${user.id}`);
        } else {
            showMessage(`Utilisateur ${user.id} mis à jour`);
        }

        const userList = document.querySelector("tbody");
        updateUserDetails(userList, user, update);

        // Reset le formulaire et cache la section de mise à jour
        resetUserForm();
        document.getElementById("edit_section").classList.add("hide");
    } catch (error) {
        console.error(error);
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    // Initialiser les selects et modales (MaterializeCSS)
    M.FormSelect.init(document.querySelectorAll('select'));

    // Enregistrer le gestionnaire d'événement
    const formUser = document.getElementById("form-user");
    formUser.addEventListener("submit", handleFormSubmit);

    const refBtn = document.getElementById("refresh_btn");
    refBtn.addEventListener("click", refreshUserList);

    const addBtn = document.getElementById("add_btn");
    addBtn.addEventListener("click", () => {
        showEditSection(null)
    });

    await refreshUserList();
});