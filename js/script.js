const global = {
  currentPage: window.location.pathname
};

function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

// init resources on app loading
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      console.log('home');
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
