import "./EventCalendar.css"
import { numberToMonthMap, daysInMonthMap, type EventManager } from "../../utils/BandGenres"
import { useEffect, useState } from "react";
import type { MusicEvent } from "../CreateAccount/CreateAccount";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EventCalendar() {
    let currentDate = new Date();

    const [events, setEvents] = useState<EventManager[]>([]);
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const [numberOfTheDay, setNumberOfTheDay] = useState(0);
    const [numberOfDays, setNumberOfDays] = useState(0);
    const [inEventView, setInEventView] = useState(false);
    const [whatEventTypeIsShown, setWhatEventTypeIsShown] = useState<MusicEvent>("Concert")
    const [managerNames, setManagerNames] = useState<Record<number, string>>({});


    const findKeyAssociatedWithValue = (value: String, index: number): number => {
        if (value === undefined && index === 13) return 13;
        if (value === undefined && index === 1) return 0;
        for (const key of Object.keys(numberToMonthMap)) {
            if (numberToMonthMap[Number(key)] === value) {
                return Number(key);
            }
        }
        return -1;
    }

    const travelBackInTime = () => {
        if (currentMonth === currentDate.getMonth() + 1 && currentYear === currentDate.getFullYear()) {
            return;
        }
        if (findKeyAssociatedWithValue(numberToMonthMap[currentMonth - 1], currentMonth - 1) < 1) {
            setCurrentYear(currentYear - 1);
            setCurrentMonth(12);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    }

    const moveForwardInTime = () => {
        if (findKeyAssociatedWithValue(numberToMonthMap[currentMonth + 1], currentMonth + 1) > 12) {
            setCurrentMonth(1);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    }

    const grabDaysForMonth = (month: string) => {
        setNumberOfDays(daysInMonthMap[month]);
    }

    const loadDaysForMonth = (dayNum: number) => {
        let divDays = [];
        for (let i = 1; i <= dayNum; i++) {
            const label = determineDayOfTheWeek(i);
            divDays.push(
                <div key={i} className="DayOfTheWeekArea">
                    <label className="NameOfTheDay">{label}</label>
                    <div className="IndividualDayNum" onClick={() => showEventsForTheDay(i)}>{i}</div>
                </div>
            );
        }
        return divDays;
    }

    useEffect(() => {
        grabDaysForMonth(numberToMonthMap[currentMonth]);
    }, [currentMonth]);

    useEffect(() => {
        if (inEventView && numberOfTheDay > 0) {
            getEvents();
        }
    }, [inEventView, numberOfTheDay, whatEventTypeIsShown, currentMonth, currentYear]);

    const determineDayOfTheWeek = (dayNumber: number) => {
        if (dayNumber < 1 || dayNumber > daysInMonthMap[currentMonth] || dayNumber > 7) {
            return undefined;
        }
        const date = new Date(currentYear, currentMonth - 1, dayNumber);
        const dayIndex = date.getDay();
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return dayNames[dayIndex];
    };

    const showEventsForTheDay = (day: number) => {
        setNumberOfTheDay(day);
        setInEventView(true);
    };

    const getEvents = async () => {
        try {
            const url = `http://localhost:8080/api/events/${encodeURIComponent(whatEventTypeIsShown)}/${currentYear}/${currentMonth}/${numberOfTheDay}`;
            const { data } = await axios.get<EventManager[]>(url);
            setEvents(data);
        } catch (err) {
            console.error("Error fetching events for the day: ", err);
        }
    };

    const determineDaySuffix = (dayNumber: number) => {
        if (dayNumber <= 0 || dayNumber > 31) return undefined;
        if (dayNumber === 11 || dayNumber === 12 || dayNumber === 13) {
            return dayNumber + "th";
        }
        if (dayNumber % 10 === 1) return dayNumber + "st";
        if (dayNumber % 10 === 2) return dayNumber + "nd";
        if (dayNumber % 10 === 3) return dayNumber + "rd";
        return dayNumber + "th";
    };

    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.removeItem("JWT");
        sessionStorage.removeItem("userIdentifier");
        sessionStorage.removeItem("role");
        navigate("/");
    }

    useEffect(() => {
        if (events.length === 0) return;
        (async () => {
            const results: Record<number, string> = {};
            for (const e of events) {
                const { data } = await axios.get(`http://localhost:8080/api/events/lookup/${e.id}`);
                results[e.id] = data;
            }
            setManagerNames(results);
        })();
    }, [events]);

    return (
        <div className="CalendarPage">
            <h1 className="CalendarCompanyName">Encore</h1>
            <button onClick={() => logout()}>LOGOUT</button>
            {!inEventView && (
                <div className="Calendar">
                    <div className="CalendarHeader">
                        <div onClick={travelBackInTime} className="BackTime">Back</div>
                        <div className="MonthAndYear">{numberToMonthMap[currentMonth]} {currentYear}</div>
                        <div onClick={moveForwardInTime} className="ForwardTime">Forward</div>
                    </div>
                    <div className="EachDay">
                        {loadDaysForMonth(numberOfDays)}
                    </div>
                </div>
            )}
            {inEventView && (
                <div>
                    <div className="EventViewHeader">
                        <div className="EmptySpace"></div>
                        <h1 className="EventForTitle">Events for {numberToMonthMap[currentMonth]} {determineDaySuffix(numberOfTheDay)}</h1>
                        <button onClick={() => setInEventView(false)} className="BackToCalendar">Back</button>
                    </div>
                    <div className="RowOfEventTabs">
                        <div onClick={() => setWhatEventTypeIsShown("Concert")} className="ConcertTab">Concerts</div>
                        <div onClick={() => setWhatEventTypeIsShown("Music Festival")} className="FestivalTab">Music Festivals</div>
                        <div onClick={() => setWhatEventTypeIsShown("Gig")} className="GigTab">Gigs</div>
                    </div>
                    {whatEventTypeIsShown === "Concert" && (
                        <div className="ConcertView">
                            {events.length === 0 ? (
                                <div className="NoEvents">No events for this day.</div>
                            ) : (
                                events.map(e => (
                                    <div key={e.id} className="AvailableEvent">
                                        <div className="EventWhereTime">{e.venueLocation} {e.timeSlot}</div>
                                        <div className="EmptySpace"></div>
                                        <div className="EventPrizeMoney">{e.bandFee} $</div>
                                        <div className="EventManager">{"Manager " + managerNames[e.id]}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                    {whatEventTypeIsShown === "Music Festival" && (
                        <div className="FestivalView">
                            {events.length === 0 ? (
                                <div className="NoEvents">No events for this day.</div>
                            ) : (
                                events.map(e => (
                                    <div key={e.id} className="AvailableEvent">
                                        <div className="EventWhereTime">{e.venueLocation} {e.timeSlot}</div>
                                        <div className="EmptySpace"></div>
                                        <div className="EventPrizeMoney">{e.bandFee} $</div>
                                        <div className="EventManager">{"Manager " + managerNames[e.id]}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                    {whatEventTypeIsShown === "Gig" && (
                        <div className="GigView">
                            {events.length === 0 ? (
                                <div className="NoEvents">No events for this day.</div>
                            ) : (
                                events.map(e => (
                                    <div key={e.id} className="AvailableEvent">
                                        <div className="EventWhereTime">{e.venueLocation} {e.timeSlot}</div>
                                        <div className="EmptySpace"></div>
                                        <div className="EventPrizeMoney">{e.bandFee} $</div>
                                        <div className="EventManager">{"Manager " + managerNames[e.id]}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}