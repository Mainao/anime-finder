import FileUpload from "@/components/FileUpload";

export default function Home() {
    return (
        <main className="min-h-screen w-full max-w-7xl mx-auto flex flex-col">
            <header className="px-8 py-4">
                <h1 className="text-xl font-bold">Anime Finder</h1>
            </header>
            <FileUpload />
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center py-6"></footer>
        </main>
    );
}
