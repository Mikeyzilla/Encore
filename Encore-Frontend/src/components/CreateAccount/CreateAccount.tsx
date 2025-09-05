import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import "./CreateAccount.css";
import managerBackground from "../../assets/ManagerCreate.png";
import { albumCoverMap, groupPhotoMap, musicProfileMap } from "../../utils/BandGenres";
import type { musicGenres } from "../../utils/BandGenres";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { centralizeURL } from "../../utils/centralizeURL";
type UIType = "normal" | "band" | "manager";
export type MusicEvent = "Concert" | "Music Festival" | "Gig"

export default function CreateAccount() {

  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nameOfTheBand, setNameOfTheBand] = useState<string>("");
  const [whatIsShown, setWhatIsShown] = useState<UIType>("normal");
  const [genre, setGenre] = useState<musicGenres>("rock");
  const [isUserShowing, setIsUserShowing] = useState(true);
  const [origin, setOrigin] = useState("");
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
  const [eventType, setEventType] = useState<MusicEvent>("Concert");
  const [whereIsIt, setWhereIsIt] = useState("");
  const [whatDate, setWhatDate] = useState("");
  const [mostFamous, setMostFamous] = useState("");
  const [bandFee, setBandFee] = useState("");
  const [whatTime, setWhatTime] = useState("");
  const [roleType, setRoleType] = useState("");
  const [nameOfInformationArea, setNameOfInformationArea] = useState("RequiredInformationArea SwipeZone");
  const navigate = useNavigate();

  const showBand = () => {
    setRoleType("band");
    setWhatIsShown("band");
  }

  const showManager = () => {
    setRoleType("manager");
    setWhatIsShown("manager");
  }
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

  const createThatAccount = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const role = roleType === "band" ? "Band" : roleType === "manager" ? "Manager" : "";
    try {
      const minimumRequiredInfo = {
        username: username.trim(),
        password: password,
        role
      };

      const bandRequiredInfo = {
        nameOfTheBand: nameOfTheBand.trim(),
        aboutUs: aboutUs.trim(),
        genre: (genre || "rock").trim(),
        mostPlayedSong: mostFamous.trim(),
        origin: origin.trim(),
      };

      const bandOptionalInfo = {
        pitch: pitch.trim(),
        whyWe: whyWe.trim(),
        newBandSongs,
        wherePlayed: wherePlayed.trim(),
        whenPlayed: whenPlayed.trim(),
        howItWent: howItWent.trim(),
        numPeople: numPeople ? Number(numPeople) : undefined,
        albumName: albumName.trim(),
        chartNum: chartNum ? Number(chartNum) : undefined,
        revenue: revenue ? Number(revenue) : undefined
      }

      const managerOptionalInfo = {
        eventType,
        venueLocation: whereIsIt.trim(),
        timeSlot: whatTime.trim(),
        date: whatDate.trim(),
        bandFee: bandFee ? Number(bandFee) : undefined,
      }

      if (roleType === "band") {
        const response = await axios.post(`http://localhost:8080/api/users/createAnAccount`,
          {
            ...minimumRequiredInfo, ...bandRequiredInfo, ...bandOptionalInfo
          }
        )
        if (response.data) {
          sessionStorage.setItem("bandId", String(response.data.bandId));
          sessionStorage.setItem("userIdentifier", response.data.userId);
          navigate(`/${encodeURIComponent(centralizeURL(genre))}/${encodeURIComponent(centralizeURL(nameOfTheBand))}`);
        }
      } else {
        const response = await axios.post(`http://localhost:8080/api/users/createAnAccount`,
          {
            ...minimumRequiredInfo, ...managerOptionalInfo
          }
        )
        if (response.data) {
          sessionStorage.setItem("userIdentifier", response.data.userId);
          sessionStorage.setItem("JWT", response.data.token);
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.error("error with account creation: ", err);
    }
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
          <div className="TitleAndLogin">
            <div className="EmptySpace"></div>
            <h1 className="NameOfBrand">Encore</h1>
            <button onClick={() => navigate("/login")} className="LoginButton">LOGIN</button>
          </div>
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
        <form className="BandView" onSubmit={createThatAccount}>
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
            <div className="RequiredEntries">
              <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Username" style={{ fontFamily: musicProfileMap[genreKey].fontFamily, color: musicProfileMap[genreKey].color }}></input>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ fontFamily: musicProfileMap[genreKey].fontFamily, color: musicProfileMap[genreKey].color }}></input>
            </div>
            <div
              className={`fillOutableBandProfile genre-${genreKey}`}
              style={{
                fontFamily: musicProfileMap[genreKey].fontFamily,
                color: musicProfileMap[genreKey].color,
              }}
            >
              <div className="TopOfBandArea">
                <div className="StyleDiv">
                  <input type="text" placeholder="Your Band Name" className="BandNameGoesHere" value={nameOfTheBand} onChange={(e) => setNameOfTheBand(e.currentTarget.value)} required></input>
                  <input type="text" placeholder="Where are you from?" className="OriginGoesHere" value={origin} onChange={(e) => setOrigin(e.currentTarget.value)} required></input>
                  <input type="text" placeholder="Tell us about your band!" className="AboutEntry" value={aboutUs} onChange={(e) => setAboutUs(e.currentTarget.value)} required></input>
                </div>
                <div className="LineOfSocials">
                  <div className="SocialInfo">
                    <div className="SocialImage"></div>
                    <input type="text" className="SocialEntry" placeholder="Z name?" value={bandSocial} onChange={(e) => setBandSocial(e.currentTarget.value)}></input>
                  </div>
                  <div className="HitSongPart">
                    <div className="SongLogo"></div>
                    <input type="text" placeholder="What's your most played song?" value={mostFamous} onChange={(e) => setMostFamous(e.currentTarget.value)} required className="MostEntry"></input>
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
                      <h1 className="AboutUsLand">Fun Facts</h1>
                      <input type="text" placeholder="A fun fact about your band" className="FunFact" />
                    </div>
                  </div>
                )}
                {!newBand && (
                  <div className="ReturningLand">
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
          <form onSubmit={createThatAccount}>
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
                    <input className="ManagerName" type="text" placeholder="Your username goes here" required value={username} onChange={(e) => setUserName(e.currentTarget.value)}></input>
                    <input className="ManagerPass" type="password" placeholder="Your password goes here" required value={password} onChange={(e) => setPassword(e.currentTarget.value)}></input>
                  </div>
                )}
                {!isUserShowing && (
                  <div className="VenueView">
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value as MusicEvent)}
                      className="EventSelector"
                    >
                      <option value="Concert">Concert</option>
                      <option value="Music Festival">Music Festival</option>
                      <option value="Gig">Gig</option>
                    </select>
                    <input className="VenueEntry" type="text" placeholder="Where is the venue?" value={whereIsIt} onChange={(e) => setWhereIsIt(e.currentTarget.value)}></input>
                    <select className="VenueEntry" value={whatTime} onChange={(e) => setWhatTime(e.currentTarget.value)}>
                      <option value="8:00AM">8:00AM</option>
                      <option value="9:00AM">9:00AM</option>
                      <option value="10:00AM">10:00AM</option>
                      <option value="11:00AM">11:00AM</option>
                      <option value="12:00AM">12:00AM</option>
                      <option value="1:00PM">1:00PM</option>
                      <option value="2:00PM">2:00PM</option>
                      <option value="3:00PM">3:00PM</option>
                      <option value="4:00PM">4:00PM</option>
                      <option value="5:00PM">5:00PM</option>
                      <option value="6:00PM">6:00PM</option>
                      <option value="7:00PM">7:00PM</option>
                      <option value="8:00PM">8:00PM</option>
                      <option value="9:00PM">9:00PM</option>
                      <option value="10:00PM">10:00PM</option>
                      <option value="11:00PM">11:00PM</option>
                      <option value="12:00PM">12:00PM</option>
                      <option value="1:00AM">1:00AM</option>
                      <option value="2:00AM">2:00AM</option>
                    </select>
                    <input className="VenueEntry" type="text" placeholder="What date is it for?" value={whatDate} onChange={(e) => setWhatDate(e.currentTarget.value)}></input>
                    <input className="VenueEntry" type="text" placeholder="What's the band's fee for the gig?" value={bandFee} onChange={(e) => setBandFee(e.currentTarget.value)}></input>
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
