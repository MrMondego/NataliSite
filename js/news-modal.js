const modal = document.querySelector('.modal-post');
const postContentTitle = document.querySelector(".post-content__title");
const postContentDate = document.querySelector(".post-content__date");
const postContentImage = document.querySelector(".post-content__img");
const postContentContent = document.querySelector(".post-content__text-wrapper");
const goBack = document.querySelector(".modal-post__go-back-button");
let scrollY = window.scrollY;
const postsFile = 'news.xml',
      hostName = window.location.pathname.split("/")[1],
      pathToFile = (hostName !== 'html' ? "/" + hostName : '') + '/xml/';
const postTitles = [],
      postDates = [],
      postsContent = [],
      postsShortDescription = [],
      postImages = [];
let newsTimeout = 0;

fetch(pathToFile + postsFile)
   .then(response => response.text())
   .then(xmlString => new DOMParser().parseFromString(xmlString, 'application/xml'))
   .then(xmlDoc => {
      const xmlposts = xmlDoc.querySelectorAll("post");
      xmlposts.forEach(el => {
         const postTitle = el.querySelector('title');
         const postShortDescription = el.querySelector("short");
         const postDate = el.querySelector('date');
         const postImage = el.querySelector('image');
         const postContent = el.querySelector('content');
         if(postTitle && postDate && postContent && postShortDescription && postImage) {
            postTitles.push(postTitle.textContent);
            postDates.push(postDate.textContent);
            postsContent.push(postContent.innerHTML);
            postsShortDescription.push(postShortDescription.textContent)
            
            postImages.push(postImage.textContent);
         }
         

         // const posts = document.querySelectorAll(".post");
         // posts.forEach(el => el.addEventListener("click", (e)=> {
         //    e.preventDefault();
         //    postContentTitle.textContent = postTitles[0];
         //    postContentDate.textContent = postDates[0];
         //    postContentContent.innerHTML = postsContent[0];
         //    modal.style.display = 'block';
         //    toggleLockScroll();
         //    setTimeout(()=> modal.classList.toggle("active"), 1);
         //    scrollY = window.scrollY;
         //    setTimeout(()=>{
         //       scrollTo(0, 0);
         //    }, 1000)
         // }))

      })
      const newsContainer = document.querySelector(".news-container");
      for(let i = 0; i < postTitles.length; i++) {
         const newPost = document.createElement("div");
         newPost.innerHTML = `
         <div class="post news-container__post">
            <a href="" class="post-link">
               <div class="post-row">
                  <img src="${postImages[i]}" alt="" srcset="" class="post-row__img">
                  <div class="post-row__text-wrapper">
                     <h3 class="padding-bottom">${postTitles[i]}</h3>
                     ${postsShortDescription[i]}
                     <p class="post-date">${postDates[i]}</p>
                  </div>
               </div>
            </a>
         </div>`
         newPost.addEventListener("click", (e)=>{
            e.preventDefault();
            postContentTitle.textContent = postTitles[i];
            postContentDate.textContent = postDates[i];
            postContentImage.src = postImages[i];
            postContentContent.innerHTML = postsContent[i];
            clearTimeout(newsTimeout);
            newsTimeout = 0;
            modal.style.display = 'block';
            toggleLockScroll();
            setTimeout(()=> modal.classList.toggle("active"), 1);
            scrollY = window.scrollY;
            setTimeout(()=>{
               scrollTo(0, 0);
            }, 1000)
         })
         newsContainer.appendChild(newPost);
      }
}).catch(error => console.log(error));


goBack.addEventListener("click", () => {
   if(newsTimeout != 0)
      return;
   modal.classList.toggle("active");
   toggleLockScroll();
   scrollTo(0, scrollY);
   newsTimeout = setTimeout(()=> {
      modal.style.display = 'none';
      newsTimeout = 0;
   }, 1000);
})