import { useNavigate } from "react-router-dom"
import "./ManagerDashboard.css"
import { useEffect, useState } from "react";
import axios from "axios";
import type { MusicEvent } from "../CreateAccount/CreateAccount";
import type { EventInformationDTO, EventLineupDTO } from "../../utils/BandGenres";

export default function ManagerDashboard() {
    const navigate = useNavigate();
    const [inViewEvent, setInViewEvent] = useState(false);
    const [bandMoney, setBandMoney] = useState("");
    const [nameOfTheVenue, setNameOfTheVenue] = useState("");
    const [timeOfTheEvent, setTimeOfTheEvent] = useState("");
    const [dateOfTheEvent, setDateOfTheEvent] = useState("");
    const [numberOfBandsSignedUpForTheEvent, setNumberOfBandsSignedUpForTheEvent] = useState(0);
    const [namesOfBandsSignedUp, setNamesOfBandsSignedUp] = useState<string[]>([]);
    const [timeSlotsForBands, setTimeSlotsForBands] = useState<string[]>([]);
    const authorization = sessionStorage.getItem("JWT");
    const [nameOfTypeOfEvent, setNameOfTypeOfEvent] = useState<MusicEvent>("Concert");
    const [myEvents, setMyEvents] = useState<EventInformationDTO[]>([]);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const userId = sessionStorage.getItem("userIdentifier");
    const [role, setRole] = useState("");

    const findRole = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/role/${userId}`);
            if (response.data) {
                setRole(response.data);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (userId) {
            findRole();
        }
    }, [userId]);

    const managerDTO = {
        bandFee: bandMoney,
        venueLocation: nameOfTheVenue,
        timeSlot: timeOfTheEvent,
        date: dateOfTheEvent,
        eventType: nameOfTypeOfEvent
    };

    const selectEvent = (evt: EventInformationDTO) => {
        setSelectedEventId(evt.id);
        setNameOfTheVenue(evt.venueLocation);
        setDateOfTheEvent(evt.date);
        setNameOfTypeOfEvent(evt.eventType as MusicEvent);
        setTimeOfTheEvent(evt.timeSlot);
    };

    const loadBandsSignedUpDetails = () => {
        const count = Math.min(
            numberOfBandsSignedUpForTheEvent,
            namesOfBandsSignedUp.length,
            timeSlotsForBands.length
        );
        const array = [];
        for (let i = 0; i < count; i++) {
            array.push(
                <div className="EventBandDetailsArea" key={i}>
                    <h1>{namesOfBandsSignedUp[i]}</h1>
                    <div>{timeSlotsForBands[i]}</div>
                </div>
            );
        }
        return array;
    };

    const makeEvent = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/events/uploadEvent",
                managerDTO,
                {
                    headers: {
                        Authorization: `Bearer ${authorization}`
                    }
                }
            );
            if (response.data) {
                alert("Success! You made an event.");
            }
        } catch (err) {
            console.error("Error making an event: " + err);
        }
    }

    const retrieveEventLineup = async () => {
        try {
            const response = await axios.get<EventLineupDTO[]>(
                "http://localhost:8080/api/events/viewEvents/lineup",
                {
                    params: { venue: nameOfTheVenue, date: dateOfTheEvent, type: nameOfTypeOfEvent },
                    headers: { Authorization: `Bearer ${authorization}` },
                }
            );
            const rows = response.data ?? [];

            setNumberOfBandsSignedUpForTheEvent(rows.length);
            setNamesOfBandsSignedUp(rows.map(r => r.bandName ?? "— open —"));
            setTimeSlotsForBands(rows.map(r => r.timeSlot));
        } catch (e) {
            console.error("Error retrieving Lineup:", e);
            setNumberOfBandsSignedUpForTheEvent(0);
            setNamesOfBandsSignedUp([]);
            setTimeSlotsForBands([]);
        }
    };


    const getMyEvents = async () => {
        try {
            const response = await axios.get<EventInformationDTO[]>(
                `http://localhost:8080/api/events/viewAllEvents/${role}/${userId}`,
                { headers: { Authorization: `Bearer ${authorization}` } }
            ); setMyEvents(response.data ?? []);
        } catch (err: any) {
            console.error("Error fetching events:", err);
        }
    };

    useEffect(() => {
        if (!inViewEvent && role) {
            getMyEvents();
        }
    }, [inViewEvent, role]);
    
    useEffect(() => {
        if (nameOfTheVenue && dateOfTheEvent && nameOfTypeOfEvent) {
            retrieveEventLineup();
        }
    }, [nameOfTheVenue, dateOfTheEvent, nameOfTypeOfEvent]);

    useEffect(() => {
        if (inViewEvent) {
            setSelectedEventId(null);
            setNameOfTheVenue("");
            setDateOfTheEvent("");
            setNameOfTypeOfEvent("Concert");
            setTimeOfTheEvent("");
            setNumberOfBandsSignedUpForTheEvent(0);
            setNamesOfBandsSignedUp([]);
            setTimeSlotsForBands([]);
        } else {
            getMyEvents();
        }
    }, [inViewEvent]);

    return (
        <div>
            <div className="ManagerHeader">
                <h1>Encore</h1>
                <button onClick={() => navigate("/genrelist")}>Find Bands!</button>
            </div>
            <div className="ManagerTidBits">
                <h4>Manager Dashboard</h4>
                <p>Below, you can add the events you want to fill and see them once they're created!</p>
                <p>This way, you know which events are filled - and which still need working on.</p>
            </div>
            <div className="ViewAndAddArea">
                <div className="ManagerTabs">
                    <div onClick={() => setInViewEvent(true)}>Create a new Event!</div>
                    <div onClick={() => setInViewEvent(false)}>View your In-Progress Events!</div>
                </div>
                {inViewEvent && (
                    <div>
                        <h1>Fill out this form with the details of your event, and we'll make sure our Bands can see it!</h1>
                        <form onSubmit={(e) => { e.preventDefault(); makeEvent(); }}>
                            <label>What type of event is it?</label>
                            <select
                                required
                                value={nameOfTypeOfEvent}
                                onChange={(e) => setNameOfTypeOfEvent(e.currentTarget.value as MusicEvent)}
                            >
                                <option value="Concert">Concert</option>
                                <option value="Music Festival">Music Festival</option>
                                <option value="Gig">Gig</option>
                            </select>

                            <label>What timeslot did you need to fill for this event? If you need more than one time slot filled, you'll need to submit the form multiple times.</label>
                            <select className="VenueEntry" value={timeOfTheEvent} onChange={(e) => setTimeOfTheEvent(e.currentTarget.value)}>
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
                            <input type="text" placeholder="What's the name of the venue?" required value={nameOfTheVenue} onChange={(e) => setNameOfTheVenue(e.currentTarget.value)}></input>
                            <input
                                type="date"
                                placeholder="What day is the venue for? Enter it in YYYY-MM-DD format"
                                value={dateOfTheEvent}
                                onChange={(e) => setDateOfTheEvent(e.currentTarget.value)}
                                required
                            />
                            <input type="text" placeholder="How much will you offer a Band for this event?" required value={bandMoney} onChange={(e) => setBandMoney(e.currentTarget.value)}></input>
                            <button type="submit">Create Event</button>
                        </form>
                    </div>
                )}
                {!inViewEvent && (
                    <div className="ViewEventArea">
                        <div className="EventsList">
                            <h2>Your events</h2>
                            {myEvents.length === 0 && <p>No events yet.</p>}
                            {myEvents.map(e => (
                                <button
                                    key={e.id}
                                    type="button"
                                    className={`EventCard ${selectedEventId === e.id ? "selected" : ""}`}
                                    onClick={() => selectEvent(e)}
                                >
                                    <strong>{e.eventType}</strong> — {e.venueLocation}
                                    <div>{e.date} @ {e.timeSlot}</div>
                                    <div>Offer: {e.bandFee}</div>
                                </button>
                            ))}
                        </div>

                        <div className="InProgressEventViewer">
                            <h1>{nameOfTheVenue} {timeOfTheEvent}</h1>
                            {loadBandsSignedUpDetails()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}