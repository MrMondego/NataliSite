const hostName = window.location.pathname.split("/")[1],
      pathToFile = (hostName !== 'html' ? "/" + hostName : '') + '/xml/';

const imgUrls = [];
const imgDescriptions = [];
const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.modal-image');
const modalText = document.querySelector('.modal-text');
let timeout = -1;

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
        const description = descriptionElement.innerHTML;
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
         modalText.innerHTML = imgDescriptions[i];

         if(modalText.textContent.trim() == "")
        {
          modalText.style.display = "none";
        }
        else {
          modalText.style.display = "block";
        }

         clearTimeout(timeout);
         modal.style.display = 'flex';
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
      modal.classList.toggle("opaque");
      unlockScroll();
      galleryOverlay.style.display = 'none';
      timeout = setTimeout(() => modal.style.display = 'none', 700);
    });
  })
  .catch(error => console.log(error));