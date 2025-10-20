import { TRACE_MOE_API_BASE_URL } from "@/lib/apiConfig";
import { AnimeSearchResult } from "@/types/AnimeSearchResult";

export async function searchAnimeByImage(file: File) {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
        `${TRACE_MOE_API_BASE_URL}/search?anilistInfo&cutBorders`,
        {
            method: "POST",
            body: formData,
        }
    );

    if (!res.ok) {
        throw new Error("Anime search failed");
    }

    const data = await res.json();
    return data.result as AnimeSearchResult;
}
