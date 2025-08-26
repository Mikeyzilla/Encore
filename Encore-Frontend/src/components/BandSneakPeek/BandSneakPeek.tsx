import type { Band, musicGenres } from "../../utils/BandGenres";
import "./BandSneakPeek.css"
import metalFestival from "../../assets/MetalFestival.png";
import popFestival from "../../assets/NightFireworksFestival.png"
import countryFestival from "../../assets/CountryFestival.png";
import rockFestival from "../../assets/RockFestival.png"
import grungeFestival from "../../assets/GrungeFestival.png"
import altFestival from "../../assets/AlternativeFestival.png"
import gospelFestival from "../../assets/GospelFestival.png"
import latinFestival from "../../assets/LatinFestival.png"
import punkFestival from "../../assets/PunkFestival.png"

type BandInformation = Omit<Band, "id"> & {
  onClick?: () => void;
};

type bandStyles = {
  backgroundImage: string;
  fontFamily: string;
  color: string,
  WebkitTextStroke: string; 
};

const musicMap = {
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

export default function BandSneakPeek({ onClick, bandName, origin, mostPlayedSong, genreOfMusic }: BandInformation) {
  let musicType = genreOfMusic.toLowerCase().trim();
  const genreKey = musicType as musicGenres;

  return (
    <div className="BandTicket" style={{
      backgroundImage: `url(${musicMap[genreKey].backgroundImage})`,
      fontFamily: musicMap[genreKey].fontFamily,
      color: musicMap[genreKey].color,
      WebkitTextStroke: musicMap[genreKey].WebkitTextStroke
    }}>
      <div className="BandCard" onClick={onClick}>
        <h1 className="nameOfBand">{bandName}</h1>
        <div className="bandOriginations">{origin}</div>
        <div className="BottomOfTicket">
          <div className="SocialProfilesArea">
            <label className="SocialHandleName">Gooze</label>
            <div className="SocialHandle"></div>
          </div>
          <div className="famousSong">{mostPlayedSong}</div>
        </div>
      </div>
      <div className="Lanyard-Hole">
        <div className="Lanyard"></div>
      </div>
    </div>
  );
}