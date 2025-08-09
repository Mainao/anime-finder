"use client";

import { searchAnimeByImage } from "@/lib/traceMoeClient";
import { useState } from "react";
import { TraceMoeResult } from "@/types/AnimeMatch";
import ResultGrid from "./ResultGrid";

export default function FileUpload() {
    const [loading, setLoading] = useState(false);
    const [highlight, setHighlight] = useState(false);
    const [matches, setMatches] = useState<TraceMoeResult[]>([]);
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setHighlight(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setHighlight(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setHighlight(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        handleFiles(e.target.files);
    };

    const handleFiles = async (fileList: FileList | File[]) => {
        if (!fileList || fileList.length === 0) return;
        const fileArray = Array.from(fileList);

        if (previewImageUrl) URL.revokeObjectURL(previewImageUrl);

        setPreviewImageUrl(URL.createObjectURL(fileArray[0]));
        setMatches([]);
        setLoading(true);

        try {
            const result = await searchAnimeByImage(fileArray[0]);
            setMatches(result);
        } catch (err) {
            console.error("Anime search failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="flex flex-col items-center justify-start mt-10 px-4 w-full">
                <h1 className="text-lg md:text-3xl font-semibold text-center mb-6">
                    Find the anime scene by image
                </h1>
                <div className="w-full max-w-6xl">
                    <label
                        htmlFor="upload"
                        className="flex items-center gap-3 px-4 py-3 bg-[#2d333b] rounded-sm cursor-pointer text-white/60 hover:bg-white/10 transition"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <span className="text-lg">🔍</span>
                        <span className="text-xs md:text-sm">
                            Upload an image
                        </span>
                        <input
                            id="upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleChange}
                        />
                    </label>
                </div>
                {/* <CameraCapture onCapture={(file) => handleFiles([file])} /> */}
            </section>

            {loading && (
                <div className="w-full flex justify-center mt-6">
                    <p className="text-white text-lg animate-pulse">
                        Searching for matches
                        <span className="animate-bounce">...</span>
                    </p>
                </div>
            )}

            <ResultGrid matches={matches} />
        </>
    );
}
