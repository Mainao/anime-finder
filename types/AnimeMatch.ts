export interface TraceMoeResult {
    anilist: Anilist;
    filename: string;
    episode: number;
    from: number;
    to: number;
    similarity: number;
    video: string;
    image: string;
}

export interface Anilist {
    id: number;
    idMal: number;
    title: Title;
    type: string;
    format: string;
    status: string;
    startDate: DateObject;
    endDate: DateObject;
    season: string;
    episodes: number;
    duration: number;
    source: string;
    coverImage: ImageSet;
    bannerImage: string;
    genres: string[];
    synonyms: string[];
    synonyms_chinese: string[];
    studios: {
        edges: StudioEdge[];
    };
    isAdult: boolean;
    externalLinks: ExternalLink[];
    siteUrl: string;
}

export interface Title {
    native: string;
    romaji: string;
    english: string;
    chinese?: string;
}

export interface DateObject {
    year: number;
    month: number;
    day: number;
}

export interface ImageSet {
    large: string;
    medium: string;
}

export interface StudioEdge {
    isMain: boolean;
    node: {
        id: number;
        name: string;
        siteUrl: string;
    };
}

export interface ExternalLink {
    id: number;
    url: string;
    site: string;
}
