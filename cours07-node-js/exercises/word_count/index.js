const http = require('https');
const fs = require('fs');
const EventEmitter = require('events');

function registerEvents(emitter, keywords) {
    const counts = [];
    const increment = function(index) {
        return function() {
            counts[index]++;
        }
    }

    for (let i=0; i< keywords.length; i++) {
        counts[i] = 0;
        emitter.on(keywords[i], increment(i));
    }

    return function() {
        console.log("Compteurs: ");
        for (let i=0; i<counts.length; i++) {
            console.log(`Count[${keywords[i]}] = ${counts[i]}`);
        }
    }
};

const eventEmitter = new EventEmitter();

// Lit le contenu du fichier et définit les gestionnaires pour analyser les mots
const text = fs.readFileSync("alice_book.txt").toString();
console.log(text.length);
const keywords = ["Alice", "little", "Rabbit", "Turtle", "Lobster"];
const printCounts = registerEvents(eventEmitter, keywords);

const words = text.split(" ");
words.forEach( word => {
    eventEmitter.emit(word.trim());
});

printCounts();