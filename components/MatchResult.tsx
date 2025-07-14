import { TraceMoeResult } from "@/types/AnimeMatch";
import { formatTime } from "@/utils/time";
import Image from "next/image";

type Props = {
    match: TraceMoeResult;
};

export default function MatchResult({ match }: Props) {
    return (
        <div className="bg-white rounded-sm shadow hover:shadow-md transition p-4 space-y-2">
            <div>
                <h3 className="text-sm font-semibold break-words">
                    {match.anilist.title.english}
                </h3>
                <hr className="border-t border-dotted border-gray-300 mt-1" />
            </div>

            <div className="flex justify-between items-center gap-4">
                <div className="text-xs text-gray-600 space-y-1">
                    <p>
                        <span className="font-medium">Episode:</span>{" "}
                        {match.episode}
                    </p>
                    <p className="text-green-600">
                        {formatTime(match.from)} - {formatTime(match.to)}
                    </p>
                    <p>{(match.similarity * 100).toFixed(1)}% Similarity</p>
                </div>

                <div className="w-[160px] h-[90px] relative flex-shrink-0 rounded-sm">
                    <Image
                        src={match.image}
                        alt={`Thumbnail for ${match.filename}`}
                        fill
                        className="object-cover rounded"
                        sizes="120px"
                    />
                </div>
            </div>
        </div>
    );
}
