import type { Band } from "../../utils/BandGenres";
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

type BandInformation = Omit<Band, "id">;

export default function BandSneakPeek({ bandName, origin, mostPlayedSong, genreOfMusic }: BandInformation) {
  let musicType = genreOfMusic.toLowerCase().trim();

  return (
    <div className="BandTicket" style={{
      backgroundImage: `url(${musicType === "pop" ? popFestival
          : musicType === "country" ? countryFestival 
          : musicType === "rock" ? rockFestival 
          : musicType === "grunge" ? grungeFestival
          : musicType === "pop" ? popFestival
          : musicType === "alternative" ? altFestival
          : musicType === "gospel" ? gospelFestival
          : musicType === "latin" ? latinFestival
          : musicType === "punk" ? punkFestival
          : metalFestival
        })`
    }}>
      <div className="BandCard">
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