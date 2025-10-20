import { AnimeResult } from "@/types/AnimeSearchResult";
import Image from "next/image";

type Props = {
    match: AnimeResult;
    index: number;
};

export default function MatchResult({ match, index }: Props) {
    const matchPercent = Math.round(match.similarity * 100);
    const getMatchColor = (percent: number) => {
        if (percent >= 80) return "bg-green-700";
        if (percent >= 70) return "bg-yellow-400";
        return "bg-red-600";
    };

    return (
        <div className="relative group flex flex-col cursor-pointer border border-zinc-800 rounded-l-md rounded-r-md">
            <Image
                src={match.image}
                alt={`Thumbnail for ${match.filename}`}
                width={300}
                height={170}
                className="rounded-tl-md rounded-tr-md object-cover"
            />
            <div className="flex items-start justify-between mt-4 p-2">
                <div className="text-md font-bold">
                    {match.anilist.title.english || match.anilist.title.native}
                </div>
                <div
                    className={`text-xs p-1 font-bold rounded ${getMatchColor(
                        matchPercent
                    )}`}
                >
                    <p>{matchPercent}%</p>
                </div>
            </div>
            <div className="text-gray-600">
                <span className="text-sm text-white/60 p-2">
                    {match.anilist.episodes} episodes · {match.anilist.duration}{" "}
                    min · {match.anilist.format} · {match.anilist.type}
                </span>
            </div>
            <div className="flex flex-wrap text-xs mb-4 p-2">
                {!!match.anilist.genres &&
                    match.anilist.genres.map((genre) => (
                        <span className="bg-zinc-900 mr-2 p-1 rounded">
                            {genre}
                        </span>
                    ))}
            </div>
        </div>
    );
}
