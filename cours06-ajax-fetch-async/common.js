window.addEventListener('DOMContentLoaded', () => {
    // MaterializeCSS a besoin d'ínitialiser certains eléments tels que les select
    let elems = document.querySelectorAll('select');
    let instances = M.FormSelect.init(elems);
});