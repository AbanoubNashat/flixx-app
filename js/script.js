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

// fetching popular movies
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

// global function for fetching data
async function fetchData(endpoint) {
  // added .env and wanted to use vite but this project is simple for this use case
  const API_KEY = '31a6c3f2d1e8dc0ecddccd116b88dcc0';
  const API_URL = 'https://api.themoviedb.org/3/';
  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();
  return data;
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
      console.log('movie details');
      break;
    case '/search.html':
      console.log('search');
      break;
    case '/shows.html':
      console.log('tv shows');
      break;
    case '/tv-details.html':
      console.log('tv show details');
      break;
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
