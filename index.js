

// 🎬 Toggle cinema location dropdown
const cinemaLocationButton = document.querySelector(".cinema-location");
const locationList = document.querySelector(".location");

cinemaLocationButton.addEventListener("click", function () {
  locationList.style.display =
    locationList.style.display === "block" ? "none" : "block";
});

// 🎞️ Slider functionality
const slider = document.getElementById("slider");
const slides = slider.querySelectorAll("img");
const navDots = document.querySelectorAll("#sliderNav a");

let currentSlideIndex = 0;
let autoPlay = setInterval(showNextSlide, 3000);

function goToSlide(slideIndex) {
  currentSlideIndex = slideIndex;
  slider.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
  updateNavigationDots();
}

function showNextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  goToSlide(currentSlideIndex);
}

function updateNavigationDots() {
  navDots.forEach((dot) => dot.classList.remove("active"));
  navDots[currentSlideIndex].classList.add("active");
}

navDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    clearInterval(autoPlay);
    goToSlide(Number(dot.dataset.index));
    autoPlay = setInterval(showNextSlide, 3000);
  });
});

goToSlide(0);

// 📅 Generate dates for "Now Showing"
const nowShowingDates = document.querySelector(
  ".now-show-component .pagination"
);
const today = new Date();

for (let i = 0; i <= 4; i++) {
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + i);

  const dateBox = document.createElement("div");
  dateBox.className = "box";
  if (i === 0) dateBox.classList.add("active");

  const dayName = document.createElement("span");
  dayName.className = "day";
  dayName.innerText = futureDate.toLocaleDateString("en-US", {
    weekday: "short",
  });

  const dayNumber = document.createElement("h3");
  dayNumber.className = "date";
  dayNumber.innerText = futureDate.getDate();

  dateBox.append(dayName, dayNumber);
  nowShowingDates.appendChild(dateBox);
}

// 📆 Generate months for "Coming Soon"
const comingSoonMonths = document.querySelector(
  ".coming-soon-component .pagination"
);
const currentMonth = new Date();

for (let i = 1; i <= 4; i++) {
  const futureMonth = new Date(currentMonth);
  futureMonth.setMonth(currentMonth.getMonth() + i);

  const monthButton = document.createElement("span");
  monthButton.innerText = futureMonth.toLocaleDateString("en-US", {
    month: "short",
  });

  comingSoonMonths.appendChild(monthButton);
}

// 🎥 Movie card rendering
const nowShowingContainer = document.getElementById("nowShowingContainer");
const comingSoonContainer = document.getElementById("comingSoonContainer");

fetch("Film.json")
  .then((response) => response.json())
  .then((films) => {
    function renderMovies(container, filmList) {
      container.innerHTML = "";
      filmList.forEach((film) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-item");

        movieCard.innerHTML = `
          <img src="${film.image}" alt="${film.title}" width="200">
          <h3>${film.title}</h3>
          <p>Release Date: ${film.release_date}</p>
          <p>Type: ${film.type}</p>
        `;

        // 👉 When user clicks, save selected movie and redirect
        movieCard.addEventListener("click", () => {
          localStorage.setItem("selectedMovie", JSON.stringify(film));
          window.location.href = "order.html";
        });

        container.appendChild(movieCard);
      });
    }

    renderMovies(nowShowingContainer, films);
    renderMovies(comingSoonContainer, [...films].reverse());
  })
  .catch((error) => console.error("There was an error getting the films:", error));

// 🎭 Switch between Now Showing and Coming Soon
const nowShowHeading = document.querySelector(".now-show-component h1");
const comingSoonHeading = document.querySelector(".coming-soon-component h1");

const nowShowingPagination = document.querySelector(
  ".now-show-component .pagination"
);
const comingSoonPagination = document.querySelector(
  ".coming-soon-component .pagination"
);

nowShowingContainer.style.display = "grid";
nowShowingPagination.style.display = "flex";
comingSoonContainer.style.display = "none";
comingSoonPagination.style.display = "none";

nowShowHeading.addEventListener("click", () => {
  nowShowingContainer.style.display = "grid";
  nowShowingPagination.style.display = "flex";
  comingSoonContainer.style.display = "none";
  comingSoonPagination.style.display = "none";
});

comingSoonHeading.addEventListener("click", () => {
  comingSoonContainer.style.display = "grid";
  comingSoonPagination.style.display = "flex";
  nowShowingContainer.style.display = "none";
  nowShowingPagination.style.display = "none";
});
