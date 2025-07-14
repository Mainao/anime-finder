export async function searchAnimeByImage(file: File) {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("https://api.trace.moe/search?anilistInfo", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        throw new Error("Anime search failed");
    }

    const data = await res.json();
    return data.result.slice(0, 5);
}
