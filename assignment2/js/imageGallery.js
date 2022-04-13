const featureImage = document.querySelector("figure img");
const title = document.querySelector("figcaption");
const thumbImgs = document.querySelectorAll("li img");
//add event listner to all thumbnails
thumbImgs.forEach((element) => {
    element.addEventListener("click", (e) => {
        featureImage.src = e.target.src.replace('small', 'large');
        title.textContent = e.target.alt;
        thumbImgs.forEach((element) => {
            element.classList.add("inactive");
        });
        e.target.classList.remove("inactive");
    });
});