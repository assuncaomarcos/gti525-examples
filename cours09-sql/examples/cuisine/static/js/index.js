const initMenu = () => {
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
}

document.addEventListener('DOMContentLoaded', () => {
    initMenu();
});
