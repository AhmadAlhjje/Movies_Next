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

export async function getMovies(page = 1) {
  if (!TMDB_KEY) throw new Error('مفتاح TMDB API مفقود');
  
  const res = await fetch(
    `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_KEY}&page=${page}&language=ar`,
    { cache: 'force-cache', next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('فشل جلب الأفلام');
  return res.json();
}

export async function getMovieById(id: string) {
  if (!TMDB_KEY) throw new Error('مفتاح TMDB API مفقود');
  
  const res = await fetch(
    `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_KEY}&language=ar`,
    { cache: 'force-cache', next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('الفيلم غير موجود');
  return res.json();
}

export async function searchMovies(query: string, page = 1) {
  if (!TMDB_KEY) throw new Error('مفتاح TMDB API مفقود');
  
  const res = await fetch(
    `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=ar`,
    { cache: 'force-cache', next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('فشل البحث');
  return res.json();
}

export async function getMoviesByGenre(genreId: number, page = 1) {
  if (!TMDB_KEY) throw new Error('مفتاح TMDB API مفقود');
  
  const res = await fetch(
    `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_KEY}&with_genres=${genreId}&page=${page}&language=ar&sort_by=popularity.desc`,
    { cache: 'force-cache', next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('فشل جلب الأفلام حسب التصنيف');
  return res.json();
}