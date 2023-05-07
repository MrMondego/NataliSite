$(".modal__close-button").on("click", function() {
   $(".modal").css("display", "none");
   $(".gallery__overlay").css("display", "none");
   modal.classList.toggle("opaque");
   unlockScroll();
})