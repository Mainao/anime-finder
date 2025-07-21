import { TraceMoeResult } from "@/types/AnimeMatch";

type Props = {
    match: TraceMoeResult;
    isLeft: boolean;
};

export default function HoverCard({ match, isLeft }: Props) {
    return (
        <div
            className={`absolute top-0 w-72 bg-white text-black border border-gray-200 rounded-sm p-4 shadow-xl opacity-0 scale-95 translate-x-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 transition-all duration-300 ease-out z-50 ${
                isLeft ? "right-full mr-4" : "left-full ml-4"
            }`}
        >
            <p className="text-sm font-semibold">Episode {match.episode}</p>
            <p className="text-gray-600 text-xs mt-1">
                {match.anilist?.episodes} episodes · {match.anilist?.duration}{" "}
                min · {match.anilist?.format} · {match.anilist?.type}
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
    );
}
