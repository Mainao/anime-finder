import { TraceMoeResult } from "@/types/AnimeMatch";
import { clsx } from "clsx";
import Image from "next/image";

type Props = {
    match: TraceMoeResult;
    index: number;
};

export default function MatchResult({ match, index }: Props) {
    const matchPercent = Math.round(match.similarity * 100);
    const isLastColumn = (index + 1) % 4 === 0;
    const getMatchColor = (percent: number) => {
        if (percent >= 80) return "text-green-400";
        if (percent >= 70) return "text-yellow-400";
        return "text-red-400";
    };
    return (
        <div className="relative group flex flex-col cursor-pointer">
            {/* Image */}
            <Image
                src={match.image}
                alt={`Thumbnail for ${match.filename}`}
                width={300}
                height={170}
                className="rounded-md object-cover w-[300px] h-[170px]"
            />

            <span className="mt-2 text-sm text-white">
                {match.anilist.title.english}
            </span>
            <div className={`text-xs ${getMatchColor(matchPercent)}`}>
                <p>{matchPercent}% Similarity</p>
            </div>

            {/* Hover Card */}
            <div
                className={clsx(
                    "absolute top-0 w-72 bg-white text-black border border-gray-200 rounded-sm p-4 shadow-xl opacity-0 scale-95 translate-x-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 transition-all duration-300 ease-out z-50 ",
                    isLastColumn ? "right-full mr-4" : "left-full ml-4"
                )}
            >
                <p className="text-sm font-semibold">Episode {match.episode}</p>
                <p className="text-gray-600">
                    <span className="text-xs text-gray-800">
                        {match.anilist?.episodes} episodes ·{" "}
                        {match.anilist?.duration} min · {match.anilist?.format}{" "}
                        · {match.anilist?.type}
                    </span>
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                    {match.anilist.genres?.slice(0, 3).map((genre) => (
                        <span
                            key={genre}
                            className="text-xs bg-gray-300 px-2 py-1 rounded-sm"
                        >
                            {genre.toLowerCase()}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
