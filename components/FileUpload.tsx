"use client";

import { searchAnimeByImage } from "@/lib/traceMoeClient";
import { useState } from "react";
import MatchResult from "./MatchResult";
import AnimeDetails from "./AnimeDetails";
import { Anilist, TraceMoeResult } from "@/types/AnimeMatch";
import Image from "next/image";

export default function FileUpload() {
    const [loading, setLoading] = useState(false);
    const [highlight, setHighlight] = useState(false);
    const [fileDropped, setFileDropped] = useState(false);
    const [matches, setMatches] = useState<TraceMoeResult[]>([]);
    const [animeDetail, setAnimeDetail] = useState<Anilist>();
    const [videoSrc, setVideoSrc] = useState<string>("");
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
        setFileDropped(true);
        handleFiles(e.dataTransfer.files);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileDropped(true);
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
            if (result.length > 0) {
                setAnimeDetail(result[0].anilist);
                setVideoSrc(result[0].video);
            }
        } catch (err) {
            console.error("Error fetching anime data", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!fileDropped && (
                <div className="flex items-center justify-center min-h-screen px-4">
                    <label
                        htmlFor="file-upload"
                        className={`flex flex-col items-center justify-center w-full sm:w-[600px] h-24 px-6 py-10 mx-auto border-2 border-dashed border-gray-400 rounded-xl text-center text-gray-600 cursor-pointer transition-colors duration-200 ${
                            highlight
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-400 bg-white"
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            multiple
                            onChange={handleChange}
                        />
                        <p className="text-2xl mb-1">📂</p>
                        <p className="font-medium">Drag & drop files here</p>
                        <p className="text-sm text-gray-500">
                            or click to browse
                        </p>
                    </label>
                </div>
            )}

            {fileDropped && (
                <div className="w-full h-16 bg-gray-100 shadow-md flex items-center justify-center px-6">
                    <div className="flex w-full max-w-xl">
                        <input
                            type="text"
                            value=""
                            readOnly
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg text-sm bg-white text-gray-700 focus:outline-none"
                        />

                        <label
                            htmlFor="file-upload"
                            className="px-4 py-2 border border-l-0 border-gray-300 rounded-r-lg bg-white text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50 transition"
                        >
                            Upload Image
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                </div>
            )}
            <main className="flex mx-auto max-w-6xl mt-4 lg:max-w-6xl gap-6">
                <section className="w-1/3 max-h-[calc(100vh-5rem)] space-y-4">
                    {previewImageUrl && (
                        <div className="bg-white rounded-md shadow hover:shadow-md transition p-4 space-y-2">
                            <div className="flex justify-between items-center gap-4">
                                <div className="text-xs text-gray-600 space-y-1">
                                    <p className="font-medium">
                                        Your search image:
                                    </p>
                                </div>

                                <div className="w-[160px] h-[90px] relative flex-shrink-0 rounded overflow-hidden">
                                    <Image
                                        src={previewImageUrl}
                                        alt="Uploaded Preview"
                                        fill
                                        className="object-cover rounded"
                                        sizes="120px"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {matches &&
                        matches.map((match: TraceMoeResult, index: number) => (
                            <MatchResult
                                key={`${match.anilist.id}-${index}`}
                                match={match}
                            />
                        ))}
                </section>

                <section className="flex-1 bg-gray-100 bg-white">
                    {loading && (
                        <p className="text-center mt-4">Searching anime...</p>
                    )}
                    {animeDetail && (
                        <AnimeDetails
                            animeDetail={animeDetail}
                            videoSrc={videoSrc}
                        />
                    )}
                </section>
            </main>
            {/* )} */}
        </>
    );
}
