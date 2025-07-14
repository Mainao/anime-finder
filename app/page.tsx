import FileUpload from "@/components/FileUpload";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">
            <main>
                <FileUpload />
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
        </div>
    );
}
