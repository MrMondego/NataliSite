// var images= [ '../image/top_background-1.jpg',
//             '../image/top_background-2.jpg',
//             '../image/top_background-3.jpg' ];
// const backgrounds = ["bg-1", "bg-2", "bg-3"];
let currentBg = 0;
const backgrounds = $(".bgWrapper").children()
const backgroundsCount = backgrounds.length;
// function setBackground() {
//    $(".bgWrapper__bg").removeClass(backgrounds[currentBg]);
//    currentBg = (currentBg + 1) % backgrounds.length;
//    $(".bgWrapper__bg").addClass(backgrounds[currentBg]);
// }
function setBackground() {
   // backgrounds.eq(currentBg).css("display","block");
   let nextBg = (currentBg + 1) % backgrounds.length;
   // backgrounds.eq(nextBg).css("display","block");
   backgrounds.eq(currentBg).toggleClass("active");
   backgrounds.eq(nextBg).toggleClass("active");
   currentBg = nextBg;
   // backgrounds.eq(currentBg).on('transitionend webkitTransitionEnd oTransitionEnd', function() {
   //    backgrounds.eq(currentBg).css("display","none");
   //    currentBg = nextBg;
   // })
}


setInterval(setBackground, 7000);