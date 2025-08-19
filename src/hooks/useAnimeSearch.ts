import { useMutation } from "@tanstack/react-query";
import { searchAnimeByImage } from "../api/animeApi";
import { AnimeSearchResult } from "@/types/AnimeSearchResult";

export function useAnimeSearch() {
    return useMutation({
        mutationFn: (file: File) => searchAnimeByImage(file),
    });
}
