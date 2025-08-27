import { musicProfileMap, type musicGenres, type ProfileInformation } from "../../utils/BandGenres"
import "./BandProfile.css"


export default function BandProfile({ bandName, origin, mostPlayedSong, genreOfMusic, mostRecentPerformance, aboutUs, latestAlbum }: ProfileInformation) {
    const genreKey = (genreOfMusic?.toLowerCase().trim() || "latin") as musicGenres;
    return (
        <div
            className="bandProfile"
            style={{
                fontFamily: musicProfileMap[genreKey].fontFamily,
                color: musicProfileMap[genreKey].color,
                WebkitTextStroke: musicProfileMap[genreKey].WebkitTextStroke
            }}
        >
            <div className="bandHeader">
                <h1>{bandName}</h1>
                <p className="Origin">{origin}</p>
            </div>

        </div>
    )
}