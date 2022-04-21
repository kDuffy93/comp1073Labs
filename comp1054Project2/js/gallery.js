const featureImage = document.querySelector("figure img");
const title = document.querySelector("#productImages p");
const thumbImgs = document.querySelectorAll("#productImages ul li img");
//add event listner to all thumbnails
thumbImgs.forEach((element) => {
    element.addEventListener("click", (e) => {
        featureImage.src = e.target.src.replace("thumbnail", "main");
        title.textContent = e.target.alt;
        thumbImgs.forEach((element) => {
            element.classList.add("inactive");
        });
        e.target.classList.remove("inactive");
    });
});