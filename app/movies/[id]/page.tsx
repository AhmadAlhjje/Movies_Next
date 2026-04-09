import Image from 'next/image';
import { getMovieById } from '@/lib/tmdb';
import { ArrowRight, Star, Calendar, Users } from 'lucide-react';
import Link from 'next/link';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movie = await getMovieById(id);

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="relative">
        {movie.backdrop_path && (
          <div className="relative h-96 md:h-screen bg-slate-800">
            <Image
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
              alt={movie.title}
              fill
              className="object-cover brightness-50"
              priority
            />
          </div>
        )}

        {/* المحتوى */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
              {/* الملصق */}
              <div className="md:col-span-1">
                {movie.poster_path && (
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
              </div>

              {/* المعلومات */}
              <div className="md:col-span-3 text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
                
                {movie.tagline && (
                  <p className="text-xl text-slate-300 italic mb-6">&ldquo;{movie.tagline}&rdquo;</p>
                )}

                {/* الإحصائيات */}
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="text-lg font-semibold">{rating}/10</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="text-lg">{releaseYear}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-500" />
                    <span className="text-lg">{movie.runtime} دقيقة</span>
                  </div>
                </div>

                {/* التصنيفات */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {movie.genres.map((genre: { id: number; name: string }) => (
                      <span
                        key={genre.id}
                        className="px-4 py-2 bg-red-600/50 border border-red-600 rounded-full text-sm font-medium"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* الوصف */}
                {movie.overview && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">نبذة</h2>
                    <p className="text-slate-300 leading-relaxed text-lg max-w-2xl">
                      {movie.overview}
                    </p>
                  </div>
                )}

                {/* الزر */}
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition"
                >
                  <ArrowRight className="w-5 h-5" />
                  العودة للأفلام
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
