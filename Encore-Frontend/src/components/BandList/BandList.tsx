import { Navigate, useParams } from "react-router-dom";
import BandSneakPeek from "../BandSneakPeek/BandSneakPeek";
import { useState, useEffect } from "react";
import axios from "axios";
import type { Band } from "../../utils/BandGenres";

export default function BandList() {
  const [bands, setBands] = useState<Band[]>([]);


  const { genre } = useParams();

  const retrieveBandsByGenre = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/bands/${genre}`);
      setBands(response.data);
    } catch (err) {
      console.log("Error retreiving bands: ", err)
    }
  }

  useEffect(() => {
    retrieveBandsByGenre();
  }, [genre]);

  return (
    <div className="BandGrid">
      {bands.length > 0 && (
        bands.map((band) => {
          return <BandSneakPeek key={band.id} bandName={band.bandName} genreOfMusic={band.genreOfMusic} origin={band.origin} mostPlayedSong={band.mostPlayedSong}></BandSneakPeek>
        })
      )}
    </div>
  );
}
