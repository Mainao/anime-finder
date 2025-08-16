import { TraceMoeResult } from "@/types/AnimeMatch";
import AnimeCard from "./AnimeCard";

type ResultGridProps = {
    matches: TraceMoeResult[];
};

export default function ResultGrid({ matches }: ResultGridProps) {
    return (
        <>
            {matches.length > 0 && (
                <section className="mt-10 px-8">
                    <h2 className="text-lg md:text-xl font-semibold mb-4">
                        Search Results
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {matches.map((match: TraceMoeResult, index: number) => (
                            <AnimeCard
                                key={`${match.anilist.id}-${index}`}
                                index={index}
                                match={match}
                            />
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}
