const midWidth = 768;
const slideInterval = 4000;
const marginRight = 10;
addEventListener("DOMContentLoaded", () => {
   const slider = document.querySelector(".slider");
   const sliderLine = document.querySelector(".slider__line");
   if(slider.getAttribute("mobileOnly") !== null && screen.width >= midWidth) {
      const innerContainer = slider.parentNode;
      innerContainer.innerHTML = sliderLine.innerHTML;
   }
   
   const sliderLineElement = sliderLine.children[0];
   const maxOffset = sliderLine.offsetWidth -
      sliderLine.offsetWidth/sliderLineElement.offsetWidth -
      sliderLineElement.offsetWidth;
   let offset = 0;
   function slideToNext() {
      if(offset > maxOffset)
         offset = 0;
      offset += sliderLineElement.offsetWidth + marginRight;
      sliderLine.style.left = -offset + "px";
   }
   setInterval(slideToNext, slideInterval);
})