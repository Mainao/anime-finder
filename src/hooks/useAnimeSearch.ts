import { useMutation } from "@tanstack/react-query";
import { searchAnimeByImage } from "../api/animeApi";

export function useAnimeSearch() {
    return useMutation({
        mutationFn: (file: File) => searchAnimeByImage(file),
    });
}
