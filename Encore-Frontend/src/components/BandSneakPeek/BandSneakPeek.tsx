import type { Band, musicGenres} from "../../utils/BandGenres";
import { musicMap } from "../../utils/BandGenres";
import "./BandSneakPeek.css"

type BandInformation = Omit<Band, "id"> & {
  onClick?: () => void;
};

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