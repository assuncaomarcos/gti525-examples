console.log("-------------- objects --------------");

let empty = {};
let point = { x: 3, y: 4};
let newPoint = { x: point.x, y: point.y * 2};

let vehicle = {
    brand: "Toyota",
    model: "Corolla",
    year: 2010
};

console.log(point.x, point.y);    // 3 4
console.log(vehicle.brand);       // Toyota
console.log("Sold:" + vehicle.sold);   // undefined

vehicle.sold = false;
console.log(vehicle.sold);        // false

// --------

console.log(Object.keys(vehicle));  // ["brand","model","year"]

console.log("Propriétés de l'objet et leurs valeurs:")
for (let key in vehicle) {
    console.log("vehicle[" + key + "] = " + vehicle[key]);
}


let book = {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    genre: "Novel",
    pages: 180,
    isAvailable: true,
    summary: "A story of decadence, idealism, social upheaval, and excess in the Jazz Age.",

    getInfo: function() {
        return `${this.title} by ${this.author}, ${this.year}`;
    }
};

console.log(book.title);     // The Great Gatsby
console.log(book.author);    // F. Scott Fitzgerald
console.log(book["pages"]);  // 180

let genre = "genre";
console.log(book[genre]);    // "Novel"

console.log(book.getInfo());  // The Great Gatsby by F. Scott Fitzgerald, 1925
console.log("Subtitle:" + book.subtitle);   // undefined


// Accès conditionnel à partir d'ES2020:

// Le problème:
console.log(book.subtitle.length);   //  TypeError: book.subtitle is undefined

// Une possible solution
let familyName = undefined;
if (book) {
    if (book.author) {
        surname = book.author.familyName;
    }
}

// autre solution
familyName = book && book.author && book.author.familyName;

// accès conditionnel à partir de ES2020
familyName = book?.author?.familyName;