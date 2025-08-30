import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import "./CreateAccount.css";
import managerBackground from "../../assets/ManagerCreate.png";
import { albumCoverMap, groupPhotoMap, musicProfileMap } from "../../utils/BandGenres";
import type { musicGenres } from "../../utils/BandGenres";
type UIType = "normal" | "band" | "manager";

export default function CreateAccount() {

  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nameOfTheBand, setNameOfTheBand] = useState<string>("");
  const [whatIsShown, setWhatIsShown] = useState<UIType>("normal");
  const [genre, setGenre] = useState<musicGenres>("rock");
  const [isUserShowing, setIsUserShowing] = useState(true);
  const [origin, setOrigin] = useState("");
  const [mostPlayedSong, setMostPlayedSong] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [newBandSongs, setNewBandSongs] = useState<string[]>([]);
  const [pendingSong, setPendingSong] = useState("");
  const [newBand, setNewBand] = useState(false)
  const [bandSocial, setBandSocial] = useState("");
  const [wherePlayed, setWherePlayed] = useState("");
  const [whenPlayed, setWhenPlayed] = useState("");
  const [howItWent, setHowItWent] = useState("");
  const [numPeople, setNumPeople] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [chartNum, setChartNum] = useState("");
  const [revenue, setRevenue] = useState("");
  const [pitch, setPitch] = useState("");
  const [whyWe, setWhyWe] = useState("");

  const [nameOfInformationArea, setNameOfInformationArea] = useState("RequiredInformationArea SwipeZone");
  const showBand = () => setWhatIsShown("band");
  const showManager = () => setWhatIsShown("manager");
  const showNormal = () => setWhatIsShown("normal");
  const genreKey = (genre?.toLowerCase().trim() as musicGenres) || "rock";

  const showVenueEntries = () => {
    setIsUserShowing(false);
  }

  const showAccountEntries = () => {
    setIsUserShowing(true);
  }

  const entryViewHandler = useSwipeable({
    onSwipedRight: () => {
      showVenueEntries();
    },
    onSwipedLeft: () => {
      showAccountEntries();
    },
    delta: 50,
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  function addSong() {
    const s = pendingSong.trim();
    if (!s) return;
    setNewBandSongs(prev => [s, ...prev]);
    setPendingSong("");
  }

  function deleteSong() {
    setNewBandSongs(prev => (prev.length ? prev.slice(1) : prev));
  }

  return (
    <div
      className="AccountCreationPage"
      style={{
        backgroundImage: `url(${whatIsShown === "band" ? musicProfileMap[genreKey].backgroundImage : managerBackground})`,
      }}
    >
      {whatIsShown === "normal" && (
        <div className="OpeningHeader">
          <h1 className="NameOfBrand">Encore</h1>
          <p className="OpeningLine">Bands, meet your newest tour manager. Managers, meet your newest roster HQ: Encore.</p>
          <p className="GuidanceText">Over at Casella LLC, we like to do things different. Click on either manager or band to get straight into business!</p>
          <div className="RadioGroup">
            <label>
              <input
                type="radio"
                name="role"
                value="manager"
                onChange={showManager}
              />
              Manager
            </label>

            <label>
              <input
                type="radio"
                name="role"
                value="band"
                onChange={showBand}
              />
              Band
            </label>
          </div>
        </div>
      )}

      {whatIsShown === "band" && (
        <form className="BandView">
          <div className="BandView">
            <div className="FillableTitleArea">
              <select className="GenreSelector" value={genre} onChange={(e) => setGenre(e.target.value as musicGenres)}>
                <option value="rock">rock</option>
                <option value="punk">punk</option>
                <option value="pop">pop</option>
                <option value="grunge">grunge</option>
                <option value="metal">metal</option>
                <option value="country">country</option>
                <option value="alternative">alternative</option>
                <option value="gospel">gospel</option>
                <option value="latin">latin</option>
              </select>
              <h1 className="NameOfBrandTitle">Encore</h1>
              <div className="BackClick" onClick={showNormal} style={{ cursor: "pointer" }}>← Back</div>
            </div>
            <div className="LayoutChangeArea">
              <p className="UsefulTidBit">If you don't have any albums or past performances, no worries! Click here to change the layout.</p>
              <input type="checkbox" className="NewBandCheckbox" onChange={(e) => setNewBand(e.target.checked)} />
            </div>
            <input type="text" placeholder="Username" required></input>
             <input type="password" placeholder="Password" required></input>
            <div
              className={`fillOutableBandProfile genre-${genreKey}`}
              style={{
                fontFamily: musicProfileMap[genreKey].fontFamily,
                color: musicProfileMap[genreKey].color,
              }}
            >
              <div className="TopOfBandArea">
                <div className="StyleDiv">
                  <input type="text" placeholder="Name of your Band" className="BandNameGoesHere" value={nameOfTheBand} onChange={(e) => setNameOfTheBand(e.currentTarget.value)} required></input>
                  <input type="text" placeholder="Where are you from?" className="OriginGoesHere" value={origin} onChange={(e) => setOrigin(e.currentTarget.value)} required></input>
                </div>
                <div className="LineOfSocials">
                  <div className="SocialInfo">
                    <div className="SocialImage"></div>
                    <input type="text" className="SocialEntry" placeholder="What's your name on Z?" value={bandSocial} onChange={(e) => setBandSocial(e.currentTarget.value)}></input>
                  </div>
                  <div className="HitSongPart">
                    <div className="SongLogo"></div>
                    <span>{mostPlayedSong}</span>
                  </div>
                </div>
              </div>

              <div className="MiddleOfTheProfile">
                {newBand && (
                  <div className="EarlyBandSection">
                    <div className="SongLand">
                      <h1 className="SongsSoFarTitle">Our Songs so far:</h1>
                      <div className="Column">
                        <input type="text" placeholder="Enter a song here!" className="SongEntry" value={pendingSong} onChange={(e) => setPendingSong(e.currentTarget.value)}></input>
                        <div className="ButtonRow">
                          <button type="button" className="SongBtn" onClick={addSong}>Add Song</button>
                          {newBandSongs.length > 0 && (
                            <button type="button" className="SongBtn" onClick={deleteSong}>Delete Song</button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="DescriptionLand">
                      <h1 className="AboutUsLand">A little about us</h1>
                      <input type="text" placeholder="Tell us about your band!" className="AboutEntry" value={aboutUs} onChange={(e) => setAboutUs(e.currentTarget.value)} required></input>
                    </div>
                  </div>
                )}
                {!newBand && (
                  <div className="ReturningLand">
                    <div className="DescriptionOfWe">
                      {aboutUs}
                    </div>
                    <div className="Glue">
                      <div className="PerformancesLand">
                        <h1 className="PerformanceTidBit">Any past gigs? You can enter them here!</h1>
                        <div className="PerformanceAddition">
                          <div className="PictureOfTour"></div>
                          <div className="PerformanceInformationLand">
                            <input type="text" placeholder="Where did you play?" value={wherePlayed} onChange={(e) => setWherePlayed(e.currentTarget.value)}></input>
                            <input type="text" placeholder="When did you play?" value={whenPlayed} onChange={(e) => setWhenPlayed(e.currentTarget.value)}></input>
                            <input type="text" placeholder="How'd it go?" value={howItWent} onChange={(e) => setHowItWent(e.currentTarget.value)}></input>
                            <input type="number" inputMode="numeric" placeholder="Number of People there?" className="EntryPeople" value={numPeople} onChange={(e) => setNumPeople(e.currentTarget.value)}></input>
                          </div>
                        </div>
                      </div>
                      <div className="AlbumLand">
                        <h1 className="AlbumTidBit">If you have any albums, you can enter them here!</h1>
                        <div className="AlbumsLand">
                          <div className="AlbumCoverImage" style={{
                            backgroundImage: `url(${albumCoverMap[genreKey].backgroundImage})`,
                          }}>
                            <input className="AlbumEntryInfo" type="text" placeholder="Album Name?" value={albumName} onChange={(e) => setAlbumName(e.currentTarget.value)}></input>
                          </div>
                          <div className="AlbumInformationLand">
                            <input type="number" inputMode="numeric" placeholder="Chart Ranking?" className="ChartEntryInfo" value={chartNum} onChange={(e) => setChartNum(e.currentTarget.value)}></input>
                            <input type="number" inputMode="numeric" placeholder="Revenue Generated?" className="MoneyEntryInfo" value={revenue} onChange={(e) => setRevenue(e.currentTarget.value)}></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {newBand && (
                  <div className="NewUserBottom">
                    <div className="FutureGoalsLand">
                      <div className="PhotoOfTheGroup" style={{
                        backgroundImage: `url(${groupPhotoMap[genreKey].backgroundImage})`,
                      }}></div>
                      <div className="DescriptorAreaLand">
                        <h1 className="GoalsOfWe">Our Goals</h1>
                        <div className="Column">
                          <input type="text" placeholder="What are your goals?" className="GoalsOfEntry" value={pitch} onChange={(e) => setPitch(e.currentTarget.value)}></input>
                          <input type="text" placeholder="Give us your elevator pitch" className="GoalsOfEntryTwo" value={whyWe} onChange={(e) => setWhyWe(e.currentTarget.value)}></input>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <input type="submit" className="BandSubmit"></input>
              </div>
            </div>
          </div>
        </form>
      )}

      {
        whatIsShown === "manager" && (
          <form>
            <div className="ManagerArea">
              <div className="ManagerHeader">
                <h1 className="ManagerNameOfBrand">Encore VIP</h1>
                <div className="BackBtn" onClick={showNormal} style={{ cursor: "pointer" }}>← Back</div>
              </div>
              <div className="ManagerHeader">
                <h2 className="ManagerInfo">Managers, you now have the opportunity to enter in all venue information for the shows you want to have filled!</h2>
              </div>
              <h4 className="TidBit">Don't worry if you don't get to it - you'll have the opportunity to update them through our Management Dashboard.</h4>
              <h5>Swipe left to add your venue information. Swipe right to go back to the username view.</h5>
              <div className={nameOfInformationArea} {...entryViewHandler}>
                {isUserShowing && (
                  <div className="AccountView">
                    <input className="ManagerName" type="text" placeholder="Your username goes here" required></input>
                    <input className="ManagerPass" type="password" placeholder="Your password goes here" required></input>
                  </div>
                )}
                {!isUserShowing && (
                  <div className="VenueView">
                    <input className="VenueEntry" type="text" placeholder="What type of event is it?"></input>
                    <input className="VenueEntry" type="text" placeholder="Where is the venue?"></input>
                    <input className="VenueEntry" type="text" placeholder="What timeslot is it for?"></input>
                    <input className="VenueEntry" type="text" placeholder="What date is it for?"></input>
                    <input className="VenueEntry" type="text" placeholder="What's the band's fee for the gig?"></input>
                  </div>
                )}
                <input type="submit" className="ManagerSubmit"></input>
              </div>
            </div>
          </form>
        )
      }
    </div >
  );
}
