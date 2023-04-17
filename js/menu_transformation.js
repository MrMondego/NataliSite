const burger = document.querySelector(".menu-burger"),
        menu = document.querySelector(".nav"),
        overlay = document.querySelector(".overlay");

const lockScroll = () => {
    document.body.classList.add("lock");
}
const unlockScroll = () => {
    document.body.classList.remove("lock");
}

burger.addEventListener("click", () => {
    menu.classList.add("open");
    overlay.classList.add("open");
    lockScroll();
})
overlay.addEventListener("click", () => {
    menu.classList.remove("open");
    overlay.classList.remove("open");
    unlockScroll();
})