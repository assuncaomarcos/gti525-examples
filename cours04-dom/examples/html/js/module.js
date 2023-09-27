import { name as module_name, add, multiply } from './math.js';

function printResult(div, text) {
    const p = document.createElement("p");
    p.textContent = text;
    div.appendChild(p);
}

const div = document.getElementById("content");

printResult(div, module_name);
printResult(div, add(10, 5));
printResult(div, multiply(5, 5));