const images = ["https://cdn.pixabay.com/photo/2023/11/07/15/31/red-panda-8372704_1280.jpg", 
"https://cdn.pixabay.com/photo/2023/12/04/15/30/monkey-8429737_960_720.jpg", 
"https://cdn.pixabay.com/photo/2020/03/10/04/48/animal-4917802_1280.jpg",
"https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636_1280.jpg",
"https://cdn.pixabay.com/photo/2018/08/12/16/59/parrot-3601194_1280.jpg"];

let currentImageIndex = 0;

const sliderImage = document.querySelector(".slider-image img");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const dots = document.querySelectorAll(".dot");

function showImage(index) {
  sliderImage.src = images[index];
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

prevBtn.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  showImage(currentImageIndex);
});

nextBtn.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  showImage(currentImageIndex);
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showImage(index);
    currentImageIndex = index;
  });
});

showImage(currentImageIndex);
