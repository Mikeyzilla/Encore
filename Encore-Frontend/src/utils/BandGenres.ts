import metalFestival from "../assets/MetalFestival.png";
import popFestival from "../assets/NightFireworksFestival.png"
import countryFestival from "../assets/CountryFestival.png";
import rockFestival from "../assets/RockFestival.png"
import grungeFestival from "../assets/GrungeFestival.png"
import altFestival from "../assets/AlternativeFestival.png"
import gospelFestival from "../assets/GospelFestival.png"
import latinFestival from "../assets/LatinFestival.png"
import punkFestival from "../assets/PunkFestival.png"
import rockProfile from "../assets/RockProfile.png"
import metalProfile from "../assets/MetalProfile.png"
import countryProfile from "../assets/CountryProfile.png"
import grungeProfile from "../assets/GrungeProfile.png"
import popProfile from "../assets/PopProfile.png"
import altProfile from "../assets/AlternativeProfile.png"
import gospelProfile from "../assets/GospelProfile.png"
import latinProfile from "../assets/LatinProfile.png"
import punkProfile from "../assets/PunkProfile.png"
import rockPhoto from "../assets/80sRockGroup.png"
import metalPhoto from "../assets/GroupPhoto-Metal.png"
import countryPhoto from "../assets/CountryPhoto.png"
import grungePhoto from "../assets/GrungePhoto.png"
import popPhoto from "../assets/PopPhoto.png"
import altPhoto from "../assets/AlternativePhoto.png"
import gospelPhoto from "../assets/GospelPhoto.png"
import latinPhoto from "../assets/LatinPhoto.png"
import punkPhoto from "../assets/PunkPhoto.png"

export const Music_Genres = [
  "Rock", "Metal", "Country", "Grunge", "Pop", "Alternative", "Gospel", "Latin", "Punk"
];

export type musicGenres = "rock" | "metal" | "country" | "grunge" | "pop" | "alternative" | "gospel" | "latin" | "punk"

export const albumCoverMap = {
    "rock": {
      backgroundImage: rockFestival
    },
    "metal": {
      backgroundImage: metalFestival
    },
    "country": {
      backgroundImage: countryFestival
    }
}


export type Band = {
  id: number;
  bandName: string;
  origin: string;
  mostPlayedSong: string;
  genreOfMusic: string;
  aboutUs: string;
};

export type Song = {
  id?: number;
  song_name: string;
};

export type Album = {
  songs?: string[];
  album_name: string;
  chart_ranking?: number | null;
  revenue_generated: number;
};

export type PastEvents = {
  date: string;
  description: string;
  venue_name: string;
  guest_count: number;
};

type BaseProfileInfo = {
  bandName: string;
  origin: string;
  mostPlayedSong: string;
  genreOfMusic: string;
  aboutUs: string;
  mostRecentPerformance?: PastEvents;
  latestAlbum?: Album;
};

export type NewProfileInfo = BaseProfileInfo & {
  profileType: "new";
  elevatorPitch: string;
  whyChooseUs: string;
  newBandSongs?: string[];   
};

export type ExperiencedProfileInfo = BaseProfileInfo & {
  profileType: "experienced";
};

export type ProfileInformation = NewProfileInfo | ExperiencedProfileInfo;


export type bandStyles = {
  backgroundImage: string;
  fontFamily: string;
  color: string,
  WebkitTextStroke: string;
};

export const groupPhotoMap = {
 "rock": {
  backgroundImage: rockPhoto
 },
 "metal": {
  backgroundImage: metalPhoto
 },
 "country": {
  backgroundImage: countryPhoto
 },
 "grunge": {
  backgroundImage: grungePhoto
 },
 "pop": {
  backgroundImage: popPhoto
 },
 "alternative": {
  backgroundImage: altPhoto
 },
 "gospel": {
  backgroundImage: gospelPhoto
 },
 "latin": {
  backgroundImage: latinPhoto
 },
 "punk": {
  backgroundImage: punkPhoto
 }
}

export const musicProfileMap = {
  "rock": {
    backgroundImage: rockProfile,
    fontFamily: "Honk, system-ui",
    color: "hotpink",
    WebkitTextStroke: "gold",
  },
  "metal": {
    backgroundImage: metalProfile,
    fontFamily: "Metal Mania, system-ui",
    color: "red",
    WebkitTextStroke: "white"
  },
  "country": {
    backgroundImage: countryProfile,
    fontFamily: "Ewert, serif",
    color: "gold",
    WebkitTextStroke: "silver"
  },
  "grunge": {
    backgroundImage: grungeProfile,
    fontFamily: "Special Elite, system-ui",
    color: "yellow",
    WebkitTextStroke: "black"
  },
  "pop": {
    backgroundImage: popProfile,
    fontFamily: "Fredoka, sans-serif",
    color: "white",
    WebkitTextStroke: "aqua"
  },
  "alternative": {
    backgroundImage: altProfile,
    fontFamily: "Staatliches, sans-serif",
    color: "white",
    WebkitTextStroke: "black"
  },
  "gospel": {
    backgroundImage: gospelProfile,
    fontFamily: "Cinzel Decorative, serif",
    color: "white",
    WebkitTextStroke: "white"
  },
  "latin": {
    backgroundImage: latinProfile,
    fontFamily: "Lobster, sans-serif",
    color: "white",
    WebkitTextStroke: "black"
  },
  "punk": {
    backgroundImage: punkProfile,
    fontFamily: "Rock Salt, cursive",
    color: "hotpink",
    WebkitTextStroke: "hotpink"
  }
} satisfies Record<musicGenres, bandStyles>


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

export const defaultBand = {
  bandName: "Mockers",
  origin: "Atlantis",
  mostPlayedSong: "Ocean Blues",
  genreOfMusic: "country",
  aboutUs: "We are a test band, here only for styling.",
  newBand: true,
} as const;

type PerformanceDTO = {
  date: string | null;
  description: string | null;
  venueName: string | null;
  guestCount: number | null;
};
type AlbumDTO = {
  albumName: string | null;
  chartRanking: number | null;
  revenueGenerated: number | null;
};
export type ProfileDTO = {
  bandName: string;
  origin: string;
  mostPlayedSong: string;
  genreOfMusic: string;
  aboutUs: string;
  elevatorPitch?: string | null;
  whyChooseUs?: string | null;
  songs: string[];
  performances: PerformanceDTO[];
  albums: AlbumDTO[];
  profileType: "new" | "experienced";
};