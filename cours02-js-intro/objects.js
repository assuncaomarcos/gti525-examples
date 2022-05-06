console.log(":: objects ::");

let vehicle = {
    brand: "Toyota",
    model: "Corolla",
    year: 2010
};

console.log(vehicle.brand);       // Toyota
console.log("" + vehicle.sold);   // undefined

vehicle.sold = false;
console.log(vehicle.sold);        // false

// --------

console.log(Object.keys(vehicle));  // ["brand","model","year"]

console.log("Propriétés de l'objet et leurs valeurs:")
for (let key in vehicle) {
    console.log("vehicle[" + key + "] = " + vehicle[key]);
}
