"use client";

import { useState } from "react";
import UploadBox from "../UploadBox";
import UploadPreview from "../UploadPreview";
import LoadingSpinner from "@/components/ui/Spinner";
import AnimeResultGrid from "@/components/features/results/AnimeResultGrid";
import { useAnimeSearch } from "@/hooks/useAnimeSearch";
import AnimeTopMatch from "../../results/AnimeTopMatch";

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
                <div className="flex flex-col md:flex-row gap-4 mt-6">
                    <UploadPreview previewImageUrl={previewImageUrl} />
                    <AnimeTopMatch topMatch={animeSearch?.data[0]} />
                </div>
            )}

            {animeSearch.isSuccess && (
                <AnimeResultGrid matches={animeSearch.data} />
            )}
        </>
    );
}
