console.log("-------------- callbacks --------------");

setTimeout(() => console.log("Trois secondes ecoulées..."), 3000);

// ------------

function callback() {
    console.log("Une fonction de rappel appelée");
}

setTimeout(callback, 3000);
setTimeout(() => {console.log("Une autre fonction de rappel appelée");}, 1000);
setTimeout(() => {console.log("Encore une autre fonction de rappel appelée");}, 1000);

// ------------

let x = 0;
console.log("Code est exécuté immédiatement | x=" + x);

// Sera exécuté plus tard, dans 1s
setTimeout(() => {
    x++;
    console.log("Code est exécuté après 1 s. | x=" + x);

    setTimeout(() => {
        x++;
        console.log("Code est exécuté après 1+1 s. x=" + x);
    }, 1000)
}, 1000);

console.log("x=" + x);