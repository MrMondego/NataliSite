const burger = document.querySelector(".menu-burger"),
        menu = document.querySelector(".nav"),
        overlay = document.querySelector(".overlay");

const toggleLockScroll = () => {
    document.body.classList.toggle("lock");
}
const unlockScroll = () => {
    document.body.classList.remove("lock");
}

burger.addEventListener("click", () => {
    menu.classList.toggle("open");
    overlay.classList.toggle("open");
    burger.classList.toggle("is-active");
    toggleLockScroll();
})
overlay.addEventListener("click", () => {
    menu.classList.remove("open");
    overlay.classList.remove("open");
    burger.classList.remove("is-active");
    unlockScroll();
})