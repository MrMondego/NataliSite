const hostName = window.location.pathname.split("/")[1],
      pathToFile = (hostName !== 'html' ? "/" + hostName : '') + '/xml/';

const imagesData = []
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
      const videoElements = photoElement.querySelectorAll("video")
      if (urlElement && descriptionElement) {
        const url = urlElement.textContent.trim();
        const description = descriptionElement.innerHTML;
        imagesData.push({
          url: url,
          description: description,
          attachedVideos: videoElements
        })
      }
    });

   const galleryOverlay = document.createElement('div');
   galleryOverlay.classList.add('gallery__overlay');

    const container = document.getElementById('gallery-container');
    for (let i = 0; i < imagesData.length; i++) {
      const imgElement = document.createElement('img');
      imgElement.src = imagesData[i].url;
      imgElement.className = "gallery-container__element";
      imgElement.addEventListener('click', (evt) => {
         const src = evt.target.getAttribute('src');
         const alt = evt.target.getAttribute('alt');
         modalImage.setAttribute('src', src);
         modalImage.setAttribute('alt', alt);
         modalText.innerHTML = imagesData[i].description;

         if(imagesData[i].attachedVideos.length) {
          imagesData[i].attachedVideos.forEach(el => {
            const url = el.textContent
            const iframe = document.createElement("iframe")
            iframe.setAttribute("src", url)
            iframe.setAttribute("width", 853)
            iframe.setAttribute("height", 480)
            iframe.setAttribute("allow", "autoplay; encrypted-media; fullscreen; picture-in-picture;")
            iframe.setAttribute("frameborder", 0 )
            iframe.setAttribute("allowfullscreen", true)
            iframe.classList.add("modal-text__video-element")

            modalText.appendChild(iframe)
          })
         }

        if(!modalText.innerHTML.trim())
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
      container.appendChild(imgElement);
    }
    galleryOverlay.addEventListener('click', () => {
      modal.classList.toggle("opaque");
      unlockScroll();
      galleryOverlay.style.display = 'none';
      timeout = setTimeout(() => modal.style.display = 'none', 700);
    });
  })
  .catch(error => console.log(error));