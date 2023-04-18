addEventListener("load", () => {
  
  const galleryElements = document.getElementsByClassName("gallery-category");
  for(let i = 0; i < galleryElements.length; i++) {
    let imageName = getImageDirectoryByFullURL(galleryElements[i].children[1].attributes.getNamedItem("src").value)
    // console.log(imageName.indexOf(" ") != -1 ? imageName.replace(" ", "\ ") : imageName)
    galleryElements[i].style.backgroundImage = `url('image/previews/${imageName}')`;
  }
})
function getImageDirectoryByFullURL(url){
    return url.split('/').pop()
}