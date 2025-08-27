import metalFestival from "../assets/MetalFestival.png";
import popFestival from "../assets/NightFireworksFestival.png"
import countryFestival from "../assets/CountryFestival.png";
import rockFestival from "../assets/RockFestival.png"
import grungeFestival from "../assets/GrungeFestival.png"
import altFestival from "../assets/AlternativeFestival.png"
import gospelFestival from "../assets/GospelFestival.png"
import latinFestival from "../assets/LatinFestival.png"
import punkFestival from "../assets/PunkFestival.png"

export const Music_Genres = [
    "Rock","Metal","Country","Grunge","Pop","Alternative","Gospel","Latin","Punk"
];

export type musicGenres = "rock" | "metal" | "country" | "grunge" | "pop" | "alternative" | "gospel" | "latin" | "punk" 

export type Band = {
  id: number;
  bandName: string;
  origin: string;
  mostPlayedSong: string;
  genreOfMusic: string;
  aboutUs: string
}

export type Album = {
    songs?: string[];
    album_name: string,
    chart_ranking: number | null;
    revenue_generated: number;
}

export type PastEvents = {
    date: string,
    description: string,
    venue_name: string,
    guest_count: number;
}

export type ProfileInformation = Omit<Band, "id"> & {
    mostRecentPerformance: PastEvents,
    aboutUs: string,
    latestAlbum: Album;
}


export type bandStyles = {
  backgroundImage: string;
  fontFamily: string;
  color: string,
  WebkitTextStroke: string; 
};

export const musicMap = {
  "rock": {
    backgroundImage: rockFestival,
    fontFamily: "Honk, system-ui",
    color: "hotpink",
    WebkitTextStroke: "gold",
  },
  "metal": {
    backgroundImage: metalFestival,
    fontFamily: "Metal Mania, system-ui",
    color: "crimson",
    WebkitTextStroke: "black"
  },
  "country": {
    backgroundImage: countryFestival,
    fontFamily: "Ewert, serif",
    color: "silver",
    WebkitTextStroke: "gold"
  },
  "grunge": {
    backgroundImage: grungeFestival,
    fontFamily: "Special Elite, system-ui",
    color: "#886f0aff",
    WebkitTextStroke: "black"
  },
  "pop": {
    backgroundImage: popFestival,
    fontFamily: "Fredoka, sans-serif",
    color: "#FF69B4",
    WebkitTextStroke: "aqua"
  },
  "alternative": {
    backgroundImage: altFestival,
    fontFamily: "Staatliches, sans-serif",
    color: "teal",
    WebkitTextStroke: "black"
  },
  "gospel": {
    backgroundImage: gospelFestival,
    fontFamily: "Cinzel Decorative, serif",
    color: "white",
    WebkitTextStroke: "white"
  },
  "latin": {
    backgroundImage: latinFestival,
    fontFamily: "Lobster, sans-serif",
    color: "white",
    WebkitTextStroke: "black"
  },
  "punk": {
    backgroundImage: punkFestival,
    fontFamily: "Rock Salt, cursive",
    color: "white",
    WebkitTextStroke: "black"
  }
} satisfies Record<musicGenres, bandStyles>