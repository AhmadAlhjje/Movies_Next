import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link
          href="/"
          className="text-lg font-extrabold tracking-wide text-white transition hover:text-red-400"
        >
           MoveNext
        </Link>
        <div className="w-full sm:w-auto sm:min-w-[20rem]">
          <SearchBar basePath="/" />
        </div>
      </div> 
    </nav>
  );
}
