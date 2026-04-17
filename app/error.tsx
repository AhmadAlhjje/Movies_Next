'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full rounded-xl border border-red-500/40 bg-slate-900 p-10 shadow-lg">
        <div className="mb-6 flex justify-center">
          <span className="text-6xl select-none">🎬</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">حدث خطأ ما</h2>
        <p className="text-slate-400 mb-8 text-sm leading-relaxed">
          تعذّر تحميل الصفحة. قد يكون هناك مشكلة في الاتصال أو في جلب البيانات.
        </p>
        <button
          onClick={reset}
          className="rounded-full bg-red-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-red-500 active:scale-95"
        >
          حاول مجدداً
        </button>
      </div>
    </main>
  );
}
