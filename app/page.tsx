import FileUpload from "@/components/FileUpload";

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col">
            <header className="border-b border-white/20 px-8 py-4">
                <h1 className="text-xl font-bold">Anime Finder</h1>
            </header>
            <FileUpload />
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center py-6"></footer>
        </main>
    );
}
