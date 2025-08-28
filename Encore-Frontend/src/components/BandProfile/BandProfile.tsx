import { musicProfileMap, type ExperiencedProfileInfo, type musicGenres, type NewProfileInfo, type ProfileInformation } from "../../utils/BandGenres"
import "./BandProfile.css"


export default function BandProfile(props: ProfileInformation) {
    const { bandName, origin, mostPlayedSong, genreOfMusic, aboutUs } = props;
    const genreKey = ((genreOfMusic ?? "latin").toLowerCase().trim()) as musicGenres;
    const isNew = props.profileType === "new";
    const newInfo = props as NewProfileInfo;
    const expInfo = props as ExperiencedProfileInfo;

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
                {isNew && (
                    <div className="NewUserMiddleSections">
                        <div className="SongsSection">
                            <h1>Our Songs so far:</h1>
                            {newInfo.newBandSongs?.length ? (
                                <ul className="SongList">
                                    {newInfo.newBandSongs.map((title, idx) => (
                                        <li key={`${title}-${idx}`}>{title}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="SongEmpty">We’re cooking up our first tracks—stay tuned!</p>
                            )}
                        </div>
                        <div className="DescriptionSection">
                            <h1>A little about us</h1>
                            <span className="AboutContent">{aboutUs}</span>
                        </div>
                    </div>
                )}
                {!isNew && (
                    <div className="ExperiencedMiddleSection">
                        <div className="DescriptionArea">
                            {aboutUs}
                        </div>
                        <div className="Wrapper">
                            <div className="PerformancesSection">
                                <div className="PerformanceEntry">
                                    <div className="TourPicture"></div>
                                    <div className="PerformanceInformation">
                                        <p>We played at {expInfo.mostRecentPerformance?.venue_name} on {expInfo.mostRecentPerformance?.date}</p>
                                        <p className="TourDescription">{expInfo.mostRecentPerformance?.description} and {expInfo.mostRecentPerformance?.guest_count} people showed up.</p>
                                    </div>
                                </div>
                                <div className="PerformanceEntry">
                                    <div className="TourPicture"></div>
                                    <div className="PerformanceInformation">
                                        <p>We played at {expInfo.mostRecentPerformance?.venue_name} on {expInfo.mostRecentPerformance?.date}</p>
                                        <p className="TourDescription">{expInfo.mostRecentPerformance?.description} and {expInfo.mostRecentPerformance?.guest_count} people showed up.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="AlbumsSection">
                                <div className="AlbumArt">
                                    {expInfo.latestAlbum?.album_name}
                                </div>
                                <div className="AlbumInformation">
                                    <p>Ranked {expInfo.latestAlbum?.chart_ranking} on the charts</p>
                                    <p>Generated {expInfo.latestAlbum?.revenue_generated} dollars.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {isNew && (
                    <div className="NewUserFooter">
                        <div className="FutureGoalsSection">
                            <div className="GroupPhoto"></div>
                            <div className="DescriptorArea">
                                <h1 className="GoalsTitle">Our Goals</h1>
                                <p className="ElevatorPitch">{newInfo.elevatorPitch}</p>
                                <p className="WhyChooseUs">{newInfo.whyChooseUs}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}