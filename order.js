
  const movieSelect = document.getElementById('movie-select');
  const moviePoster = document.getElementById('movie-poster');
  const movieTitleElem = document.getElementById('movie-title');
  const movieTypeElem = document.getElementById('movie-type');
  const movieReleaseDateElem = document.getElementById('movie-release-date');
  const locationSelect = document.getElementById('location-select');
  const dateOptions = document.getElementById('date-options');
  const showtimeOptions = document.getElementById('showtime-options');
  const numTicketsInput = document.getElementById('num-tickets');
  const bookTicketBtn = document.getElementById('book-ticket-btn');
  const ticketPreview = document.getElementById('ticket-preview');
  const summaryMovie = document.getElementById('summary-movie');
  const summaryLocation = document.getElementById('summary-location');
  const summaryDate = document.getElementById('summary-date');
  const summaryTime = document.getElementById('summary-time');
  const totalPrice = document.getElementById('total-price');
  const bookedMovie = document.getElementById('booked-movie');
  const bookedLocation = document.getElementById('booked-location');
  const bookedDate = document.getElementById('booked-date');
  const bookedTime = document.getElementById('booked-time');
  const bookedNumTickets = document.getElementById('booked-num-tickets');
  const bookedTotalPrice = document.getElementById('booked-total-price');

  // --- Global vars ---
  let films = [];
  let selectedDate = '24 Aug';
  let selectedTime = null;
  let currentMovie = null;
  const ticketPricePerPerson = 10.00;

  // --- Load movie from localStorage ---
  const savedMovie = JSON.parse(localStorage.getItem("selectedMovie"));

  async function loadFilms() {
    try {
      const response = await fetch('Film.json');
      films = await response.json();

      populateMovieSelect();

      if (savedMovie) {
        currentMovie = films.find(f => f.id === savedMovie.id) || films[0];
      } else {
        currentMovie = films[0];
      }

      movieSelect.value = currentMovie.id;
      updateMovieDetails();
      updateSummary();
    } catch (error) {
      console.error('Error loading films:', error);
    }
  }

  function populateMovieSelect() {
    movieSelect.innerHTML = films.map(film =>
      `<option value="${film.id}">${film.title}</option>`
    ).join('');
  }

  function updateMovieDetails() {
    moviePoster.src = currentMovie.image;
    moviePoster.alt = `${currentMovie.title} Poster`;
    movieTitleElem.textContent = currentMovie.title;
    movieTypeElem.textContent = currentMovie.type;
    movieReleaseDateElem.textContent = currentMovie.release_date;
    summaryMovie.textContent = currentMovie.title;
  }

  function updateSummary() {
    summaryLocation.textContent = locationSelect.options[locationSelect.selectedIndex].textContent;
    summaryDate.textContent = selectedDate;
    summaryTime.textContent = selectedTime || 'Select a time';
    const numTickets = parseInt(numTicketsInput.value);
    const price = (numTickets * ticketPricePerPerson).toFixed(2);
    totalPrice.textContent = `$${price}`;
  }

  // --- Event Listeners ---
  movieSelect.addEventListener('change', (e) => {
    const selectedFilmId = parseInt(e.target.value);
    currentMovie = films.find(f => f.id === selectedFilmId);
    updateMovieDetails();
    updateSummary();
    ticketPreview.classList.add('hidden');
  });

  dateOptions.addEventListener('click', (e) => {
    if (e.target.classList.contains('date-option')) {
      document.querySelectorAll('.date-option').forEach(opt => opt.classList.remove('selected'));
      e.target.classList.add('selected');
      selectedDate = e.target.dataset.date;
      updateSummary();
      ticketPreview.classList.add('hidden');
    }
  });

  showtimeOptions.addEventListener('click', (e) => {
    if (e.target.classList.contains('showtime-option')) {
      document.querySelectorAll('.showtime-option').forEach(opt => opt.classList.remove('selected'));
      e.target.classList.add('selected');
      selectedTime = e.target.dataset.time;
      updateSummary();
      ticketPreview.classList.add('hidden');
    }
  });

  locationSelect.addEventListener('change', () => {
    updateSummary();
    ticketPreview.classList.add('hidden');
  });

  numTicketsInput.addEventListener('input', () => {
    updateSummary();
    ticketPreview.classList.add('hidden');
  });

  bookTicketBtn.addEventListener('click', () => {
    if (!selectedTime) {
      alert('Please select a showtime before booking!');
      return;
    }

    const numTickets = parseInt(numTicketsInput.value);
    const price = (numTickets * ticketPricePerPerson).toFixed(2);

    // --- Fill ticket preview ---
    bookedMovie.textContent = currentMovie.title;
    bookedLocation.textContent = summaryLocation.textContent;
    bookedDate.textContent = selectedDate;
    bookedTime.textContent = selectedTime;
    bookedNumTickets.textContent = numTickets;
    bookedTotalPrice.textContent = `$${price}`;
    ticketPreview.classList.remove('hidden');

    // --- Save booking to history ---
    const booking = {
      movie: currentMovie.title,
      location: summaryLocation.textContent,
      date: selectedDate,
      time: selectedTime,
      tickets: numTickets,
      total: price
    };

    let history = JSON.parse(localStorage.getItem("orderHistory")) || [];
    history.push(booking);
    localStorage.setItem("orderHistory", JSON.stringify(history));

    // Redirect after a short delay
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  });

  loadFilms();
