import { Navigate, useParams } from "react-router-dom";
import { centralizeURL } from "../../utils/centralizeURL";
import { Music_Genres } from "../../utils/BandGenres";
import BandSneakPeek from "../BandSneakPeek/BandSneakPeek";

export default function BandList() {

  return (
    <div className="BandGrid">
        <BandSneakPeek></BandSneakPeek>
    </div>
  );
}
