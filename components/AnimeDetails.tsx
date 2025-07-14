import { Anilist, ExternalLink, StudioEdge } from "@/types/AnimeMatch";
import Image from "next/image";

type Props = {
    animeDetail?: Anilist;
    videoSrc?: string;
};

export default function AnimeDetails({ animeDetail, videoSrc }: Props) {
    return (
        <>
            <video
                src={videoSrc}
                autoPlay
                muted
                loop
                controls
                className="w-full h-72 object-cover rounded-sm mb-6"
            />

            <div className="flex flex-col md:flex-row gap-6 p-4">
                <div className="flex-1 space-y-4 text-sm text-gray-700">
                    <div>
                        <a
                            href={animeDetail?.siteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl font-semibold text-blue-600 hover:underline"
                        >
                            {animeDetail?.title.english}
                        </a>
                    </div>

                    <div className="text-gray-600">
                        <span className="font-medium text-gray-800">
                            {animeDetail?.episodes} episodes ·{" "}
                            {animeDetail?.duration} min · {animeDetail?.format}{" "}
                            · {animeDetail?.type}
                        </span>
                    </div>

                    <div className="grid grid-cols-[100px_1fr] gap-y-4 gap-x-3">
                        <span className="font-medium text-gray-600">
                            Alias:
                        </span>
                        <div className="flex flex-col gap-1">
                            {animeDetail?.synonyms.map((synonym) => (
                                <span key={synonym} className="text-gray-800">
                                    {synonym}
                                </span>
                            ))}
                        </div>

                        <span className="font-medium text-gray-600">
                            Genre:
                        </span>
                        <p>{animeDetail?.genres.join(", ")}</p>

                        <span className="font-medium text-gray-600">
                            Studio:
                        </span>
                        <div className="flex flex-col gap-1">
                            {animeDetail?.studios.edges.map(
                                (studio: StudioEdge) => (
                                    <a
                                        key={studio.node.id}
                                        href={studio.node.siteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-800 hover:underline"
                                    >
                                        {studio.node.name}
                                    </a>
                                )
                            )}
                        </div>

                        <span className="font-medium text-gray-600">
                            Links:
                        </span>
                        <div className="flex flex-col gap-1">
                            {animeDetail?.externalLinks.map(
                                (link: ExternalLink) => (
                                    <a
                                        key={link.id}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        {link.site}
                                    </a>
                                )
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-64 h-72 shrink-0 rounded overflow-hidden shadow border border-gray-200">
                    <div className="relative w-full h-full">
                        <Image
                            src={animeDetail?.coverImage?.large || ""}
                            alt="Cover"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
