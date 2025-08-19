import UploadAndSearch from "@/components/features/upload/UploadAndSearch";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b border-zinc-800">
                <div className="max-w-[1200px] mx-auto">
                    <h1 className="text-xl font-bold py-4">Anime Finder</h1>
                </div>
            </header>
            <main className="flex-1 flex justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-[1400px]">
                    <div className="container py-8 max-w-[1200px] mx-auto">
                        <UploadAndSearch />
                    </div>
                </div>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center py-6"></footer>
        </div>
    );
}
