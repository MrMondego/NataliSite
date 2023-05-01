const photosFile = 'birds.xml',
      hostName = window.location.pathname.split("/")[1],
      pathToFile = (hostName !== 'html' ? "/" + hostName : '') + '/xml/';
console.log(window.location.pathname);

const imgUrls = [];
const imgDescriptions = [];
const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.modal-image');
const modalText = document.querySelector('.modal-text');

fetch(pathToFile + photosFile)
  .then(response => response.text())
  .then(xmlString => new DOMParser().parseFromString(xmlString, 'application/xml'))
  .then(xmlDoc => {
    const photoElements = xmlDoc.querySelectorAll('photo');
    photoElements.forEach(function(photoElement) {
      const urlElement = photoElement.querySelector('url');
      const descriptionElement = photoElement.querySelector('description');
      if (urlElement && descriptionElement) {
        const url = urlElement.textContent.trim();
        const description = descriptionElement.textContent.trim();
        imgUrls.push(url);
        imgDescriptions.push(description);
      }
    });
   //  console.log(imgUrls,imgDescriptions)

   const galleryOverlay = document.createElement('div');
   galleryOverlay.classList.add('gallery__overlay');

    const container = document.getElementById('gallery-container');
    for (let i = 0; i < imgUrls.length; i++) {
      const imgElement = document.createElement('img');
      imgElement.src = imgUrls[i];
      imgElement.className = "gallery-container__element";
      imgElement.addEventListener('click', (evt) => {
         const src = evt.target.getAttribute('src');
         const alt = evt.target.getAttribute('alt');
         modalImage.setAttribute('src', src);
         modalImage.setAttribute('alt', alt);
         modalText.textContent = imgDescriptions[i];
         modal.style.display = 'block';
         setTimeout(() => modal.classList.toggle("opaque"), 1);
         document.body.appendChild(galleryOverlay);
         galleryOverlay.style.display = 'block';
         toggleLockScroll();
      });
      // const pElement = document.createElement('p');
      // pElement.textContent = imgDescriptions[i];
      container.appendChild(imgElement);
      // container.appendChild(pElement);
    }
    galleryOverlay.addEventListener('click', () => {
      modal.style.display = 'none';
      galleryOverlay.style.display = 'none';
      modal.classList.toggle("opaque");
      unlockScroll();
    });
    modal.addEventListener("click", () => {
      modal.style.display = 'none';
      galleryOverlay.style.display = 'none';
      modal.classList.toggle("opaque");
      unlockScroll();
    })
  })
  .catch(error => console.log(error));