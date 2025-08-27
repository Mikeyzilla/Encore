import { musicProfileMap, type musicGenres, type ProfileInformation } from "../../utils/BandGenres"
import "./BandProfile.css"


export default function BandProfile({ bandName, origin, mostPlayedSong, genreOfMusic, mostRecentPerformance, aboutUs, latestAlbum}: ProfileInformation) {
    const genreKey = (genreOfMusic?.toLowerCase().trim() || "latin") as musicGenres;
    return (
        <div
            className="bandProfile"
            style={{ backgroundImage: `url(${musicProfileMap[genreKey].backgroundImage})`, 
                  fontFamily: musicProfileMap[genreKey].fontFamily,
                  color: musicProfileMap[genreKey].color,
                  WebkitTextStroke: musicProfileMap[genreKey].WebkitTextStroke}}
        >
            <div className="bandHeader">
                <h1>{bandName}</h1>
                <p className="Origin">{origin}</p>
            </div>
            <div className="middleProfile">
                <p className="aboutTheBand">{aboutUs}</p>
                <div className="recentPerformanceArea">
                    <h4>Our Past Performances</h4>
                    <div className="recentPerformanceItem">
                        <div className="performanceHeader">
                            <p>{mostRecentPerformance.venue_name}</p>
                            <p>{mostRecentPerformance.date}</p>
                        </div>
                        <div className="performanceMiddle">
                            <p>{mostRecentPerformance.description}</p>
                            <p>{mostRecentPerformance.guest_count}</p>
                        </div>
                    </div>

                    <div className="MostPlayedSongArea">
                        <p>{mostPlayedSong}</p>
                    </div>

                </div>
            </div>

            <div className="ProfileFooter">
                <div className="AlbumInfo">
                    <p>{latestAlbum.album_name}</p>
                    <p>{latestAlbum.chart_ranking}</p>
                    <p>{latestAlbum.revenue_generated}</p>
                </div>
            </div>

        </div>
    )
}