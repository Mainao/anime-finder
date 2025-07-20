import FileUpload from "@/components/FileUpload";

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col">
            <header className="border-b border-white/20 px-6 py-4">
                <h1 className="text-xl font-bold">Anime Finder</h1>
            </header>
            <section className="flex flex-col items-center justify-start mt-10 px-4 w-full">
                <h1 className="text-lg md:text-3xl font-semibold text-center mb-6">
                    Find the anime scene by image
                </h1>
                <FileUpload />
            </section>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
        </main>
    );
}
