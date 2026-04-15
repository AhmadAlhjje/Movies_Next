import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { GENRES, getMoviesByGenre } from '@/lib/tmdb';

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

type GenreConfig = {
  id: number;
  label: string;
};

const GENRE_LOOKUP: Record<string, GenreConfig> = {
  action: { id: GENRES.action, label: 'أكشن' },
  horror: { id: GENRES.horror, label: 'رعب' },
  comedy: { id: GENRES.comedy, label: 'كوميدي' },
  romance: { id: GENRES.romance, label: 'رومانسي' },
  drama: { id: GENRES.drama, label: 'دراما' },
  animation: { id: GENRES.animation, label: 'أنيميشن' },
  thriller: { id: GENRES.thriller, label: 'تشويق' },
  'science-fiction': { id: GENRES.scienceFiction, label: 'خيال علمي' },
};

interface GenrePageProps {
  params: Promise<{ genre: string }>;
}

export default async function GenrePage({ params }: GenrePageProps) {
  const { genre } = await params;
  const slug = genre.toLowerCase();
  const config = GENRE_LOOKUP[slug];

  if (!config) {
    notFound();
  }

  const data = await getMoviesByGenre(config.id);
  const results: Movie[] = data.results || [];

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="bg-gradient-to-b from-slate-800 to-slate-950 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {config.label}
            </h1>
          </div>

          {results.length === 0 ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-center text-slate-300">
              لا توجد أفلام في هذا التصنيف حاليا.
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </main>
  );
}
