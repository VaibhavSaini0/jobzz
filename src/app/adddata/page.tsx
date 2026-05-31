"use client";

export default function Page() {
  async function handleClick() {
    const res = await fetch("/api/seed", { method: "POST" });
    const data = await res.json();
    alert(data.message || (data.success ? "Seeded!" : "Failed"));
  }

  return (
    <div className="max-w-lg mx-auto py-20 px-6 text-center space-y-4">
      <h1 className="text-2xl font-bold">Development Seed Tool</h1>
      <p className="text-text-muted text-sm">
        This page is only available in development. You must be logged in.
      </p>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
      >
        Seed Sample Jobs
      </button>
    </div>
  );
}
