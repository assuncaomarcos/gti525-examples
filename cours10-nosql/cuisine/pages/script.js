// Quelques variables globales
const apiUrl = "/v2";

function checkResponse(response) {
    if (!response.ok)
        throw Error(`${response.status} - ${response.statusText}`);
    return response;
}

async function fetchURL(url) {
    const response = await fetch(url).then(checkResponse);
    return await response.json();
}

function configSections(showRecipe) {
    const dishList = document.getElementById("dish_list");
    const recipe = document.getElementById("recipe");
    if (!showRecipe) {
        dishList.classList.remove("hide");
        recipe.classList.add("hide");
    } else {
        dishList.classList.add("hide");
        recipe.classList.remove("hide");
    }
}

/*
Cette fonction crée la liste des plats disponibles:
1. Elle envoie une requête à l’API REST pour récupérer la liste des plats.
2. Pour chaque plat dans le JSON retourné, la fonction créera une structure comme celle ci-dessous:
<div className="col s12 m4">
    <div className="card">
        <div className="card-image">
            <a href=""><img className="photo_list" src="image.jpeg"></a>
        </div>
        <div className="card-content">
            <span className="card-title black-text">Nom du plat</span>
        </div>
    </div>
</div>
3. Ensuite elle enregistre les gestionnaires d'événements pour traiter les clics sur les photos des plats.
 */
async function buildDishList() {
    // Afficher la liste et cacher le destails d'une recette
    const dishList = document.getElementById("dish_list");
    configSections(false);
    dishList.textContent = '';

    fetchURL(apiUrl + "/dishes")
        .then(json => {
            json.data.forEach(dish => {
                const divDish = document.createElement("div");
                const card = document.createElement("div");
                const cardImage = document.createElement("div");
                const cardContent = document.createElement("div");
                const link = document.createElement("a");
                const image = document.createElement("img");
                const title = document.createElement("span");

                divDish.classList.add("col", "s12", "m4");
                card.classList.add("card");
                cardImage.classList.add("card-image");
                cardContent.classList.add("card-content");
                image.classList.add("photo_list");
                title.classList.add("card-title", "black-text");

                image.src = dish.photo;
                title.innerText = dish.name;
                link.href = "";

                divDish.append(card);
                card.append(cardImage, cardContent);
                link.append(image);
                cardImage.append(link);
                cardContent.append(title);
                dishList.append(divDish);

                link.addEventListener('click', async (e) => {
                    e.preventDefault();
                    await showRecipe(Number(dish.dish_id));
                })
            });
        }
    )
}

async function showRecipe(dishId) {
    fetchURL(`${apiUrl}/dishes/${dishId}`)
        .then(json => {
            const dishName = document.getElementById("dish_name");
            const dishPhoto = document.getElementById("dish_photo");

            const dish = json.data.shift();
            dishName.innerText = dish.name;
            dishPhoto.src = dish.photo;
        });

    fetchURL(`${apiUrl}/dishes/${dishId}/ingredients`)
        .then(json => {
            const list = document.getElementById("ingredient_list");
            list.innerText = "";
            json.data.forEach(ingredient => {
                const li = document.createElement("li");
                li.innerText = `${ingredient.quantity} ${ingredient.unit} de ${ingredient.name}`;
                list.append(li);
            });
        });

    fetchURL(`${apiUrl}/dishes/${dishId}/directions`)
        .then(json => {
            const list = document.getElementById("directions");
            list.innerText = "";
            json.data.forEach(ingredient => {
                const li = document.createElement("li");
                li.innerText = ingredient.description;
                list.append(li);
            });
        });

    configSections(true);
}

window.addEventListener('DOMContentLoaded', () => {
    M.AutoInit();

    const menuDishes = document.getElementById("menu_dishes");
    menuDishes.addEventListener('click', async (e) => {
        e.preventDefault();
        await buildDishList();
    });
    menuDishes.dispatchEvent(new Event('click'));
});