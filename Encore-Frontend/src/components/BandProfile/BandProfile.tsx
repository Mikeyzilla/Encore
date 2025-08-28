import { musicProfileMap, type musicGenres, type ProfileInformation } from "../../utils/BandGenres"
import "./BandProfile.css"


export default function BandProfile({ bandName, origin, mostPlayedSong, genreOfMusic, mostRecentPerformance, aboutUs, latestAlbum, newBand }: ProfileInformation) {
    const genreKey = (genreOfMusic?.toLowerCase().trim() || "latin") as musicGenres;
    return (
        <div
            className="bandProfile"
            style={{
                backgroundImage: `url(${musicProfileMap[genreKey].backgroundImage})`,
                fontFamily: musicProfileMap[genreKey].fontFamily,
                color: musicProfileMap[genreKey].color,
                WebkitTextStroke: musicProfileMap[genreKey].WebkitTextStroke
            }}
        >
            <div className="bandHeader">
                <h1>{bandName}</h1>
                <p className="Origin">{origin}</p>
                <div className="SocialsLine">
                    <div className="Social">
                        <div className="SocialLogo"></div>
                        <span>Social Media Brand</span>
                    </div>
                    <div className="Social">
                        <div className="SocialLogo"></div>
                        <span>Social Media Brand</span>
                    </div>
                    <div className="HitSongArea">
                        <div className="PlayableSongLogo"></div>
                        <span>{mostPlayedSong}</span>
                    </div>
                </div>
            </div>

            <div className="MiddleProfile">
                {newBand && (
                    <div className="NewUserMiddleSections">
                        <div className="SongsSection">
                            <h1>Our Songs so far:</h1>
                            <p className="MostFamous">{mostPlayedSong}</p>
                            <p className="MostFamous">{mostPlayedSong}</p>
                        </div>
                        <div className="DescriptionSection">
                            <h1>A little about us</h1>
                            <span className="AboutContent">{aboutUs}</span>
                        </div>
                    </div>
                )}
                {!newBand && (
                    <div className="ExperiencedMiddleSection">
                        <div className="DescriptionArea">
                            {aboutUs}
                        </div>
                        <div className="Wrapper">
                            <div className="PerformancesSection">
                                <div className="PerformanceEntry">
                                    <div className="TourPicture"></div>
                                    <div className="PerformanceInformation">
                                        <p>We played at {mostRecentPerformance?.venue_name} on {mostRecentPerformance?.date}</p>
                                        <p className="TourDescription">{mostRecentPerformance?.description} and {mostRecentPerformance?.guest_count} people showed up.</p>
                                    </div>
                                </div>
                                <div className="PerformanceEntry">
                                    <div className="TourPicture"></div>
                                    <div className="PerformanceInformation">
                                        <p>We played at {mostRecentPerformance?.venue_name} on {mostRecentPerformance?.date}</p>
                                        <p className="TourDescription">{mostRecentPerformance?.description} and {mostRecentPerformance?.guest_count} people showed up.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="AlbumsSection">
                                <div className="AlbumArt">
                                    {latestAlbum?.album_name}
                                </div>
                                <div className="AlbumInformation">
                                    <p>Ranked {latestAlbum?.chart_ranking} on the charts</p>
                                    <p>Generated {latestAlbum?.revenue_generated} dollars.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {newBand && (
                    <div className="NewUserFooter">
                        <div className="FutureGoalsSection">
                            <div className="GroupPhoto"></div>
                            <div className="DescriptorArea">
                                <h1 className="GoalsTitle">Our Goals</h1>
                                <p className="ElevatorPitch">We are amazing</p>
                                <p className="WhyChooseUs">We could really use the help</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}