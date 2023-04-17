const classBackground = "header_flex_no-background",
      classNoBackground = "header_flex";
addEventListener("load", () => {
    addEventListener("scroll", (e) => {
        let header = document.getElementsByClassName("header")[0];
        if(scrollY > 0)
            header.classList.replace(classBackground, classNoBackground);
        else
            header.classList.replace(classNoBackground, classBackground);
    })
})