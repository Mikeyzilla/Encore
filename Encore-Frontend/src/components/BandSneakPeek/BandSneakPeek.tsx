import type { Band } from "../../utils/BandGenres";
import "./BandSneakPeek.css"

type BandInformation = Omit<Band, "id" | "genreOfMusic">;

export default function BandSneakPeek({ bandName, origin, mostPlayedSong }: BandInformation) {


  return (
    <div className="BandTicket">
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