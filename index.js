const dateComponent = document.querySelector(".pagination");
const today = new Date();
let i = 0;
while (i <= 5) {
  let future = new Date(today);
  future.setDate(today.getDate() + i);

  const span = document.createElement("span");
  span.innerText = future.toLocaleDateString("en-US", { weekday: "short" });

  const h1 = document.createElement("h1");
  h1.innerText = future.getDate();

  const newDiv = document.createElement("div");
  newDiv.className = "box";

  dateComponent.appendChild(newDiv);
  newDiv.appendChild(span);
  newDiv.appendChild(h1);
  i++;
}

const cinemaLocation = document.querySelector(".cinema-location");
const locationEl = document.querySelector(".location"); // no space before .location

cinemaLocation.addEventListener("click", function () {
  if (locationEl.style.display === "block") {
    locationEl.style.display = "none";
  } else {
    locationEl.style.display = "block";
  }
});

// coming soon
const monthPag = document.querySelector(".coming-soon-component .pagination");
for (let i = 1; i <= 6; i++) {
  let futureMonth = new Date(today);
  futureMonth.setMonth(today.getMonth() + i);
  const monthList = document.createElement("span");
  monthList.innerText = futureMonth.toLocaleDateString("en-US", {
    month: "long",
  });
  monthPag.appendChild(monthList);
  monthList.className = "month-list";
}

const nowShowTitle = document.querySelector(".now-show-component h1");
const comingsoonTitle = document.querySelector(".coming-soon-component h1");
const nowShowComponent = document.querySelector(".nsc");
const comingsoonComponent = document.querySelector(".csc");



nowShowTitle.addEventListener("click", function() {
  nowShowComponent.style.display = "block";
  comingsoonComponent.style.display = "none";
  nowShowTitle.style.color = "#fff";
  comingsoonTitle.style.color = "grey"
  });

  comingsoonTitle.addEventListener("click", function() {
      nowShowComponent.style.display = "none";
      comingsoonComponent.style.display = "block";
      nowShowTitle.style.color = "grey";
  comingsoonTitle.style.color = "#fff"
  });


  //movie component
// Your OMDb API key
const apiKey = "3904f905";

// Search term
const searchQuery = "guardians"; 

// OMDb search URL
const searchUrl = `http://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}`;

// Fetch search results from OMDb API
fetch(searchUrl)
  .then(response => response.json())
  .then(data => {
    if (data.Search) {
      // Limit results to first 5 movies
      const limitedMovies = data.Search.slice(0, 5);

      // Log movie info in console
      limitedMovies.forEach(movie => {
        console.log(movie.Title, movie.Year, movie.imdbID);
      });

      // Display movies in HTML
      displayMovies(limitedMovies);
    } else {
      console.log("No movies found");
    }
  })
  .catch(error => console.error('Error:', error));

// Function to display movies in HTML
function displayMovies(movies) {
  const container = document.querySelector(".movies-container");
  container.innerHTML = ""; // Clear previous content
  
  movies.forEach(movie => {
    const movieElement = document.createElement("div");
    movieElement.className = "movie";

    // Create movie card HTML
    movieElement.innerHTML = `
      <h3>${movie.Title} (${movie.Year})</h3>
      <img src="${movie.Poster}" alt="${movie.Title} poster">
    `;
    container.appendChild(movieElement);
  });
}

// Function to fetch and log full movie details by IMDb ID
function fetchMovieDetails(imdbID) {
  const detailsUrl = `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;
  
  fetch(detailsUrl)
    .then(response => response.json())
    .then(data => {
      console.log("Full details:", data); // Show detailed data in console
    });
}


//coming-soon component movie
// Your OMDb API key


// Search term for "Coming Soon" movies (example: guardians)
const comingSoonQuery = "avengers"; 

// OMDb search URL
const comingSoonUrl = `http://www.omdbapi.com/?s=${comingSoonQuery}&apikey=${apiKey}`;

// Fetch "Coming Soon" results from OMDb API
fetch(comingSoonUrl)
  .then(response => response.json())
  .then(data => {
    if (data.Search) {
      // Limit to first 5 movies
      const limitedMovies = data.Search.slice(0, 5);

      // Log in console
      limitedMovies.forEach(movie => {
        console.log("[Coming Soon]", movie.Title, movie.Year);
      });

      // Display in HTML
      displayComingSoon(limitedMovies);
    } else {
      console.log("No 'Coming Soon' movies found");
    }
  })
  .catch(error => console.error('Error:', error));

// Function to display Coming Soon movies in .pagination container
function displayComingSoon(movies) {
  const container = document.querySelector(".coming-soon-component .pagination");
  container.innerHTML = ""; // Clear old content
  
  movies.forEach(movie => {
    const movieElement = document.createElement("div");
    movieElement.className = "movie";

    // Create movie card HTML
    movieElement.innerHTML = `
      <h2>${movie.Title} (${movie.Year})</h2>
      <img src="${movie.Poster}" alt="${movie.Title} poster">

    `;
    container.appendChild(movieElement);
  });
}

// Fetch full details for a single movie
function fetchMovieDetails(imdbID) {
  const detailsUrl = `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;
  
  fetch(detailsUrl)
    .then(response => response.json())
    .then(data => {
      console.log("Full details:", data);
    });
}
