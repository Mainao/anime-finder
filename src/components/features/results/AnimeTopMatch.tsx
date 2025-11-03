import React from 'react'
import Image from "next/image";
import { AnimeSearchResult } from '@/types/AnimeSearchResult';

type AnimeTopMatchProps = {
    topMatch: AnimeSearchResult[0];
};

export default function AnimeTopMatch({topMatch}: AnimeTopMatchProps) {
    return (
        <div className="flex-1 bg-neutral-900 rounded-2xl p-6 flex flex-col">
            <div className="flex flex-col md:flex-row gap-6">
                <div>
                    <h2 className="text-2xl font-bold mb-2">{topMatch?.anilist?.title?.english}</h2>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mb-2">
                        {topMatch?.anilist?.genres?.join(" • ")}
                    </div>
                    <p className="text-sm text-gray-400 mb-1">
                        <span className="text-gray-500">Total episodes:</span>{" "}
                        {topMatch?.anilist?.episodes}
                    </p>
                    <p className="text-sm text-gray-400 mb-1">
                        <span className="text-gray-500">Duration:</span>{" "}
                        {topMatch?.anilist?.duration}
                    </p>
                    <p className="text-sm text-gray-400 mb-4">
                        <span className="text-gray-500">Status:</span>{" "}
                        {topMatch?.anilist?.status}
                    </p>
                    <button className="bg-pink-600 hover:bg-pink-700 px-5 py-2 rounded-xl font-medium">
                        Watch now
                    </button>
                </div>
                <div className="relative w-56 h-56 flex-shrink-0">
                    <Image
                        src={topMatch?.anilist?.coverImage?.large}
                        alt="banner image"
                        fill
                        className="object-cover rounded-xl"
                    />
                </div>
            </div>
        </div>
    )
}
