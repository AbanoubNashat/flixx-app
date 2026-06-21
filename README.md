# Flixx

Flixx is a vanilla JavaScript movie and TV show browser powered by [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api). It lets users explore popular movies, popular TV shows, currently playing movies, detailed title pages, and searchable movie/show results with pagination.

## Features

- Browse popular movies
- Browse popular TV shows
- View detailed movie information
- View detailed TV show information
- Search movies and TV shows
- Paginated search results
- Now playing movie carousel using Swiper
- Loading spinner while API data is being fetched
- Fallback image for titles with missing posters
- Responsive layout with custom CSS

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- TMDB API
- Swiper.js
- Font Awesome

## Project Structure

```text
flixx-app/
├── css/
│   ├── spinner.css
│   └── style.css
├── images/
│   ├── no-image.jpg
│   └── showcase-bg.jpg
├── js/
│   └── script.js
├── lib/
│   ├── fontawesome.css
│   ├── swiper.css
│   └── swiper.js
├── webfonts/
├── index.html
├── shows.html
├── search.html
├── movie-details.html
├── tv-details.html
└── README.md
```

## Pages

- `index.html` - Home page with now playing movies and popular movies
- `shows.html` - Popular TV shows page
- `search.html` - Movie and TV show search results page
- `movie-details.html` - Individual movie details page
- `tv-details.html` - Individual TV show details page

## Getting Started

This project does not require a build step. You can run it with any local static server.

### Option 1: VS Code Live Server

1. Open the project folder in VS Code.
2. Install the Live Server extension if you do not already have it.
3. Right-click `index.html`.
4. Select `Open with Live Server`.

### Option 2: Python Static Server

From the project root, run:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## TMDB API

The app fetches data from TMDB using the API configuration in `js/script.js`.

```js
api: {
  apiKey: 'your_api_key_here',
  apiUrl: 'https://api.themoviedb.org/3/'
}
```

For a production project, avoid committing API keys directly in JavaScript files. Use environment variables or a backend proxy instead.

## Main JavaScript Functions

- `displayPopularMovies()` - Fetches and renders popular movies
- `displayPopularShows()` - Fetches and renders popular TV shows
- `displayMovieDetails()` - Fetches and renders details for a selected movie
- `displayShowDetails()` - Fetches and renders details for a selected TV show
- `search()` - Reads search parameters from the URL and fetches matching results
- `displaySearchResult()` - Renders search result cards
- `displayPagination()` - Handles previous and next search pages
- `displaySlider()` - Fetches now playing movies and initializes the carousel

## Notes

- The app depends on internet access because all movie and TV data comes from TMDB.
- Direct browser opening may not handle root-relative paths correctly, so a local server is recommended.
- Search uses query string parameters from the search form, for example:

```text
/search.html?type=movie&search-term=batman
```

## License

This project is for learning and practice.
