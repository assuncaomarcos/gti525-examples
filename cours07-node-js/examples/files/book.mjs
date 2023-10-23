/**
 Code pour télécharger le livre "Alice in Wonderland"
 depuis le projet Gutenberg
 */
import https from "node:https";
import fs from "node:fs";
import { URL } from 'node:url';

const __dirname = new URL('.', import.meta.url).pathname;
const bookPath = `${__dirname}/alice_book.txt`;
const bookURL = "https://www.gutenberg.org/files/11/11-0.txt";

async function downloadBook(filePath = bookPath, url = bookURL) {
    try {
        if ( ! fs.existsSync(filePath) ) {
            const file = fs.createWriteStream(filePath);
            const request = https.get(url,
                (response) => {
                    response.pipe(file);
                });
        }
        return filePath;
    } catch(err) {
        console.error(err)
    }
};

await downloadBook();

