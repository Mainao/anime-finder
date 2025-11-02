"use client";

import { useState } from "react";
import UploadBox from "../UploadBox";
import LoadingSpinner from "@/components/ui/Spinner";
import AnimeResultGrid from "@/components/features/results/AnimeResultGrid";
import { useAnimeSearch } from "@/hooks/useAnimeSearch";
import Image from "next/image";

export default function UploadAndSearch() {
    const [highlight, setHighlight] = useState(false);
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

    const animeSearch = useAnimeSearch();

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

        animeSearch.mutate(fileArray[0]);
    };

    return (
        <>
            <section className="flex flex-col items-center justify-start">
                <div className="w-full">
                    <UploadBox
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onChange={handleChange}
                    />
                </div>
            </section>

            {animeSearch.isPending && (
                <LoadingSpinner className="w-full mt-6" size={400} />
            )}

            {animeSearch.isSuccess && (
                <div className="md:w-1/3 space-y-4 mt-6">
                    <div className="bg-neutral-900 rounded-2xl p-4">
                        <h2 className="text-gray-400 text-sm mb-2">Your search image</h2>
                        <div className="relative w-full h-48 md:h-64">
                            <Image
                            src={previewImageUrl!}
                            alt="Search"
                            fill
                            className="object-cover rounded-xl border border-neutral-700"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            2560×1440 • ~36.56% similarity
                        </p>
                    </div>
                </div>
            )}

            {animeSearch.isSuccess && (
                <AnimeResultGrid matches={animeSearch.data} />
            )}
        </>
    );
}
