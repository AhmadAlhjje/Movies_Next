'use client';

import { useEffect, useMemo, useState, useTransition, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchBarProps {
  initialQuery?: string;
  basePath?: string;
}

function SearchBarContent({ initialQuery = '', basePath = '/' }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(initialQuery);

  const currentQuery = useMemo(() => searchParams.get('q') ?? '', [searchParams]);

  useEffect(() => {
    setValue(currentQuery);
  }, [currentQuery]);

  const updateUrl = (nextValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextValue.trim()) {
      params.set('q', nextValue);
    } else {
      params.delete('q');
    }

    const queryString = params.toString();
    const nextUrl = queryString ? `${basePath}?${queryString}` : basePath;

    startTransition(() => {
      router.replace(nextUrl);
    });
  };

  return (
    <form
      className="flex w-full items-center gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        updateUrl(value);
      }}
    >
      <input
        type="search"
        name="q"
        value={value}
        onChange={(event) => {
          const nextValue = event.target.value;
          setValue(nextValue);
          updateUrl(nextValue);
        }}
        placeholder="ابحث عن فيلم"
        className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-red-500 focus:outline-none"
      />
      <button
        type="submit"
        disabled={isPending}
        className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-red-500 hover:text-white disabled:opacity-60"
      >
        بحث
      </button>
    </form>
  );
}

export default function SearchBar(props: SearchBarProps) {
  return (
    <Suspense fallback={<div className="h-10 w-full animate-pulse rounded-md bg-slate-800"></div>}>
      <SearchBarContent {...props} />
    </Suspense>
  );
}