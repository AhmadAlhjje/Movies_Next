import { GENRES, getMovies, searchMovies } from '@/lib/tmdb';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

type GenreLink = {
  slug: string;
  label: string;
  id: number;
};

const GENRE_LINKS: GenreLink[] = [
  { slug: 'action', label: 'أكشن', id: GENRES.action },
  { slug: 'horror', label: 'رعب', id: GENRES.horror },
  { slug: 'comedy', label: 'كوميدي', id: GENRES.comedy },
  { slug: 'romance', label: 'رومانسي', id: GENRES.romance },
  { slug: 'drama', label: 'دراما', id: GENRES.drama },
  { slug: 'animation', label: 'أنيميشن', id: GENRES.animation },
  { slug: 'thriller', label: 'تشويق', id: GENRES.thriller },
  { slug: 'science-fiction', label: 'خيال علمي', id: GENRES.scienceFiction },
];

function MoviesSkeleton() {
  return (
    <>
      {/* Full-page overlay — blocks all interaction */}
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-sm">
        {/* Glow background */}
        <div className="absolute w-72 h-72 rounded-full bg-red-600/10 blur-3xl" />

        {/* Spinner ring */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="w-20 h-20 rounded-full border-4 border-slate-800 border-t-red-500 animate-spin" />
          <div className="absolute w-12 h-12 rounded-full border-4 border-slate-800 border-b-red-400 animate-spin [animation-direction:reverse] [animation-duration:600ms]" />
          <span className="absolute text-2xl select-none">🎬</span>
        </div>

        {/* Text */}
        <p className="text-white text-lg font-semibold tracking-wide mb-2">جاري التحميل</p>
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>

      {/* Skeleton cards in background */}
      <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
            <div className="aspect-[2/3] bg-slate-800 animate-pulse" />
            <div className="p-3 space-y-2">
              <div className="h-4 bg-slate-700 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-slate-800 rounded animate-pulse w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

async function MovieGrid({ query }: { query: string }) {
  const hasSearched = Boolean(query);
  const data = hasSearched ? await searchMovies(query) : await getMovies();
  const results: Movie[] = data.results || [];

  if (hasSearched && results.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-center text-slate-300">
        لم نجد أفلام تطابق البحث عن &ldquo;{query}&rdquo;
      </div>
    );
  }

  if (!hasSearched && results.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-center text-slate-300">
        تعذر جلب الأفلام الآن. يرجى المحاولة لاحقًا.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {results.map((movie) => (
        <Link key={movie.id} href={`/movies/${movie.id}`} className="group">
          <article className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition hover:border-red-500/60">
            <div className="relative aspect-[2/3] bg-slate-800">
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-400">
                  لا توجد صورة
                </div>
              )}
            </div>
            <div className="p-3">
              <h2 className="line-clamp-1 text-sm font-semibold text-white">{movie.title}</h2>
              <p className="mt-1 text-xs text-amber-400">
                {movie.vote_average?.toFixed(1) ?? '0.0'}
              </p>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}

interface HomeProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { q = '' } = await searchParams;
  const query = q.trim();
  const hasSearched = Boolean(query);

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="bg-gradient-to-b from-slate-800 to-slate-950 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {hasSearched ? 'نتائج البحث' : 'أجدد الأفلام'}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Link
                href={query ? `/?q=${encodeURIComponent(query)}` : '/'}
                className="rounded-full border border-red-500/60 px-4 py-1 text-sm font-medium text-white transition"
              >
                الكل
              </Link>
              {GENRE_LINKS.map((item) => (
                <Link
                  key={item.slug}
                  href={`/genre/${item.slug}`}
                  className="rounded-full border border-slate-700 px-4 py-1 text-sm font-medium text-slate-300 transition hover:border-red-500/60 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <Suspense fallback={<MoviesSkeleton />}>
            <MovieGrid query={query} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
