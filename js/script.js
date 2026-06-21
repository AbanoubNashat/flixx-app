const global = {
  currentPage: window.location.pathname
};

// highlights the current page in the nav bar
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}


// global function for fetching data
async function fetchData(endpoint) {
  // added .env and wanted to use vite but this project is simple for this use case
  const API_KEY = '31a6c3f2d1e8dc0ecddccd116b88dcc0';
  const API_URL = 'https://api.themoviedb.org/3/';
  showSpinner();
  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();
  hideSpinner();
  return data;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// fetching first 20 popular movies
async function displayPopularMovies() {
  const endpoint = '/movie/popular'
  const { results } = await fetchData(endpoint);
  results.forEach(movie => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
          ${movie.poster_path ? `  <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="Movie Title"
            />` : `<img
            src"../images/no-image.jpg"
            class="card-img-top"
            alt="Movie Title"
            >` }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `
    document.querySelector('#popular-movies').appendChild(div);
  });
}

// fetching first 20 popular tv shows
async function displayPopularShows() {
  const endpoint = '/tv/popular'
  const { results } = await fetchData(endpoint);
  results.forEach(show => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="movie-details.html?id=${show.id}">
          ${show.poster_path ? `  <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="Movie Title"
            />` : `<img
            src"../images/no-image.jpg"
            class="card-img-top"
            alt="Movie Title"
            >` }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${show.first_air_date}</small>
            </p>
          </div>
        `
    document.querySelector('#popular-shows').appendChild(div);
  });
}

// display movie details
async function displayMovieDetails() {
  // returns the value after "?"
  const movieId = window.location.search.split('=')[1];
  const endpoint = `movie/${movieId}`;
  const movie = await fetchData(endpoint);
  displayBackground('movie', movie.backdrop_path);
  const div = document.createElement('div');
  div.innerHTML = ` <div class="details-top">
          <div>
          ${movie.poster_path ? `  <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />` : `<img
            src"../images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
            >` }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
            ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies.map((company) => `<span>${company.name}</span>`).join(', ')}</div>
        </div>`
  document.querySelector('#movie-details').appendChild(div);
}

function addCommasToNumber(number) {
  const formatter = new Intl.NumberFormat(`en-US`);
  return formatter.format(number);
}

function displayBackground(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';
  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  }
  else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

// init resources on app loading
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      console.log('home');
      displayPopularMovies();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      console.log('movie details');
      break;
    case '/search.html':
      console.log('search');
      break;
    case '/shows.html':
      console.log('tv shows');
      displayPopularShows();
      break;
    case '/tv-details.html':
      console.log('tv show details');
      break;
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
