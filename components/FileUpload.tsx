"use client";

import { searchAnimeByImage } from "@/lib/traceMoeClient";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { TraceMoeResult } from "@/types/AnimeMatch";
import ResultGrid from "./ResultGrid";

export default function FileUpload() {
    const [highlight, setHighlight] = useState(false);
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

    const searchMutation = useMutation<TraceMoeResult[], Error, File>({
        mutationFn: (file: File) => searchAnimeByImage(file),
    });

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

        searchMutation.mutate(fileArray[0]);
    };

    return (
        <>
            <section className="flex flex-col items-center justify-start mt-6 md:mt-10">
                <h1 className="text-sm md:text-3xl font-semibold text-center mb-6">
                    Find the anime scene by image
                </h1>
                <div className="w-full max-w-7xl px-8">
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
            </section>

            {searchMutation.isPending && (
                <div className="w-full flex justify-center mt-6">
                    <p className="text-white text-lg animate-pulse">
                        Searching for matches
                        <span className="animate-bounce">...</span>
                    </p>
                </div>
            )}

            {searchMutation.isSuccess && (
                <ResultGrid matches={searchMutation.data} />
            )}
        </>
    );
}
