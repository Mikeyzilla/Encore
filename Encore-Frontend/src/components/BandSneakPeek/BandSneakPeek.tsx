import type { Band } from "../../utils/BandGenres";
import "./BandSneakPeek.css"

type BandInformation = Omit<Band, "id">;

export default function BandSneakPeek({ bandName, genreOfMusic, origin, mostPlayedSong }: BandInformation) {


  return (
    <div className="BandCard">
      <h1>{bandName}</h1>
      <div>{genreOfMusic}</div>
      <div>{origin}</div>
      <div>{mostPlayedSong}</div>
    </div>
  );
}