import { useNavigate } from "react-router-dom";
import "./GenrePage.css";
import { centralizeURL } from "../../utils/centralizeURL";
import { Music_Genres } from "../../utils/BandGenres";

export default function GenrePage() {

  const navigate = useNavigate();

  return (
    <div className="GenrePage">
      <div className="BrandTitle">Encore</div>
      <div className="GenreGrid">
        {Music_Genres.map((genre) => (
          <div
            key={genre}
            className={`genre ${genre.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={() => navigate(`/${centralizeURL(genre)}`)}
          >
            <span>{genre}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

