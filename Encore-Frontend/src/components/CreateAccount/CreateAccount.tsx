import { useState } from "react";
import "./CreateAccount.css";
import accountCreationBackground from "../../assets/EncoreCreationOutPaint.jpg"

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

  const showBand = () => setWhatIsShown("band");
  const showManager = () => setWhatIsShown("manager");
  const showNormal = () => setWhatIsShown("normal");

  return (
    <div className="AccountCreationPage">
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
        <div>
          <div onClick={showNormal} style={{ cursor: "pointer" }}>← Back</div>
          <h1>A</h1>
          <input type="text" placeholder="Your username goes here"></input>
          <input type="text" placeholder="Please enter the name of your band"></input>
          <input type="text" placeholder="Your password goes here"></input>
          <input type="text" placeholder="Here's an opportunity to tell managers a little about you"></input>
        </div>
      )}

      {whatIsShown === "manager" && (
        <div className="ManagerArea">
           <div className="ManagerHeader">
            <h1 className="ManagerNameOfBrand">Encore</h1>
              <div onClick={showNormal} style={{ cursor: "pointer" }}>← Back</div>
              </div>
          <div className="ManagerHeader">
            <h2 className="ManagerInfo">Managers, you now have the opportunity to enter in all venue information for the shows you want to have filled!</h2>
          </div>
          <h4 className="TidBit">Don't worry if you don't get to it - you'll have the opporunity to update them through our Management Dashboard.</h4>
          <div className="RequiredInformationArea">
          <input className="ManagerName" type="text" placeholder="Your username goes here" required></input>
          <input className="ManagerPass" type="password" placeholder="Your password goes here" required></input>
          <input type="submit"></input>
          </div>
        </div>
      )}
    </div>
  );
}
