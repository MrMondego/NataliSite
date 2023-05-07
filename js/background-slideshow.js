let currentBg = 0;
const backgrounds = $(".bgWrapper").children()

function setBackground() {
   backgrounds.eq(currentBg).toggleClass("active");
   currentBg = (currentBg + 1) % backgrounds.length;
   backgrounds.eq(currentBg).toggleClass("active");
}

setInterval(setBackground, 7000);