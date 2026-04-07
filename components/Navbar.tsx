import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="text-lg font-extrabold tracking-wide text-white transition hover:text-red-400"
        >
           MoveNext
        </Link>

        <Link
          href="/"
          className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-red-500 hover:text-white"
        >
          بحث
        </Link>
      </div>
    </nav>
  );
}
