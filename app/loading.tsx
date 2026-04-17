export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950">
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
  );
}
