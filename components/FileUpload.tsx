"use client";

import { searchAnimeByImage } from "@/lib/traceMoeClient";
import { useState } from "react";
import AnimeCard from "./AnimeCard";
import { TraceMoeResult } from "@/types/AnimeMatch";

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
        handleFiles(e.target.files);
    };

    const handleFiles = async (fileList: FileList | null) => {
        if (!fileList) return;
        const fileArray = Array.from(fileList);
        if (previewImageUrl) {
            URL.revokeObjectURL(previewImageUrl);
        }
        setPreviewImageUrl(URL.createObjectURL(fileArray[0]));
        setLoading(true);
        try {
            const result = await searchAnimeByImage(fileList[0]);
            setMatches(result);
        } catch (err) {
            console.error("Error fetching anime data", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
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
                        Upload an image or enter an image URL
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

            {loading && (
                <p className="text-white text-lg mt-4 animate-pulse">
                    Searching for matches
                    <span className="animate-bounce">...</span>
                </p>
            )}

            {matches && matches.length > 0 && (
                <section className="w-full flex-1 px-4 md:px-10 mt-10 w-full">
                    <h2 className="text-lg md:text-xl font-semibold mb-4">
                        Search Results
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {matches.map((match: TraceMoeResult, index: number) => (
                            <AnimeCard
                                key={`${match.anilist.id}-${index}`}
                                index={index}
                                match={match}
                            />
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}
