// TMDB API Key
const TMDB_KEY = process.env.NEXT_PUBLIC_TMDB_KEY;

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const GENRES = {
  action: 28,
  comedy: 35,
  horror: 27,
  romance: 10749,
  drama: 18,
  animation: 16,
  thriller: 53,
  scienceFiction: 878,
};

// Mock data للتطوير بدون API key
const MOCK_MOVIES = {
  results: [
    {
      id: 1,
      title: 'The Shawshank Redemption',
      poster_path: '/posters/shawshank.jpg',
      vote_average: 9.3,
      release_date: '1994-09-14',
      overview: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      runtime: 142,
      genres: [{ id: 18, name: 'Drama' }],
      tagline: 'Fear Can Hold You Prisoner. Hope Can Set You Free.'
    },
    {
      id: 2,
      title: 'The Godfather',
      poster_path: '/posters/godfather.jpg',
      vote_average: 9.2,
      release_date: '1972-03-14',
      overview: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant youngest son.',
      runtime: 175,
      genres: [{ id: 18, name: 'Drama' }],
      tagline: 'An offer you cannot refuse.'
    },
    {
      id: 3,
      title: 'The Dark Knight',
      poster_path: '/posters/darkknight.jpg',
      vote_average: 9.0,
      release_date: '2008-07-18',
      overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
      runtime: 152,
      genres: [{ id: 28, name: 'Action' }],
      tagline: 'Everything burns.'
    },
  ]
};

export async function getMovies(page = 1) {
  if (!TMDB_KEY) {
    // استخدم mock data للتطوير
    return MOCK_MOVIES;
  }
  
  const res = await fetch(
    `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_KEY}&page=${page}&language=ar`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('فشل جلب الأفلام');
  return res.json();
}

export async function getMovieById(id: string) {
  if (!TMDB_KEY) {
    const movie = MOCK_MOVIES.results.find(m => m.id === parseInt(id));
    if (movie) return { ...movie, backdrop_path: '/posters/shawshank.jpg' };
    throw new Error('الفيلم غير موجود');
  }
  
  const res = await fetch(
    `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_KEY}&language=ar`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('الفيلم غير موجود');
  return res.json();
}

export async function searchMovies(query: string, page = 1) {
  if (!TMDB_KEY) {
    const results = MOCK_MOVIES.results.filter(m =>
      m.title.toLowerCase().includes(query.toLowerCase())
    );
    return { results };
  }
  
  const res = await fetch(
    `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=ar`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('فشل البحث');
  return res.json();
}

export async function getMoviesByGenre(genreId: number, page = 1) {
  if (!TMDB_KEY) {
    return MOCK_MOVIES;
  }
  
  const res = await fetch(
    `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_KEY}&with_genres=${genreId}&page=${page}&language=ar&sort_by=popularity.desc`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('فشل جلب الأفلام حسب التصنيف');
  return res.json();
}
