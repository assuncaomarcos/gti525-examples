console.log("-------------- boucles --------------");

for (let n = 0; n <= 5; n++) {
    console.log(n);
}

for (let n = 20; ; n++) {
    if (n % 7 == 0) {
        console.log(n);
        break;
    }
}

let compteur = 0;

while (compteur < 3) {
    console.log("Itération #" + compteur);
    compteur++;
}

let x = 0;

do {
    console.log("Valeur de x : " + x);
    x++;
} while (x < 3);