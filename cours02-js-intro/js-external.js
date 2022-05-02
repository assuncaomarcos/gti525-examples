const myFunction = function () {
    let a = 3;
    let b = 2;
    const div = document.getElementById("content");
    div.innerHTML = `<p> ${a} + ${b} = ${a + b} </p>`;
    let c = '2 + 3';
    div.innerHTML += ("<p>" + c + " = " + eval(c) + "</p>");
}

window.onload = function() {
    let btn = document.getElementById("btn");
    btn.addEventListener("click", myFunction);
}