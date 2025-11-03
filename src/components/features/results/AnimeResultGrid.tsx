import { AnimeSearchResult } from "@/types/AnimeSearchResult";
import AnimeCard from "./AnimeCard";

type ResultGridProps = {
    matches: AnimeSearchResult;
};

export default function AnimeResultGrid({ matches }: ResultGridProps) {
    return (
        <>
            <section className="mt-8">
                <h2 className="text-sm mb-4">All Results:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {matches.map((match, index) => (
                        <AnimeCard
                            key={`${match.anilist.id}-${index}`}
                            match={match}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}
