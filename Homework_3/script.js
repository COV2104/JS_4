const accessKey = "Fq0qczZ_PRNGOl-AUxr9Jurl7hMo3oqLmFb7bjExOh0";
const endpoint =
  "https://api.unsplash.com/photos/random?client_id=" + accessKey;

const randomImage = document.getElementById("randomImage");
const photographer = document.getElementById("photographer");
const likeButton = document.getElementById("likeButton");
const likeCount = document.getElementById("likeCount");
const previousButton = document.getElementById("previousButton");

const photoHistory = JSON.parse(localStorage.getItem("photoHistory")) || [];

let likes = localStorage.getItem("likes")
  ? parseInt(localStorage.getItem("likes"))
  : 0;

likeCount.textContent = likes;

async function getRandomImage() {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    randomImage.src = data.urls.regular;
    photographer.textContent = `Фотограф: ${data.user.name}`;

    if (!photoHistory.includes(data.urls.regular)) {
      photoHistory.push(data.urls.regular);
      localStorage.setItem("photoHistory", JSON.stringify(photoHistory));
    }
  } catch (error) {
    console.error(error);
  }
}

likeButton.addEventListener("click", () => {
  if (!localStorage.getItem(randomImage.src)) {
    likes++;
    likeCount.textContent = likes;
    localStorage.setItem("likes", likes);
    localStorage.setItem(randomImage.src, "liked");
  } else {
    likes--;
    likeCount.textContent = likes;
    localStorage.removeItem(randomImage.src);
    localStorage.setItem("likes", likes);
  }
});

previousButton.addEventListener("click", () => {
  if (photoHistory.length > 0) {
    const previousPhotoUrl = photoHistory.pop();
    localStorage.setItem("photoHistory", JSON.stringify(photoHistory));
    randomImage.src = previousPhotoUrl; 
  } else {
    alert("Предыдущей фотографии в истории нет.");
  }
});



getRandomImage();