import { useNavigate } from "react-router-dom";
import { groupPhotoMap, musicProfileMap, numberToMonthMap, type ExperiencedProfileInfo, type musicGenres, type NewProfileInfo, type ProfileInformation } from "../../utils/BandGenres"
import "./BandProfile.css"


export default function BandProfile(props: ProfileInformation) {
    const { bandName, origin, mostPlayedSong, genreOfMusic, aboutUs } = props;
    const genreKey = ((genreOfMusic ?? "latin").toLowerCase().trim()) as musicGenres;
    const isNew = props.profileType === "new";
    const newInfo = props as NewProfileInfo;
    const expInfo = props as ExperiencedProfileInfo;
    const navigate = useNavigate();
    const dateMakeNeat = (date: string) => {
        let YearMonthDayFormat = date.slice(0, 10);
        let YearMonthDayArray = YearMonthDayFormat.split("-");
        let year = YearMonthDayArray[0];
        let month = numberToMonthMap[parseInt(YearMonthDayArray[1], 10)];
        let day = String(parseInt(YearMonthDayArray[2], 10));
        let dayNum = parseInt(day, 10);

        if (dayNum === 11 || dayNum === 12 || dayNum === 13) {
            day = dayNum.toString() + "th";
        } else {
            let lastDigit = dayNum % 10;
            if (lastDigit === 1) {
                day = dayNum.toString() + "st";
            } else if (lastDigit === 2) {
                day = dayNum.toString() + "nd";
            } else if (lastDigit === 3) {
                day = dayNum.toString() + "rd";
            } else {
                day = dayNum.toString() + "th";
            }
        }
        return " " + month + " " + day + ", " + year;
    }

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
                {sessionStorage.getItem("role") === "Band" && (
                    <button onClick={() => navigate("/calendar")} className="GoToCalendar"></button>
                )};
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
                        <div>{mostPlayedSong}</div>
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
                                        <li key={`song ${title}-${idx}`}>{title}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="SongEmpty">We’re cooking up our first tracks—stay tuned!</p>
                            )}
                        </div>
                        <div className="DescriptionSection">
                            <h1>A little about us</h1>
                            <div className="AboutContent">{aboutUs}</div>
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
                                {expInfo.performances?.length ? (
                                    [...expInfo.performances]
                                        .map((perf, idx) => (
                                            <div className="PerformanceEntry" key={`${perf.venue_name}-${perf.date}-${idx}`}>
                                                <div className="TourPicture"></div>
                                                <div className="PerformanceInformation">
                                                    <p>We played at {perf.venue_name} on {dateMakeNeat(perf.date)}</p>
                                                    <p className="TourDescription">
                                                        {perf.description} and {perf.guest_count} people showed up.
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                ) : (
                                    <p className="TourEmpty">No performances listed yet.</p>
                                )}
                            </div>
                        </div>
                        <div className={`AlbumsSection ${genreKey}-rock`}>
                            <div className="AlbumArt">
                                {expInfo.latestAlbum?.album_name}
                            </div>
                            <div className="AlbumInformation">
                                <p>Chart Ranking: {expInfo.latestAlbum?.chart_ranking}</p>
                                <p>Generated a total of {expInfo.latestAlbum?.revenue_generated} dollars.</p>
                            </div>
                        </div>
                    </div>
                )}
            {isNew && (
                <div className="NewUserFooter">
                    <div className="FutureGoalsSection">
                        <div className="GroupPhoto" style={{ backgroundImage: `url(${groupPhotoMap[genreKey].backgroundImage})` }}></div>
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