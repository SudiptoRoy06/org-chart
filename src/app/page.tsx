export default function Home() {

  console.log("API URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
  console.log("TOKEN EXISTS:", !!process.env.NEXT_PUBLIC_AUTH_TOKEN);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/org-chart"
            rel="noopener noreferrer"
          >
            Visit Organization Chart App
          </a>
        </div>
      </main>
    </div>
  );
}
