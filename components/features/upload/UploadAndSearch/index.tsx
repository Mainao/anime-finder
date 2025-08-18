"use client";

import { searchAnimeByImage } from "@/lib/traceMoeClient";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { TraceMoeResult } from "@/types/AnimeMatch";
import UploadBox from "../UploadBox";
import LoadingSpinner from "@/components/ui/Spinner";
import AnimeResultGrid from "../../results/AnimeResultGrid";

export default function UploadAndSearch() {
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
                    Find the anime scene by image...
                </h1>
                <div className="w-full max-w-7xl px-8">
                    <UploadBox
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onChange={handleChange}
                    />
                </div>
            </section>

            {searchMutation.isPending && (
                <LoadingSpinner className="w-full mt-6" size={100} />
            )}

            {searchMutation.isSuccess && (
                <AnimeResultGrid matches={searchMutation.data} />
            )}
        </>
    );
}
