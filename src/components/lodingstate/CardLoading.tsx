"use client";

export default function CardLoading({ fromSearch = false }: { fromSearch?: boolean }) {
  return (
    <div className="w-full h-full flex flex-col p-4 bg-card-bg border border-card-border rounded-2xl animate-pulse space-y-4">
      <div className="flex justify-between items-start">
        <div className="h-6 bg-card-border/60 rounded-lg w-[70%]" />
        <div className="h-6 bg-card-border/60 rounded-full w-[60px]" />
      </div>

      <div className="flex-1 space-y-2">
        <div className="h-3 bg-card-border/50 rounded-lg w-full" />
        <div className="h-3 bg-card-border/50 rounded-lg w-[95%]" />
        <div className="h-3 bg-card-border/50 rounded-lg w-[98%]" />
        <div className="h-3 bg-card-border/50 rounded-lg w-[80%]" />
      </div>

      <div className="h-5 bg-card-border/60 rounded-full w-[80px] my-1" />

      <div className="flex justify-between items-center mt-auto pt-3 border-t border-card-border/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-card-border/60 rounded-full shrink-0" />
          <div className="space-y-1.5">
            <div className="h-3.5 bg-card-border/60 rounded-lg w-[160px]" />
            <div className="h-3 bg-card-border/50 rounded-lg w-[70px]" />
          </div>
        </div>

        <div className="h-8 bg-card-border/60 rounded-xl w-[100px]" />
      </div>
    </div>
  );
}
