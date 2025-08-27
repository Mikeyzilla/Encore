import { musicMap, type musicGenres, type ProfileInformation } from "../../utils/BandGenres"
import "./BandProfile.css"


export default function BandProfile({ bandName, origin, mostPlayedSong, genreOfMusic, mostRecentPerformance, aboutUs, latestAlbum}: ProfileInformation) {
    const genreKey = (genreOfMusic?.toLowerCase().trim() || "rock") as musicGenres;
    return (
        <div
            className="bandProfile"
            style={{ backgroundImage: `url(${musicMap[genreKey].backgroundImage})` }}
        >
            <div className="bandHeader">
                <h1>{bandName}</h1>
                <p>{origin}</p>
            </div>
            <div className="middleProfile">
                <p>{aboutUs}</p>
                <div className="recentPerformanceArea">

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