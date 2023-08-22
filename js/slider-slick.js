const appearsOnWidth = 768;
$(document).ready(function() {
   if(!$(".slider").attr("mobileOnly") && screen.width >= appearsOnWidth) {
      const slider = document.querySelector(".slider")
      const innerContainer = slider.parentNode;
      innerContainer.innerHTML = slider.innerHTML;
      return
   }

   $(".gallery-category").addClass('gallery-category_with-slider')

   $(".slider").slick({
      dots: true,
      arrows: true,
      infinite: true,
      // slidesToShow: 3,
      slidesToScroll: 1,
      // autoplay: true,
      autoplaySpeed: 5000,
      centerMode: true,
      centerPadding: '10px',
   })
})