import { TraceMoeResult } from "@/types/AnimeMatch";
import Image from "next/image";
import HoverCard from "./HoverCard";

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
                className="rounded-md object-cover"
            />

            <span className="mt-2 text-sm text-white">
                {match.anilist.title.english}
            </span>
            <div className={`text-xs ${getMatchColor(matchPercent)}`}>
                <p>{matchPercent}% Similarity</p>
            </div>

            {/* Hover Card */}
            <HoverCard match={match} isLeft={isLastColumn} />
        </div>
    );
}
