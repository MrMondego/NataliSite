// var images= [ '../image/top_background-1.jpg',
//             '../image/top_background-2.jpg',
//             '../image/top_background-3.jpg' ];
const backgrounds = ["bg-1", "bg-2", "bg-3"];
let currentBg = 0;

function setBackground() {
   $(".bgWrapper__bg").removeClass(backgrounds[currentBg]);
   currentBg = (currentBg + 1) % backgrounds.length;
   $(".bgWrapper__bg").addClass(backgrounds[currentBg]);
}

setInterval(setBackground, 5000);