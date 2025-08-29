import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import "./CreateAccount.css";
import bandProfileImage from "../../assets/RockProfile.png";
import managerBackground from "../../assets/ManagerCreate.png";
import { musicMap, musicProfileMap } from "../../utils/BandGenres";
import type { musicGenres } from "../../utils/BandGenres";
type UIType = "normal" | "band" | "manager";

export default function CreateAccount() {
  //have create account look like a band profile, 
  //except blanks everywhere that the user can fill in, if they choose band.
  //Have them also select their genre of music somewhere.
  //if they choose manager, have them input their venue data right there and then.

  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nameOfTheBand, setNameOfTheBand] = useState<string>("");
  const [whatIsShown, setWhatIsShown] = useState<UIType>("normal");
  const [genre, setGenre] = useState<musicGenres>("rock");
  const [isUserShowing, setIsUserShowing] = useState(true);
  const [bandName, setBandName] = useState("");
  const [origin, setOrigin] = useState("");
  const [mostPlayedSong, setMostPlayedSong] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [newBandSongs, setNewBandSongs] = useState<string[]>([]);
  const [pendingSong, setPendingSong] = useState("");
  const [newBand, setNewBand] = useState(false)
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
          <div
            className="fillOutableBandProfile"
            style={{
              fontFamily: musicProfileMap[genreKey].fontFamily,
              color: musicProfileMap[genreKey].color,
            }}
          >
            <div className="TopOfBandArea">
              <input type="text" placeholder="Name of your Band" className="BandNameGoesHere"></input>
              <p className="BandOrigin">{origin}</p>
              <div className="LineOfSocials">
                <div className="SocialInfo">
                  <div className="SocialImage"></div>
                  <span>Social Media Brand</span>
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
                    <input type="text"></input>
                  </div>
                  <div className="DescriptionLand">
                    <h1 className="AboutUsLand">A little about us</h1>
                    <span className="AboutDescriptions">{aboutUs}</span>
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
                      <div className="PerformanceAddition">
                        <div className="PictureOfTour"></div>
                        <div className="PerformanceInformationLand">
                          <input type="text" placeholder="Where did you play?"></input>
                          <input type="text" placeholder="When did you play?"></input>
                          <input type="text" placeholder="Describe how the event went"></input>
                          <input type="text" placeholder="How many people showed up?"></input>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="AlbumsLand">
                    <div className="AlbumCoverImage">
                      <input type="text" placeholder="What was the name of your album?"></input>
                    </div>
                    <div className="AlbumInformationLand">
                      <input type="text" placeholder="Where did your album rank on the charts?"></input>
                      <input type="text" placeholder="How much money did you make off your album?"></input>
                    </div>
                  </div>
                </div>
              )}
              {newBand && (
                <div className="NewUserBottom">
                  <div className="FutureGoalsLand">
                    <div className="PhotoOfTheGroup"></div>
                    <div className="DescriptorAreaLand">
                      <h1 className="GoalsOfWe">Our Goals</h1>
                      <input type="text" placeholder="Give us a brief description of your future goals as a band"></input>
                      <input type="text" placeholder="Why should a manager choose to hire you?"></input>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {
        whatIsShown === "manager" && (
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
        )
      }
    </div >
  );
}
